const { getData } = require("../utils/utils");
require("dotenv").config();
const urlApi = process.env.API_TIMERS;

async function getTimerEvents(token) {
    var url = urlApi + "/api/TimerEventos";
    try {
        const res = await getData(url, token);
        return res;
    } catch (e) {
        return null;
    }
}

async function getTimerEventByIdRoom(idSala, token) {
    var url = urlApi + "/api/TimerEventos/EventosSala/"+idSala;
    try {
        const res = await getData(url, token);
        return res;
    } catch (e) {
        return null;
    }
}

module.exports = {
    getTimerEvents,
    getTimerEventByIdRoom
};