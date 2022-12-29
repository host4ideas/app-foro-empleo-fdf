const { putData, postData, getData, deleteData } = require("../utils/utils");
require("dotenv").config();

/**
 * @typedef {object} categoria
 * @property {number} idCategoria ID de la categoria
 * @property {string} categoria Nombre de la categoria
 * @property {number} duracion Duracion de la categoria en ms
 */

/**
 * Devuelve todas las categorias
 * @param {string} token Authorization token
 * @returns {Promise<categoria[]> | null}
 */
async function getCategorias(token) {
    const request = process.env.API_TIMERS + "/api/CategoriasTimer";
    try {
        const categorias = await getData(request, token);
        return categorias;
    } catch (error) {
        console.warn(error);
        return null;
    }
}

/**
 * Devuelve la categoria buscada por id.
 * @param {string} idCategoria ID de la categoria deseada.
 * @param {string} token Authorization token
 * @returns {Promise<categoria> | null}
 */
async function findCategoria(idCategoria, token) {
    const request =
        process.env.API_TIMERS + "/api/CategoriasTimer/" + idCategoria;
    try {
        const categoria = await getData(request, token);
        return categoria;
    } catch (error) {
        console.warn(error);
        return null;
    }
}

/**
 * Inserta una nueva categoria en la BBDD. Obvia idCategoria.
 * @param {categoria} nuevaCategoria Nueva categoria para insertar.
 * @param {string} token Authorization token
 * @returns {boolean}
 */
async function createCategoria(nuevaCategoria, token) {
    const request = process.env.API_TIMERS + "/api/CategoriasTimer";
    try {
        await postData(request, nuevaCategoria, token);
        return true;
    } catch (error) {
        console.warn(error);
        return false;
    }
}

/**
 * Actualiza una nueva categoria en la BBDD.
 * @param {categoria} nuevaCategoria Nueva categoria para insertar.
 * @param {string} token Authorization token
 * @returns {boolean}
 */
async function updateCategoria(nuevaCategoria, token) {
    const request = process.env.API_TIMERS + "/api/CategoriasTimer";
    try {
        await putData(request, nuevaCategoria, token);
        return true;
    } catch (error) {
        console.warn(error);
        return false;
    }
}

/**
 * Borra la categoria deseada.
 * @param {string} idCategoria ID de la categoria para borrar.
 * @param {string} token Authorization token
 * @returns {boolean}
 */
async function deleteCategoria(idCategoria, token) {
    const request =
        process.env.API_TIMERS + "/api/CategoriasTimer/" + idCategoria;
    try {
        await deleteData(request, token);
        return true;
    } catch (error) {
        console.warn(error);
        return false;
    }
}

module.exports = {
    getCategorias,
    findCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria,
};
