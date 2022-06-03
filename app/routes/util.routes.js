module.exports = app => {
    const util = require("../controllers/util.js");
  
    var router = require("express").Router();
    router.post("/", util.avaliarUtil);
    router.get("/:avaliacaoId", util.getUtil);
  
    app.use('/api/util', router);

};
  