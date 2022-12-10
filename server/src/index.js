// Server
const app = require("express")();
const port = process.env.PORT || 3001;
const publicDir = `${__dirname}/public`;
const compression = require("compression");
const { Server } = require("socket.io");
const { Timer } = require("./lib/tiny-timer");
const { msToSeconds } = require("./utils");
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();
const cors = require("cors");
// Auth
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { networkRequest } = require("./services/network_request.service.js");
const axios = require("axios");
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

    const API_URL =
        process.env.NODE_ENV === "production"
            ? process.env.API_TIMERS_PROD
            : process.env.API_TIMERS_DEV;

    let initialTime = 0;
    const timer = new Timer();

    const httpServer = http.createServer(app);
    // GZip request compression
    app.use(compression());
    // Cors
    app.use(cors({ origin: "http://localhost:3000" }));

    // Accept connections from another URL
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    /**
     * NAMESPACES
     */
    const adminNsp = io.of("/admin"); // the "admin" namespace
    const client = io.of("/client"); // the "client" namespace

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
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 day
        resave: false,
        saveUninitialized: false,
    };

    if (app.get("env") === "production") {
        // Serve secure cookies, requires HTTPS
        sessionOptions.cookie.secure = true;
    }

    const sessionMiddleware = session(sessionOptions);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(sessionMiddleware);
    app.use(passport.initialize());
    app.use(passport.session());

    async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    function getApiToken(username, password) {
        return new Promise((res, rej) => {
            postData(
                "https://apitimersforoempleofdf.azurewebsites.net/Auth/Login",
                { userName: username, password: password }
            ).then((data) => {
                res(data.response); // JSON data parsed by `data.json()` call
            });
        });
    }

    passport.use(
        new LocalStrategy(
            { usernameField: "username", passwordField: "password" },
            (username, password, done) => {
                console.log(username, password);
                if (username != "" && password != "") {
                    try {
                        const USER = {
                            id: 1,
                            username: username,
                        };
                        getApiToken(username, password).then((token) => {
                            USER.token = token;
                            USER.role = "admin";
                            return done(null, USER);
                        });
                    } catch (error) {
                        console.log(error);
                        return done(null, false);
                    }
                } else {
                    console.log(error);
                    return done(null, false);
                }
            }
        )
    );

    app.post(
        "/login",
        passport.authenticate("local"),
        function (req, res, next) {
            if (req.user) {
                res.json(req.user); // Mandamos al user su info
            } else {
                res.status(401).send(false);
            }
        }
    );

    app.post("/logout", (req, res) => {
        console.log(`logout ${req.session.id}`);
        const socketId = req.session.socketId;
        if (socketId && io.of("/").sockets.get(socketId)) {
            console.log(`forcefully closing socket ${socketId}`);
            io.of("/").sockets.get(socketId).disconnect(true);
        }
        req.logout(() => {
            res.cookie("connect.sid", "", { expires: new Date() });
            res.status(200).send();
        });
    });

    /**
     * TIMER FUNCTIONALITY
     */
    timer.on("tick", (ms) => {
        adminNsp.emit("play timer", msToSeconds(timer.time));
        client.emit("play timer", msToSeconds(timer.time) + 1);
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
     * TESTING ENDPOINTS
     */
    // Only for testing
    app.get("/client", (req, res) => {
        res.sendFile(`${publicDir}/client.html`);
    });

    app.get("/", (req, res) => {
        const isAuthenticated = !!req.user;
        if (isAuthenticated) {
            console.log(`user is authenticated, session is ${req.session.id}`);
        } else {
            console.log("unknown user");
        }
        res.send(isAuthenticated ? true : false);
    });

    /**
     * SOCKET IO && PASSPORT AUTH CONFIG
     */
    passport.serializeUser((user, cb) => {
        console.log(`serializeUser ${user.id}`);
        cb(null, user);
    });

    passport.deserializeUser((user, cb) => {
        console.log(`deserializeUser ${user.id}`);
        cb(null, user);
    });

    // convert a connect middleware to a Socket.IO middleware
    const wrap = (middleware) => (socket, next) =>
        middleware(socket.request, {}, next);

    adminNsp.use(wrap(sessionMiddleware));
    adminNsp.use(wrap(passport.initialize()));
    adminNsp.use(wrap(passport.session()));

    adminNsp.use((socket, next) => {
        console.log(socket.request.user);
        if (socket.request.user) {
            next();
        } else {
            next(new Error("unauthorized"));
        }
    });

    /**
     * SOCKET IO EVENTS
     */
    // Admin users
    adminNsp.on("connection", (socket) => {
        const session = socket.request.session;
        session.socketId = socket.id;
        session.save();
        console.table({
            "Socket ID": socket.id,
            Namespace: socket.nsp.name,
            "Session ID": session.id,
            "Total Clients": io.sockets.sockets.size,
        });

        adminNsp.emit("play timer", parseInt(timer.time));
        client.emit("play timer", parseInt(timer.time) + 1);

        socket.on("initial time", (time) => {
            initialTime = parseInt(time) * 1000;
            adminNsp.emit("play timer", parseInt(time));
            client.emit("play timer", parseInt(time) + 1);
        });

        socket.on("start timer", () => {
            playTimer({ start: true, duration: initialTime });
        });

        socket.on("stop timer", () => {
            timer.stop();
            client.emit("play timer", 0);
            adminNsp.emit("play timer", 0);
        });

        socket.on("resume timer", () => {
            timer.resume();
        });

        socket.on("pause timer", () => {
            timer.pause();
        });

        socket.on("get salas", (cb) => {
            fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            });
            response.json().then((data) => cb(data));
        });
    });

    socket.on("get temporizadores evento", (cb) => {});

    // All users
    io.on("connection", (socket) => {
        socket.on("whoami", (cb) => {
            cb(socket.request.user ? socket.request.user.username : "");
        });
    });
}
