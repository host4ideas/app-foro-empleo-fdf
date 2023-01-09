const { getData, putData } = require("../utils/utils");
require("dotenv").config();
const urlApi = process.env.API_TIMERS;

async function getEvents() {
  var url = urlApi + "/api/eventos";
  try {
    const res = await getData(url);
    return res;
  } catch (e) {
    return null;
  }
}

async function getEventById(idEvento) {
  var url = urlApi + "/api/eventos/" + idEvento;
  try {
    const res = await getData(url);
    return res;
  } catch (e) {
    return null;
  }
}

async function updateEvent(event) {
  var url = urlApi + "/api/eventos";
  try {
    await putData(url, event);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  updateEvent,
  getEvents,
  getEventById,
};
