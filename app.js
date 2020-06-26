const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
  res.render("index");
});

app.get('*', function(req, res) {
  res.send("PAGE NOT FOUND")
});

port = process.env.PORT || 8080;
ip = process.env.IP || '127.0.0.1';
app.listen(port, ip, function() {
  console.log('server started on ' + port);
  });
