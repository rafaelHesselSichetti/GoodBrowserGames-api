module.exports = (sequelize, Sequelize) => {
    const GameCategoria = sequelize.define("util", {
        util: {
            type: Sequelize.INTEGER(1),
        },
        avaliacaoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'avaliacoes',
                key: 'id'
            }
        },
        usuarioId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        }
    });

    return GameCategoria;
};