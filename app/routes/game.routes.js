module.exports = app => {
    const game = require("../controllers/games.js");
    const categoria = require('../controllers/categoria.js')
    const gameCategoria = require("../controllers/gameCategoria.js");
  
    var router = require("express").Router();
    router.post("/", game.create);
    router.get("/", game.findAll);
    router.get("/:id", game.findOne);
    router.put("/:id", game.update);
    router.delete("/:id", game.delete);
    app.use('/api/games', router);
    
    var router = require("express").Router();
    router.get('/', categoria.findAll);
    router.get('/:id', gameCategoria.findGamesPorCategoria);
    app.use('/api/categorias', router);
  };
  