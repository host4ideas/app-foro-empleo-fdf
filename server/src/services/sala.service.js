const { putData, getData, postData, deleteData } = require("../utils/utils");
require("dotenv").config();
const urlApi = process.env.API_TIMERS;

async function deleteSala(idsala, token) {
    var url = urlApi + "/api/salas/" + idsala;
    try {
        await deleteData(url, token);
        return true;
    } catch (e) {
        return false;
    }
}
async function getSalaById(idsala, token) {
    var url = urlApi + "/api/salas/" + idsala;
    try {
        const response = await getData(url, token);
        return response;
    } catch (e) {
        return null;
    }
}

async function getSalas(token) {
    var url = urlApi + "/api/salas/";
    try {
        const response = await getData(url, token);
        return response;
    } catch (e) {
        return null;
    }
}

async function newSala(sala, token) {
    var url = urlApi + "/api/salas";
    try {
        await postData(url, sala, token);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    deleteSala,
    getSalaById,
    newSala,
    getSalas
};