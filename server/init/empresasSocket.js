// Requests
const {
  getEmpresas,
  getEmpresaById,
  deleteEmpresa,
  newEmpresa,
} = require("../services/empresa.service");

module.exports = function (socket) {
  socket.on("empresas", (cb) => {
    // const token = socket.request.user.token
    getEmpresas().then((empresas) => cb(empresas));
  });

  socket.on("find empresa", (idEmpresa, cb) => {
    // const token = socket.request.user.token
    getEmpresaById(idEmpresa).then((empresa) => cb(empresa));
  });

  socket.on("delete empresa", (idEmpresa, cb) => {
    // const token = socket.request.user.token
    deleteEmpresa(idEmpresa).then((result) => cb(result));
  });

  socket.on("create empresa", (nombre, cb) => {
    // const token = socket.request.user.token
    newEmpresa(nombre).then((result) => cb(result));
  });
};
