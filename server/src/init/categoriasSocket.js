// Requests
const {
    getCategorias,
    findCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria,
} = require("../services/categoriasTimer.service");

module.exports = function (socket) {
    socket.on("categorias", (cb) => {
        const token = socket.request.user.token;
        getCategorias(token).then((categorias) => cb(categorias));
    });

    socket.on("find categoria", (cb, idCategoria) => {
        const token = socket.request.user.token;
        findCategoria(idCategoria, token).then((categoria) => cb(categoria));
    });

    socket.on("delete categoria", (cb, idCategoria) => {
        const token = socket.request.user.token;
        deleteCategoria(idCategoria, token).then((result) => cb(result));
    });

    socket.on("update categoria", (cb, categoria) => {
        const token = socket.request.user.token;
        updateCategoria(categoria, token).then((result) => cb(result));
    });

    socket.on("create categoria", (cb, categoria) => {
        const token = socket.request.user.token;
        createCategoria(categoria, token).then((result) => cb(result));
    });
};
