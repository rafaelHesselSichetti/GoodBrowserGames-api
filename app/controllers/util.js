const db = require("../models");
const Util = db.utils;
const Op = db.Sequelize.Op;


exports.getUtil = (req, res) => {
    if(!req.params.avaliacaoId) {
        res.status(400).send({
            message: "O conteúdo não pode ficar vazio!"
        });
        return;
    }
    Util.findAll({ avaliacaoId: req.params.avaliacaoId })
        .then(function(obj) {
            res.json(obj)
        })
        .catch(err => {
            res.status(500).send({
              message: err.message || "Ocorreu algum erro ao recuperar os Usuarios."
            });
        });
}

exports.avaliarUtil = (req, res) => {
    if (!req.body.usuarioId || !req.body.avaliacaoId || !req.body.util) {
        res.status(400).send({
            message: "O conteúdo não pode ficar vazio!"
        });
        return;
    }
    const util = {
        usuarioId: req.body.usuarioId,
        avaliacaoId: req.body.avaliacaoId,
        util: req.body.util
    };

    Util.findOne({ where: { usuarioId: util.usuarioId, avaliacaoId: util.avaliacaoId } })
        .then(function(obj) {
            // update
            if(obj) {
                return obj.update(util).then(function (data) {
                    res.json(data)
                })
            }
            // insert
            return Util.create(util).then(function (data) {
                res.json(data)
            });
        })
};