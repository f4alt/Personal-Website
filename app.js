const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
  res.render("index");
});

app.get('/daily', function(req, res) {
  res.render("daily");
});

app.get('*', function(req, res) {
  res.send("PAGE NOT FOUND")
});

port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('server started on ' + port);
  });
