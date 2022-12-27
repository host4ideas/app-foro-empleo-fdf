// Requests
const { updateEvent } = require("../services/eventos.service");

module.exports = function (socket) {
    socket.on("update event", (cb, evento) => {
        const token = socket.request.user.token;
        updateEvent(evento, token).then((res) => cb(res));
    });
};
