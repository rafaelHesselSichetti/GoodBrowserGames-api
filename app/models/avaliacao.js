module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("avaliacao", {
        nota: {
            type: Sequelize.INTEGER(11)
        },
        texto: {
            type: Sequelize.STRING
        },
        gameId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'games',
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
    }, {
        tableName: 'avaliacoes'
    });
    return Categoria;
};