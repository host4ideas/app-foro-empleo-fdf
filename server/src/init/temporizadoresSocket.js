// Requests
const {
    updateTimer,
    getTimerById,
    newTimer,
    getTimers,
} = require("../services/temporizadores.service");

module.exports = function (socket) {
    socket.on("update timer", (cb, timer) => {
        const token = socket.request.user.token;
        updateTimer(timer, token).then((res) => cb(res));
    });
    socket.on("find timer", (id, cb) => {
        const token = socket.request.user.token;
        getTimerById(id, token).then((res) => cb(res));
    });
    socket.on("get timers", (cb) => {
        const token = socket.request.user.token;
        getTimers(token).then((res) => cb(res));
    });
    socket.on("new timer", (timer, cb) => {
        const token = socket.request.user.token;
        newTimer(timer, token).then((res) => cb(res));
    });
};
