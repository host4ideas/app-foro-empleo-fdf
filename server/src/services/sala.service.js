const { putData, getData, postData, deleteData } = require("../utils/utils");
require("dotenv").config();
const urlApi = process.env.API_TIMERS;

/**
 * @typedef {object} sala
 * @property {number} idSala ID de la sala
 * @property {string} nombreSala Nombre de la sala
 */

/**
 * Borra la sala deseada.
 * @param {string} idSala ID de la sala para borrar.
 * @param {string} token Authorization token
 * @returns {boolean}
 */
async function deleteSala(idSala, token) {
    var url = urlApi + "/api/salas/" + idSala;
    try {
        await deleteData(url, token);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Devuelve la sala buscada por id.
 * @param {string} idSala ID de la sala deseada.
 * @param {string} token Authorization token
 * @returns {Promise<sala> | null}
 */
async function getSalaById(idSala, token) {
    var url = urlApi + "/api/salas/" + idSala;
    try {
        const sala = await getData(url, token);
        return sala;
    } catch (e) {
        return null;
    }
}

/**
 * Devuelve todas las salas
 * @param {string} token Authorization token
 * @returns {Promise<sala[]> | null}
 */
async function getSalas(token) {
    var url = urlApi + "/api/salas/";
    try {
        const salas = await getData(url, token);
        return salas;
    } catch (e) {
        return null;
    }
}

/**
 * Inserta una nueva sala en la BBDD. Obvia idsala.
 * @param {sala} nuevaSala Nueva sala para insertar.
 * @param {string} token Authorization token
 * @returns {boolean}
 */
async function newSala(nuevaSala, token) {
    var url = urlApi + "/api/salas/createSala/"+nuevaSala;
    try {
        await postData(url, null, token);
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