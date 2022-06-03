module.exports = app => {
    const avaliacao = require("../controllers/avaliacao.js");
  
    var router = require("express").Router();
    router.post("/", avaliacao.avaliar);
    router.get("/:id", avaliacao.obterDeUmjogo);
  
    app.use('/api/rate', router);

  };
  