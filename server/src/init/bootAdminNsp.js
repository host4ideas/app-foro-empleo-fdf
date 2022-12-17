const passport = require("passport");
// Timer
const { Timer } = require("../lib/tiny-timer");

module.exports = function (io, sessionMiddleware) {
    /**
     * TIMER FUNCTIONALITY
     */
    const timer = new Timer();

    function playTimer({ resume = false, start = false, duration = 0 } = {}) {
        if (resume) {
            timer.resume();
        } else if (start) {
            timer.stop();
            timer.start(duration);
        }
    }

    const adminNsp = io.of("/admin"); // the "admin" namespace

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
            // Parse to seconds
            initialTime = parseInt(time) * 1000;
            adminNsp.emit("initial timer", parseInt(time));
            io.emit("initial timer", parseInt(time) + 1);
        });

        socket.on("start timer", () => {
            playTimer({ start: true, duration: initialTime });
        });

        socket.on("stop timer", () => {
            timer.stop();
            io.emit("play timer", 0);
            adminNsp.emit("play timer", 0);
        });

        socket.on("resume timer", () => {
            timer.resume();
        });

        socket.on("pause timer", () => {
            timer.pause();
        });

        socket.on("get salas", (cb) => {
            response.json().then((data) => cb(data));
        });
    });
};
