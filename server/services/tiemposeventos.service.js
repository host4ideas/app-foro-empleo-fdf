const { getData } = require("../utils/utils");
require("dotenv").config();
const urlApi = process.env.API_TIMERS;

async function getTimerEvents() {
  var url = urlApi + "/api/TimerEventos";
  try {
    const res = await getData(url);
    return res;
  } catch (e) {
    return null;
  }
}

async function getTimerEventByIdRoom(idSala) {
  var url = urlApi + "/api/TimerEventos/EventosSala/" + idSala;
  try {
    const res = await getData(url);
    return res;
  } catch (e) {
    return null;
  }
}

module.exports = {
  getTimerEvents,
  getTimerEventByIdRoom,
};
