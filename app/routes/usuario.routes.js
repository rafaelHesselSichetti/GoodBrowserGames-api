module.exports = app => {
  const usuario = require("../controllers/usuario.js");

  var router = require("express").Router();
  router.post("/", usuario.create);
  router.get("/", usuario.findAll);
  router.get('/:id', usuario.findById);
  router.post("/validar", usuario.validarLogin);
  router.put("/:id", usuario.update);
  router.delete("/:id", usuario.delete);

  app.use('/api/usuarios', router);
};
