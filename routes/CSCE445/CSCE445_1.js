const express = require("express");
const router = express.Router();

router.get('/CSCE445_1', function(req, res) {
  res.render("CSCE445/CSCE445_1");
  // res.send("hello from 445");
});

module.exports = router;
