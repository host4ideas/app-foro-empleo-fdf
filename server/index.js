let interval = 0;
let timer = 0;

var app = require("express")(),
    http = require("http").createServer(app),
    io = require("socket.io")(http),
    port = process.env.PORT || 3000,
    publicDir = `${__dirname}/public`;

http.listen(port, () => {
    console.log("Iniciando Express y Socket.IO en localhost:%d", port);
});

app.get("/", (req, res) => {
    res.sendFile(`${publicDir}/client.html`);
})
    .get("/streaming", (req, res) => {
        res.sendFile(`${publicDir}/server.html`);

        if (interval < 1) {
            interval = setInterval(() => {
                timer++;
            }, 1000);
        }
    })
    .get("/stop", (req, res) => {
        res.sendFile(`${publicDir}/server.html`);
        clearInterval(interval);
    });

io.on("connection", (socket) => {
    socket.on("streaming", (image) => {
        // io.emit("play stream", image);
        io.emit("timer", timer);
        //console.log(image)
    });
});
