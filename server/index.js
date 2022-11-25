const app = require("express")(),
    http = require("http"),
    { Server } = require("socket.io"),
    port = process.env.PORT || 3001,
    publicDir = `${__dirname}/public`;

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const { setupMaster, setupWorker } = require("@socket.io/sticky");
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter");

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    const httpServer = http.createServer(app);

    // setup sticky sessions
    setupMaster(httpServer, {
        loadBalancingMethod: "least-connection",
    });

    // setup connections between the workers
    setupPrimary();

    httpServer.listen(port, () => {
        console.log("Iniciando Express y Socket.IO en localhost:%d", port);
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

    const httpServer = http.createServer(app);

    // Accept connections from another URL
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    // use the cluster adapter
    io.adapter(createAdapter());

    // setup connection with the primary process
    setupWorker(io);

    let interval,
        timer = 0;

    const nsp1 = io.of("/nsp1"); // the "nsp1" namespace
    const nsp2 = io.of("/nsp2"); // the "nsp2" namespace

    function playTimer() {
        interval = setInterval(() => {
            if (timer > 0) {
                timer--;
                io.emit("play timer", timer);
                nsp1.emit("play timer", timer + 1);
                nsp2.emit("play timer", timer - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }

    app.get("/server", (req, res) => {
        res.sendFile(`${publicDir}/server.html`);
    })
        .get("/client", (req, res) => {
            res.sendFile(`${publicDir}/client.html`);
        })
        .post("/streaming/", (req, res) => {
            if (!interval) {
                playTimer();
            } else {
                clearInterval(interval);
                playTimer();
            }
            res.send().status(200);
        })
        .post("/stop", (req, res) => {
            clearInterval(interval);
            res.send().status(200);
        })
        .post("/reset", (req, res) => {
            clearInterval(interval);
            timer = 0;
            io.emit("play timer", timer);
            nsp1.emit("play timer", timer);
            nsp2.emit("play timer", timer);
        });

    io.on("connection", (socket) => {
        socket.on("initial time", (initialTime) => {
            timer = initialTime;
            io.emit("play timer", timer);
        });
    });

    nsp1.on("connection", (socket) => {
        socket.on("initial time", (initialTime) => {
            timer = parseInt(initialTime);
            nsp1.emit("play timer", timer + 1);
        });
    });

    nsp2.on("connection", (socket) => {
        socket.on("initial time", (initialTime) => {
            timer = parseInt(initialTime);
            nsp2.emit("play timer", timer - 1);
        });
    });
}
