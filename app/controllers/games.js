const {
  categorias
} = require("../models");
const db = require("../models");
const categoria = require("../models/categoria");
const Game = db.games;
const Categoria = db.categorias;
const GameCategoria = db.gameCategorias;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  if (!req.body.nome) {
    res.status(400).send({
      message: "O conteúdo não pode ficar vazio!"
    });
    return;
  }
  const game = {
    nome: req.body.nome,
    descricao: req.body.descricao,
    banner: req.body.banner,
    url: req.body.url,
    video: req.body.video,
    data_lancamento: req.body.data_lancamento,
    categoria: req.body.categoria
  };

  var cats = []

  for (const element of game.categoria) {
    const [user, created] = await Categoria.findOrCreate({
      where: {
        nome: element
      },
    })
    cats.push(user.dataValues.id)
  }

  Game.create(game)
    .then(data => {
      res.send(data);
      cats.forEach(element => {
        GameCategoria.create({
          gameId: data.id,
          categoriaId: element
        })
      })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao criar o Game."
      });
    });
};

exports.findAll = async (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? {
    nome: {
      [Op.like]: `%${nome}%`
    }
  } : null;

  Game.findAll({
      where: condition
    })
    .then(async data => {
      for (const key in data) {
        data[key].dataValues.categoria = []
        var gmCat = await GameCategoria.findAll({
          where: {
            gameId: data[key].id
          }
        })
        for (const element of gmCat) {
          const y = await Categoria.findByPk(element.dataValues.categoriaId)
          data[key].dataValues.categoria.push(y.dataValues.nome)
        }
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao recuperar os Games."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Game.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível encontrar o game com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao recuperar o game com id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Game.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "O game foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não é possível atualizar o game com id=${id}. Talvez o game não foi encontrado ou req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar o game com id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Game.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "O game foi excluído com sucesso!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};
