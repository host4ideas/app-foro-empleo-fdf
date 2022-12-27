// Requests
const {
    getSalas,
    getSalaById,
    deleteSala,
    newSala,
} = require("../services/sala.service");

module.exports = function (socket) {
    socket.on("salas", (cb) => {
        const token = socket.request.user.token;
        getSalas(token).then((salas) => cb(salas));
    });

    socket.on("find sala", (cb, idSala) => {
        const token = socket.request.user.token;
        getSalaById(idSala, token).then((sala) => cb(sala));
    });

    socket.on("delete sala", (cb, idSala) => {
        const token = socket.request.user.token;
        deleteSala(idSala, token).then((result) => cb(result));
    });

    socket.on("create sala", (cb, sala) => {
        const token = socket.request.user.token;
        newSala(sala, token).then((result) => cb(result));
    });
};