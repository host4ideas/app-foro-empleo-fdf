// Server
const app = require("express")();
const port = process.env.PORT || 3001;
const compression = require("compression");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
// Auth
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const routes = require("./routes/router");

const httpServer = http.createServer(app);

const sessionOptions = {
  secret: "0b18563f63c6c3a4e65a1ae54b57a94f27e64c87fb3a0578d9e316f0fda209dc",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 day
};

const sessionMiddleware = session(sessionOptions);

require("./init/bootPassport")();
app.use(cors());
app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());
app.use(routes);

const io = new Server(httpServer);

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

// Secure admin namespace
require("./init/bootTimerAdminNsp")(io, sessionMiddleware);

io.on("connect", (socket) => {
  console.log(
    `new client connection ${socket.id}\nTotal clients: ${io.sockets.sockets.size}`
  );
});

httpServer.listen(port, () => {
  console.log(`application is running at: http://localhost:${port}`);
});
