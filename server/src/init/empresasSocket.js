// Requests
const {
    getEmpresas,
    getEmpresaById,
    deleteEmpresa,
    newEmpresa,
} = require("../services/empresa.service");

module.exports = function (socket) {
    socket.on("empresas", (cb) => {
        const token = socket.request.user.token;
        getEmpresas(token).then((empresas) => cb(empresas));
    });

    socket.on("find empresa", (cb, idEmpresa) => {
        const token = socket.request.user.token;
        getEmpresaById(idEmpresa, token).then((empresa) => cb(empresa));
    });

    socket.on("delete empresa", (cb, idEmpresa) => {
        const token = socket.request.user.token;
        deleteEmpresa(idEmpresa, token).then((result) => cb(result));
    });

    socket.on("create empresa", (cb, empresa) => {
        const token = socket.request.user.token;
        newEmpresa(empresa, token).then((result) => cb(result));
    });
};