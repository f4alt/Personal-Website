const express = require("express");
const router = express.Router();

router.get('/CSCE445', function(req, res) {
  res.render("CSCE445");
  // res.send("hello from 445");
});

module.exports = router;
