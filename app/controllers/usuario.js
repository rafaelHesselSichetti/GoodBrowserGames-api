const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.usuario) {
    res.status(400).send({
      message: "O conteúdo não pode ficar vazio!"
    });
    return;
  }
  const usuario = {
    usuario: req.body.usuario,
    senha: req.body.senha,
    email: req.body.email,
    nome: req.body.nome,
    dt_nascimento: req.body.nome,
    estado: req.body.estado,
    pais: req.body.pais
  };

  Usuario.findAll({ where: { usuario: usuario.usuario } }).then(data => {
    if(data.length == 0) {
      Usuario.create(usuario)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Ocorreu algum erro ao criar o Usuario."
          });
        });
    } else {
      res.send({
        error: "Usuario ja cadastrado no banco de dados!"
      })
    }
  })
};

exports.findById = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "O conteúdo não pode ficar vazio!"
    });
    return;
  }
  Usuario.findByPk(req.params.id)
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao criar o Usuario."
      });
    });
}

exports.findAll = (req, res) => {
  const usuario = req.query.usuario;
  var condition = usuario ? {
    usuario: {
      [Op.like]: `%${usuario}%`
    }
  } : null;

  Usuario.findAll({
      where: condition
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao recuperar os Usuarios."
      });
    });
};

exports.findOne = (req, res) => {
  const usuario = req.params.usuario;
  const senha = req.params.senha;

  Usuario.findOne({where: { usuario: usuario, senhha: senha }})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível encontrar o usuario com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao recuperar o usuario com id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Usuario.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "O usuario foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não é possível atualizar o usuario com id=${id}. Talvez o usuario não foi encontrado ou req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar o usuario com id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Usuario.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "O usuario foi excluído com sucesso!"
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



exports.validarLogin = (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;

  Usuario.findOne({where: { usuario: usuario, senha: senha }})
    .then(data => {
      if (data) {
        res.json(data)
      } else {
        res.json({error: 'Usuario ou senha errada!'})
      }
    })
    .catch(err => {
      res.send(err)
    });
};