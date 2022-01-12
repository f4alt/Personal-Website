const express = require("express");
const router = express.Router();

router.get('/', function(req, res) {
  res.render("index", {msg: req.flash('msg')});
});

module.exports = router;
