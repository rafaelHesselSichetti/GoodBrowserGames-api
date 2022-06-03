const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.games = require("./game.js")(sequelize, Sequelize);
db.categorias = require("./categoria.js")(sequelize, Sequelize);
db.usuarios = require("./usuario.js")(sequelize, Sequelize);

db.gameCategorias = require("./gameCategoria.js")(sequelize, Sequelize);
db.avaliacoes = require("./avaliacao.js")(sequelize, Sequelize);
db.utils = require("./util.js")(sequelize, Sequelize);

module.exports = db;