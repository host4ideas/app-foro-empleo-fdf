/* import methods from './../../../server/src/utils/utils' */
import axios from 'axios';

export const getSalas = () => {
    return axios.get("https://apitimersfgg2022.azurewebsites.net/api/salas")
}

export const getSala = (idsal) => {
    return axios.get("https://apitimersfgg2022.azurewebsites.net/api/salas/" + idsal)
}

export const postSala = (nombre) => {
    return axios.post("https://apitimersfgg2022.azurewebsites.net/api/salas/createsala/" + nombre)
}

export const deleteSala = (idsal) => {
    return axios.delete("https://apitimersfgg2022.azurewebsites.net/api/salas/" + idsal)
}