const { putData, getData, postData, deleteData } = require("../utils/utils");
const urlApi = process.env.API_TIMERS;
require("dotenv").config();

/**
 * @typedef {object} empresa
 * @property {number} idEmpresa ID de la empresa
 * @property {string} nombreEmpresa Nombre de la empresa
 * @property {string} imagen Duracion de la empresa en ms
 */

/**
 * Devuelve todas las empresas
 * @param {string} token Authorization token
 * @returns {Promise<empresa[]> | null}
 */
async function getEmpresas(token) {
    const url = urlApi + "/api/empresas";
    try {
        const empresas = await getData(url, token);
        return empresas;
    } catch (e) {
        return null;
    }
}

/**
 * Borra la empresa deseada.
 * @param {string} idEmpresa ID de la empresa para borrar.
 * @param {string} token Authorization token
 * @returns {boolean}
 */
async function deleteEmpresa(idEmpresa, token) {
    const url = urlApi + "/api/empresas/" + idEmpresa;
    try {
        await deleteData(url, token);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Devuelve la empresa buscada por id.
 * @param {string} idEmpresa ID de la empresa deseada.
 * @param {string} token Authorization token
 * @returns {Promise<empresa> | null}
 */
async function getEmpresaById(idEmpresa, token) {
    const url = urlApi + "/api/empresas/" + idEmpresa;
    try {
        const empresa = await getData(url, token);
        return empresa;
    } catch (e) {
        return null;
    }
}

/**
 * Inserta una nueva empresa en la BBDD. Obvia idempresa.
 * @param {empresa} nuevaEmpresa Nueva empresa para insertar.
 * @param {string} token Authorization token
 * @returns {boolean}
 */
async function newEmpresa(nuevaEmpresa, token) {
    const url = urlApi + "/api/empresas/createEmpresa/"+nuevaEmpresa;
    try {
        await postData(url, null, token);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    deleteEmpresa,
    getEmpresaById,
    newEmpresa,
    getEmpresas
};