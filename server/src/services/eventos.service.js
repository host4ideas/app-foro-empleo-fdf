const { getData, putData } = require("../utils/utils");
require("dotenv").config();
const urlApi = process.env.API_TIMERS;

async function getEvents(token) {
    var url = urlApi + "/api/eventos";
    try {
        const res = await getData(url, token);
        return res;
    } catch (e) {
        return null;
    }
}

async function updateEvent(event, token) {
    var url = urlApi + "/api/eventos";
    try {
        await putData(url, event, token);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    updateEvent,
    getEvents,
};
