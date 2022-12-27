const { putData, getData, postData, deleteData } = require("../utils/utils");
require("dotenv").config();
const urlApi = process.env.API_TIMERS;

async function deleteEmpresa(idempresa, token) {
    var url = urlApi + "/api/empresas/" + idempresa;
    try {
        await deleteData(url, token);
        return true;
    } catch (e) {
        return false;
    }
}
async function getEmpresaById(idempresa, token) {
    var url = urlApi + "/api/empresas/" + idempresa;
    try {
        const response = await getData(url, token);
        return response;
    } catch (e) {
        return null;
    }
}

async function getEmpresas(token) {
    var url = urlApi + "/api/empresas/";
    try {
        const response = await getData(url, token);
        return response;
    } catch (e) {
        return null;
    }
}

async function newEmpresa(empresa, token) {
    var url = urlApi + "/api/empresas";
    try {
        await postData(url, empresa, token);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    updateEmpresa,
    getEmpresaById,
    newEmpresa,
    getEmpresas
};