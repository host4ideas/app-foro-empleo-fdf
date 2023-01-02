const { putData, getData, postData, deleteData } = require("../utils/utils");
require("dotenv").config();
const urlApi =
    process.env.API_TIMERS |
    "https://apitimersforoempleofdf.azurewebsites.net/";

async function updateTimer(timer, token) {
    var url = urlApi + "/api/timers";
    try {
        await putData(url, timer, token);
        return true;
    } catch (e) {
        return false;
    }
}
async function getTimers(token) {
    var url = urlApi + "/api/timers";
    try {
        const response = await getData(url, token);
        return response;
    } catch (e) {
        return null;
    }
}
async function getTimerById(id, token) {
    var url = urlApi + "/api/timers/" + id;
    try {
        const response = await getData(url, token);
        return response;
    } catch (e) {
        return null;
    }
}
async function newTimer(timer, token) {
    var url = urlApi + "/api/timers";
    try {
        await postData(url, timer, token);
        return true;
    } catch (e) {
        return false;
    }
}
async function deleteTimer(id, token) {
    var url = urlApi + "/api/timers/" + id;
    try {
        await deleteData(url, token);
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
