// Requests
const {
    getCategorias,
    findCategoria,
} = require("../services/categoriasTimer.service");

module.exports = function (socket) {
    socket.on("categorias", (cb) => {
        const token = socket.request.user.token;
        getCategorias(token).then((categorias) => cb(categorias));
    });

    socket.on("find categoria", (idCategoria, cb) => {
        const token = socket.request.user.token;
        findCategoria(idCategoria, token).then((categoria) => cb(categoria));
    });
};
