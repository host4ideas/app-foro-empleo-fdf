const {
  getTimerEvents,
  getTimerEventByIdRoom,
} = require("../services/tiemposeventos.service");

module.exports = function (socket) {
  socket.on("timereventos", (cb) => {
    // const token = socket.request.user.token;
    getTimerEvents(token).then((eventos) => cb(eventos));
  });
  socket.on("get timereventos sala", (idSala, cb) => {
    // const token = socket.request.user.token;
    getTimerEventByIdRoom(idSala, token).then((eventos) => cb(eventos));
  });
};
