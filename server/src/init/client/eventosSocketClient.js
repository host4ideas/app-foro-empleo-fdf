// Requests
const { getEvents, getEventById } = require("../../services/eventos.service");

module.exports = function (socket) {
    socket.on("eventos", (cb) => {
        const token = socket.request.user.token;
        getEvents(token).then((eventos) => cb(eventos));
    });
    socket.on("get evento", (idEvento, cb) => {
        const token = socket.request.user.token;
        getEventById(idEvento, token).then((evento) => cb(evento));
    });
};
