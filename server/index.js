const app = require("express")(),
    http = require("http").createServer(app),
    socketIo = require("socket.io"),
    port = process.env.PORT || 3001,
    publicDir = `${__dirname}/public`;

let interval,
    timer = 0;

// Accept connections from another URL
const io = socketIo(http, {
    cors: {
        origin: "http://localhost:3000",
    },
});

http.listen(port, () => {
    console.log("Iniciando Express y Socket.IO en localhost:%d", port);
});

function playTimer() {
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            io.emit("play timer", timer);
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
    .post("/streaming", (req, res) => {
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
    });

io.on("connection", (socket) => {
    socket.on("initial time", (initialTime) => {
        timer = initialTime;
        io.emit("play timer", timer);
    });
});
