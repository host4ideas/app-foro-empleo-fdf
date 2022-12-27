// Requests
const { updateEvent, getEvents } = require("../services/eventos.service");

module.exports = function (socket) {
    socket.on("eventos", (cb) => {
        const token = socket.request.user.token;
        getEvents(token).then((eventos) => cb(eventos));
    });
    socket.on("update event", (cb, evento) => {
        const token = socket.request.user.token;
        updateEvent(evento, token).then((res) => cb(res));
    });
};
