const db = require("../models");
const Avaliacao = db.avaliacoes;
const Usuario = db.usuarios;
const Util = db.utils;
const Op = db.Sequelize.Op;

exports.avaliar = (req, res) => {
    if (!req.body.usuarioId || !req.body.gameId || !req.body.nota) {
        res.status(400).send({
            message: "O conteúdo não pode ficar vazio!"
        });
        return;
    }
    const avaliacao = {
        usuarioId: req.body.usuarioId,
        gameId: req.body.gameId,
        nota: req.body.nota,
        texto: req.body.texto
    };

    Avaliacao.findOne({ where: { usuarioId: avaliacao.usuarioId, gameId: avaliacao.gameId } })
        .then(function(obj) {
            // update
            if(obj) {
                return obj.update(avaliacao).then(function (data) {
                    res.send(data)
                })
            }
            // insert
            return Avaliacao.create(avaliacao).then(function (data) {
                res.send(data)
            });
        })
};

exports.obterDeUmjogo = (req, res) => {
    if (!req.params.id ) {
        res.status(400).send({
            message: "O conteúdo não pode ficar vazio!"
        });
        return;
    }
    Avaliacao.findAll({ where: { gameId: req.params.id } })
        .then(async function(obj) {
            for (const key in obj) {
                await Usuario.findByPk(obj[key].usuarioId)
                    .then(data => {
                        obj[key].dataValues.autor = data.usuario;
                    })
                await Util.findAll({ where: { avaliacaoId: obj[key].id } })
                    .then(data => {
                        var x = []
                        data.forEach(element => {
                            x.push(element.util)
                        });
                        obj[key].dataValues.util = [x.filter(x => x === 0).length, x.filter(x => x === 1).length];
                    })
            }
            res.json(obj)
        })
}