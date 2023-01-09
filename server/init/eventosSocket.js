// Requests
const {
    updateEvent,
    getEvents,
    getEventById,
} = require("../services/eventos.service");

module.exports = function (socket) {
    socket.on("eventos", (cb) => {
        const token = socket.request.user.token;
        getEvents(token).then((eventos) => cb(eventos));
    });
    socket.on("get evento", (idEvento, cb) => {
        const token = socket.request.user.token;
        getEventById(idEvento, token).then((evento) => cb(evento));
    });
    socket.on("update event", (evento, cb) => {
        const token = socket.request.user.token;
        updateEvent(evento, token).then((res) => cb(res));
    });
};
