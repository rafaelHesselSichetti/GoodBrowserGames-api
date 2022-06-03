module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
        nome: {
            type: Sequelize.STRING
        },
        descricao: {
            type: Sequelize.TEXT
        },
        banner: {
            type: Sequelize.STRING
        },
        data_lancamento: {
            type: Sequelize.STRING
        },
        video: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        }
    });
    return Game;
};