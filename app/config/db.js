module.exports = {
  HOST: process.env.IP || "209.126.13.74",
  USER: process.env.SQL_USER || "gbg",
  PASSWORD: process.env.SQL_PASS || "gbg123hsk",
  DB: process.env.SQL_DB || "GBG",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};