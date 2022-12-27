/* import methods from './../../../server/src/utils/utils' */
import axios from 'axios';

export const getEmpresas = () => {
    return axios.get("https://apitimersfgg2022.azurewebsites.net/api/empresas")
}

export const getEmpresa = (idemp) => {
    return axios.get("https://apitimersfgg2022.azurewebsites.net/api/empresas/" + idemp)
}

export const postEmpresa = (nombre) => {
    return axios.post("https://apitimersfgg2022.azurewebsites.net/api/empresas/createempresa/" + nombre)
}

export const deleteEmpresa = (idemp) => {
    return axios.delete("https://apitimersfgg2022.azurewebsites.net/api/empresas/" + idemp)
}

