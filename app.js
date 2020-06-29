const express = require("express"),
      app     = express();

// routes
var indexRoutes = require('./routes/index');
var dailyRoutes  = require('./routes/daily');

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(indexRoutes);
app.use(dailyRoutes);

app.get('*', function(req, res) {
  res.send("PAGE NOT FOUND")
});

port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('server started on ' + port);
  });
