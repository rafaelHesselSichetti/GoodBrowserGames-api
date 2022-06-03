const db = require("../models");
const GameCategorias = db.gameCategorias;
const Game = db.games;
const Op = db.Sequelize.Op;


exports.findGamesPorCategoria = (req, res) => {
    const id = req.params.id;
    GameCategorias.findAll({where: { categoriaId: id }})
    .then(async data => {
        for (const key in data) {
            await Game.findOne({where: { id: data[key].dataValues.gameId }})
            .then(result => {
                data[key].dataValues.nome = result.dataValues.nome
                data[key].dataValues.descricao = result.dataValues.descricao
                data[key].dataValues.banner = result.dataValues.banner
                data[key].dataValues.data_lancamento = result.dataValues.data_lancamento
                data[key].dataValues.video = result.dataValues.video
                data[key].dataValues.url = result.dataValues.url
            })
        }
        res.json(data)
      })
}