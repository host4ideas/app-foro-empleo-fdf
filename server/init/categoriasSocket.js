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
    // const token = socket.request.user.token
    getCategorias().then((categorias) => cb(categorias));
  });

  socket.on("find categoria", (idCategoria, cb) => {
    // const token = socket.request.user.token
    findCategoria(idCategoria).then((categoria) => cb(categoria));
  });

  socket.on("delete categoria", (idCategoria, cb) => {
    // const token = socket.request.user.token
    deleteCategoria(idCategoria).then((result) => cb(result));
  });

  socket.on("update categoria", (categoria, cb) => {
    // const token = socket.request.user.token
    updateCategoria(categoria).then((result) => cb(result));
  });

  socket.on("create categoria", (categoria, cb) => {
    // const token = socket.request.user.token
    createCategoria(categoria).then((result) => cb(result));
  });
};
