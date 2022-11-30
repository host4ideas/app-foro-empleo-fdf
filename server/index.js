// Server
const app = require("express")();
const port = process.env.PORT || 3001;
const publicDir = `${__dirname}/public`;
const compression = require("compression");
const { Server } = require("socket.io");
const { Timer } = require("./tiny-timer");
const { msToSeconds } = require("./utils");
// Auth
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// Cluster
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;
const { setupMaster, setupWorker } = require("@socket.io/sticky");
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter");

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    const httpServer = http.createServer();

    // setup sticky sessions
    setupMaster(httpServer, {
        loadBalancingMethod: "least-connection",
    });

    // setup connections between the workers
    setupPrimary();

    httpServer.listen(port, () => {
        console.log(`application is running at: http://localhost:${port}`);
    });

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    console.log(`Worker ${process.pid} started`);

    let initialTime = 0;
    const timer = new Timer();

    const httpServer = http.createServer(app);
    app.use(compression());

    // Accept connections from another URL
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    const DUMMY_USER = {
        id: 1,
        username: "john",
    };

    /**
     * NAMESPACES
     */
    const mainNsp = io.of("/main"); // the "nsp1" namespace
    const nsp1 = io.of("/nsp1"); // the "nsp1" namespace
    const nsp2 = io.of("/nsp2"); // the "nsp2" namespace

    /**
     * CLUSTER CONFIG
     */
    // use the cluster adapter
    io.adapter(createAdapter());

    // setup connection with the primary process
    setupWorker(io);

    /**
     * AUTH SERVER CONFIG
     */
    const sessionOptions = {
        secret: "changeit",
        resave: false,
        saveUninitialized: false,
    };

    // If in production, serve cookies over HTTPS
    if (app.get("env") === "production") {
        sessionOptions.cookie.secure = true;
    }

    const sessionMiddleware = session(sessionOptions);
    app.use(sessionMiddleware);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy((username, password, done) => {
            if (username === "john" && password === "doe") {
                console.log("authentication OK");
                return done(null, DUMMY_USER);
            } else {
                console.log("wrong credentials");
                return done(null, false);
            }
        })
    );

    /**
     * Secure routes. If the user is not logged in, it will be redirected to /.
     */
    const secured = (req, res, next) => {
        const isAuthenticated = !!req.user;
        if (isAuthenticated) {
            return next();
        }
        req.session.returnTo = req.originalUrl;
        res.redirect("/");
    };

    /**
     * AUTH ENDPOINTS
     */
    app.get("/", (req, res) => {
        const isAuthenticated = !!req.user;
        if (isAuthenticated) {
            console.log(`user is authenticated, session is ${req.session.id}`);
        } else {
            console.log("unknown user");
        }
        res.sendFile(isAuthenticated ? "index.html" : "login.html", {
            root: publicDir,
        });
    })
        .post(
            "/login",
            passport.authenticate("local", {
                successRedirect: "/",
                failureRedirect: "/login",
            })
        )
        .post("/logout", (req, res) => {
            console.log(`logout ${req.session.id}`);
            const socketId = req.session.socketId;
            if (socketId && io.of("/").sockets.get(socketId)) {
                console.log(`forcefully closing socket ${socketId}`);
                io.of("/").sockets.get(socketId).disconnect(true);
            }
            req.logout((err) => {
                console.error(err);
            });
            res.cookie("connect.sid", "", { expires: new Date() });
            res.redirect("/");
        });

    /**
     * TIMER FUNCTIONALITY
     */
    timer.on("tick", (ms) => {
        mainNsp.emit("play timer", msToSeconds(timer.time));
        nsp1.emit("play timer", msToSeconds(timer.time) + 1);
        nsp2.emit("play timer", msToSeconds(timer.time) - 1);
    });

    function playTimer({ resume = false, start = false, duration = 0 } = {}) {
        if (resume) {
            timer.resume();
        } else if (start) {
            timer.stop();
            timer.start(duration);
        }
    }

    /**
     * TIMER ENDPOINTS
     */
    // Admin
    app.get("/server", secured, (req, res) => {
        res.sendFile(`${publicDir}/server.html`);
    })
        .post("/start-streaming", secured, (req, res) => {
            playTimer({ start: true, duration: initialTime });
            res.send().status(200);
        })
        .post("/stop", secured, (req, res) => {
            timer.stop();
            nsp1.emit("play timer", 0);
            nsp2.emit("play timer", 0);
            mainNsp.emit("play timer", 0);
            res.send().status(200);
        })
        .post("/resume", secured, (req, res) => {
            timer.resume();
            res.send().status(200);
        })
        .post("/pause", secured, (req, res) => {
            timer.pause();
            res.send().status(200);
        });
    // User
    app.get("/client", (req, res) => {
        res.sendFile(`${publicDir}/client.html`);
    });

    /**
     * SOCKET IO && PASSPORT AUTH CONFIG
     */
    passport.serializeUser((user, cb) => {
        console.log(`serializeUser ${user.id}`);
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        console.log(`deserializeUser ${id}`);
        cb(null, DUMMY_USER);
    });

    // convert a connect middleware to a Socket.IO middleware
    const wrap = (middleware) => (socket, next) =>
        middleware(socket.request, {}, next);

    io.use(wrap(sessionMiddleware));
    io.use(wrap(passport.initialize()));
    io.use(wrap(passport.session()));

    io.use((socket, next) => {
        if (socket.request.user) {
            next();
        } else {
            next(new Error("unauthorized"));
        }
    });

    /**
     * SOCKET IO EVENTS
     */
    mainNsp.on("connection", (socket) => {
        mainNsp.emit("play timer", parseInt(timer.time));
        nsp1.emit("play timer", parseInt(timer.time) + 1);
        nsp2.emit("play timer", parseInt(timer.time) - 1);

        socket.on("initial time", (time) => {
            console.log("238: " + time);
            initialTime = parseInt(time) * 1000;
            mainNsp.emit("play timer", parseInt(time));
            nsp1.emit("play timer", parseInt(time) + 1);
            nsp2.emit("play timer", parseInt(time) - 1);
        });
    });

    io.on("connect", (socket) => {
        socket.on("whoami", (cb) => {
            cb(socket.request.user ? socket.request.user.username : "");
        });

        const session = socket.request.session;
        session.socketId = socket.id;
        session.save();
        console.table({
            "Socket ID": socket.id,
            Namespace: socket.nsp.name,
            "Session ID": session.id,
            "Total Clients": io.sockets.sockets.size,
        });
    });
}
