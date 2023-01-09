// Requests
const {
    getTiempoEmpresaSalas,
} = require("../../services/tiemposEmpresasSalas.service");

module.exports = function (socket) {
    socket.on("tiempos_empresas_salas", (cb) => {
        const token = socket.request.user.token;
        getTiempoEmpresaSalas(token).then((res) => cb(res));
    });
};
