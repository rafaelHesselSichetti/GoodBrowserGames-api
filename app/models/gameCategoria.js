const categoria = require("./categoria");
const game = require("./game");

module.exports = (sequelize, Sequelize) => {
    const GameCategoria = sequelize.define("game_categoria", {
        categoriaId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'categorias',
                key: 'id'
            }
        },
        gameId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'games',
                key: 'id'
            }
        }
    });

    return GameCategoria;
};