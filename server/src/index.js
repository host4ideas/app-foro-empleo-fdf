// Server
const app = require("express")();
const port = process.env.PORT || 3001;
const publicDir = `${__dirname}/public`;
const compression = require("compression");
const { Server } = require("socket.io");
const { Timer } = require("./lib/tiny-timer");
const { msToSeconds } = require("./utils");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
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
// Push notifications
const webPush = require("web-push");

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

    // Push notifications
    webPush.setVapidDetails(
        "http://localhost:3000",
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );

    const API_URL =
        process.env.NODE_ENV === "production"
            ? process.env.API_TIMERS_PROD
            : process.env.API_TIMERS_DEV;

    let initialTime = 0;
    const timer = new Timer();

    const httpServer = http.createServer(app);
    app.use(compression());
    app.use(function (req, res, next) {
        const allowedDomains = [
            "http://localhost:3001",
            "https://app-foro-empleo.azurewebsites.net",
        ];
        const origin = req.headers.origin;
        if (allowedDomains.indexOf(origin) > -1) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }

        res.setHeader("Access-Control-Allow-Methods", "GET, POST");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With,content-type, Accept"
        );
        res.setHeader("Access-Control-Allow-Credentials", true);

        next();
    });

    // Accept connections from another URL
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    /**
     * NAMESPACES
     */
    const adminNsp = io.of("/admin"); // the "client" namespace
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
        // process.env.SESSION_SECRET
        secret: "somevalue",
        cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 day
        resave: false,
        saveUninitialized: false,
    };

    if (app.get("env") === "production") {
        // Serve secure cookies, requires HTTPS
        sessionOptions.cookie.secure = true;
    }

    const sessionMiddleware = session(sessionOptions);
    // app.use(bodyParser.json());
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

    passport.use(
        new LocalStrategy(
            { usernameField: "username", passwordField: "password" },
            (username, password, done) => {
                console.log(username, password);
                if (username != "" && password != "") {
                    try {
                        const USER = {
                            id: uuidv4(),
                            username: username,
                        };

                        // Aquí metemos el service auth
                        var data = {
                            userName: username,
                            password: password,
                        };
                        networkRequest("post", "auth/login", data).then(
                            (response) => {
                                const token = response.data.response;
                                axios.default.headers.common = {
                                    Authorization: "Bearer " + token,
                                };
                                console.log(token);
                                USER.token = token;
                                USER.role = "admin";
                                return done(null, USER);
                            }
                        );
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

    app.get("/", (req, res) => {
        const isAuthenticated = !!req.user;
        if (isAuthenticated) {
            console.log(`user is authenticated, session is ${req.session.id}`);
            res.status(200).send(true);
        } else {
            console.log("unknown user");
            res.status(401).send(false);
        }
    });

    app.post(
        "/login",
        passport.authenticate("local"),
        function (req, res, next) {
            if (req.user) {
                res.status(201).json(req.user); // Mandamos al user su info
            } else {
                res.status(401).send({ message: "forbidden" });
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
        req.logout();
        res.cookie("connect.sid", "", { expires: new Date() });
        res.redirect("/");
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
    // Admin conneciton events
    adminNsp.on("connection", (socket) => {
        // Saving the session if the user has authenticated
        const session = socket.request.session;
        if (session) {
            session.socketId = socket.id;
            session.save();
            console.table({
                "Socket ID": socket.id,
                Namespace: socket.nsp.name,
                "Session ID": session.id,
                "Total Clients": io.sockets.sockets.size,
            });
        }

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
    });

    // All users
    io.on("connection", (socket) => {
        socket.on("whoami", (cb) => {
            cb(socket.request.user ? socket.request.user.username : "");
        });
    });

    /**
     * PUSH NOTIFICATIONS
     */
    app.get(`/vapidPublicKey`, (req, res) => {
        console.log(process.env.VAPID_PUBLIC_KEY);
        res.send(process.env.VAPID_PUBLIC_KEY);
    });

    app.post(`/sendNotification`, (req, res) => {
        const subscription = req.body.subscription;
        const payload = req.body.payload;
        const options = {
            TTL: req.body.ttl,
        };

        setTimeout(() => {
            webPush
                .sendNotification(subscription, payload, options)
                .then(() => {
                    res.sendStatus(201);
                })
                .catch((error) => {
                    console.log(error);
                    res.sendStatus(500);
                });
        }, req.body.delay * 1000);
    });

    app.post("/notifications/subscribe", (req, res) => {
        const subscription = req.body;

        console.log(subscription);

        const payload = JSON.stringify({
            title: "Hello!",
            body: "It works.",
        });

        webPush
            .sendNotification(subscription, payload)
            .then((result) => console.log(result))
            .catch((e) => console.log(e.stack));

        res.status(200).json({ success: true });
    });
}
