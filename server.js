const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

const db = require("./app/models");
//db.sequelize.sync({force: true});
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to blog application."
  });
});

require("./app/routes/usuario.routes")(app);
require("./app/routes/game.routes")(app);
require("./app/routes/avaliacao.routes")(app);
require("./app/routes/util.routes")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});