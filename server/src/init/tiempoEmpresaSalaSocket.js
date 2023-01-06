// Requests
const {
    createTiempoEmpresaSala,
    updateTiempoEmpresaSala,
    deleteTiempoEmpresaSala,
    getTiempoEmpresaSalas,
} = require("../services/tiemposEmpresasSalas.service");

module.exports = function (socket) {
    socket.on("tiempos_empresas_salas", (cb) => {
        const token = socket.request.user.token;
        cb("Response");
        getTiempoEmpresaSalas(token).then((res) => cb(res));
    });
    socket.on("update tiempos_empresas_salas", (tiempoEmpresaSala, cb) => {
        const token = socket.request.user.token;
        updateTiempoEmpresaSala(tiempoEmpresaSala, token).then((res) =>
            cb(res)
        );
    });
    socket.on("create tiempos_empresas_salas", (tiempoEmpresaSala, cb) => {
        const token = socket.request.user.token;
        createTiempoEmpresaSala(tiempoEmpresaSala, token).then((res) =>
            cb(res)
        );
    });
    socket.on("delete tiempo_empresa_sala", (tiempoEmpresaSalaId, cb) => {
        const token = socket.request.user.token;
        deleteTiempoEmpresaSala(tiempoEmpresaSalaId, token).then((res) =>
            cb(res)
        );
    });
};
