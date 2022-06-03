const db = require("../models");
const Categoria = db.categorias;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {
    const categoria = req.query.categoria;
    var condition = categoria ? {
        usuario: {
            [Op.like]: `%${categoria}%`
        }
    } : null;

    Categoria.findAll({
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