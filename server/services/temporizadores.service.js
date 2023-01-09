const { putData, getData, postData, deleteData } = require("../utils/utils");
require("dotenv").config();
const urlApi =
  process.env.API_TIMERS | "https://apitimersforoempleofdf.azurewebsites.net/";

async function updateTimer(timer) {
  var url = urlApi + "/api/timers";
  try {
    await putData(url, timer);
    return true;
  } catch (e) {
    return false;
  }
}
async function getTimers() {
  var url = urlApi + "/api/timers";
  try {
    const response = await getData(url);
    return response;
  } catch (e) {
    return null;
  }
}
async function getTimerById(id) {
  var url = urlApi + "/api/timers/" + id;
  try {
    const response = await getData(url);
    return response;
  } catch (e) {
    return null;
  }
}
async function newTimer(timer) {
  var url = urlApi + "/api/timers";
  try {
    await postData(url, timer);
    return true;
  } catch (e) {
    return false;
  }
}
async function deleteTimer(id) {
  var url = urlApi + "/api/timers/" + id;
  try {
    await deleteData(url);
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = {
  updateTimer,
  getTimerById,
  newTimer,
  getTimers,
};
