// Requests
const {
  getSalas,
  getSalaById,
  deleteSala,
  newSala,
} = require("../services/sala.service");

module.exports = function (socket) {
  socket.on("salas", (cb) => {
    // const token = socket.request.user.token
    getSalas().then((salas) => cb(salas));
  });

  socket.on("find sala", (idSala, cb) => {
    // const token = socket.request.user.token
    getSalaById(idSala).then((sala) => cb(sala));
  });

  socket.on("delete sala", (idSala, cb) => {
    // const token = socket.request.user.token
    deleteSala(idSala).then((result) => cb(result));
  });

  socket.on("create sala", (sala, cb) => {
    // const token = socket.request.user.token
    newSala(sala).then((result) => cb(result));
  });
};
