// Requests
const { getSalas, getSalaById } = require("../../services/sala.service");

module.exports = function (socket) {
    socket.on("salas", (cb) => {
        const token = socket.request.user.token;
        getSalas(token).then((salas) => cb(salas));
    });

    socket.on("find sala", (idSala, cb) => {
        const token = socket.request.user.token;
        getSalaById(idSala, token).then((sala) => cb(sala));
    });
};
