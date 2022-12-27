// Requests
const {
    updateTimer,
    getTimerById,
    newTimer,
} = require("../services/temporizadores.service");

module.exports = function (socket) {
    socket.on("update timer", (cb, timer) => {
        const token = socket.request.user.token;
        updateTimer(timer, token).then((res) => cb(res));
    });
    socket.on("find timer", (cb, id) => {
        const token = socket.request.user.token;
        getTimerById(id, token).then((res) => cb(res));
    });
    socket.on("new timer", (cb, timer) => {
        const token = socket.request.user.token;
        newTimer(timer, token).then((res) => cb(res));
    });
};
