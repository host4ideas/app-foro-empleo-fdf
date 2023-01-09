// Requests
const {
  getTimerById,
  getTimers,
} = require("../../services/temporizadores.service");

module.exports = function (socket) {
  socket.on("find timer", (id, cb) => {
    // const token = socket.request.user.token;
    getTimerById(id, token).then((res) => cb(res));
  });
  socket.on("get timers", (cb) => {
    // const token = socket.request.user.token;
    getTimers(token).then((res) => cb(res));
  });
};
