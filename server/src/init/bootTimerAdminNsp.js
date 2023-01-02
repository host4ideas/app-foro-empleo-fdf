const passport = require("passport");
// Timer
const { Timer } = require("../lib/tiny-timer");

module.exports = function (io, sessionMiddleware) {
    /**
     * TIMER FUNCTIONALITY
     */
    const timer = new Timer();
    let initialTime = 0;

    const adminNsp = io.of("/admin"); // the "admin" namespace

    // convert a connect middleware to a Socket.IO middleware
    const wrap = (middleware) => (socket, next) =>
        middleware(socket.request, {}, next);

    adminNsp.use(wrap(sessionMiddleware));
    adminNsp.use(wrap(passport.initialize()));
    adminNsp.use(wrap(passport.session()));

    adminNsp.use((socket, next) => {
        if (socket.request.user) {
            next();
        } else {
            console.log("user not authenticated (socket)");
            next(new Error("unauthorized"));
        }
    });

    adminNsp.on("connect", (socket) => {
        const session = socket.request.session;
        console.log(`saving sid ${socket.id} in session ${session.id}`);
        session.socketId = socket.id;
        session.save();

        socket.on("whoami", (cb) => {
            cb(socket.request.user);
        });

        socket.on("initial time", (time) => {
            timer.stop();
            initialTime = parseInt(time);
            io.emit("initial time", time);
        });

        socket.on("start timer", () => {
            timer.stop();
            timer.start(initialTime);
            io.emit("start timer", timer.time);
        });

        socket.on("resume timer", () => {
            timer.resume();
            io.emit("resume", timer.time);
        });

        socket.on("pause timer", () => {
            timer.pause();
            io.emit("pause timer");
        });

        socket.on("stop timer", () => {
            timer.stop();
            io.emit("stop timer");
        });

        require("./empresasSocket")(socket);
        require("./salasSocket")(socket);
        require("./categoriasSocket")(socket);
    });

    io.on("check timer", (cb) => {
        cb(timer.time, timer.status);
    });
};
