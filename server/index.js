// Server
const app = require("express")();
const port = process.env.PORT || 3001;
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
// Auth
const bodyParser = require("body-parser");
const routes = require("./routes/router");

const httpServer = http.createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

const io = new Server(httpServer, { cors: "http://localhost:3000" });

app.post("/logout", (req, res) => {
  console.log(`logout ${req.session.id}`);
  const socketId = req.session.socketId;
  if (socketId && io.of("/").sockets.get(socketId)) {
    console.log(`forcefully closing socket ${socketId}`);
    io.of("/").sockets.get(socketId).disconnect(true);
  }
  req.logout(() => {
    res.cookie("connect.sid", "", { expires: new Date() });
    res.redirect("/");
  });
});

io.on("connect", (socket) => {
  console.log(
    `new client connection ${socket.id}\nTotal clients: ${io.sockets.sockets.size}`
  );
});

httpServer.listen(port, () => {
  console.log(`application is running at: http://localhost:${port}`);
});
