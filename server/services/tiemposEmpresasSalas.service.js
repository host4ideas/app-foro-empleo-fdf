const { putData, postData, deleteData, getData } = require("../utils/utils");
require("dotenv").config();
const urlApi =
    process.env.API_TIMERS |
    "https://apitimersforoempleofdf.azurewebsites.net/";

/**
 * Devuelve todos los tiempos empresa sala
 * @param {string} token Authorization token
 * @returns {Promise<object[]> | null}
 */
async function getTiempoEmpresaSalas(token) {
    const request = process.env.API_TIMERS + "/api/TiempoEmpresaSala";
    try {
        const categorias = await getData(request, token);
        return categorias;
    } catch (error) {
        console.warn(error);
        return null;
    }
}
async function updateTiempoEmpresaSala(timer, token) {
    var url = urlApi + "/api/TiempoEmpresaSala";
    try {
        await putData(url, timer, token);
        return true;
    } catch (e) {
        console.warn(error);
        return false;
    }
}
async function createTiempoEmpresaSala(timer, token) {
    var url = urlApi + "/api/TiempoEmpresaSala";
    try {
        await postData(url, timer, token);
        return true;
    } catch (e) {
        console.warn(e);
        return false;
    }
}
async function deleteTiempoEmpresaSala(id, token) {
    var url = urlApi + "/api/TiempoEmpresaSala/" + id;
    try {
        await deleteData(url, token);
        return true;
    } catch (e) {
        console.warn(e);
        return false;
    }
}
module.exports = {
    updateTiempoEmpresaSala,
    createTiempoEmpresaSala,
    deleteTiempoEmpresaSala,
    getTiempoEmpresaSalas,
};
