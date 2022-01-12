const express = require("express"),
      app     = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");


// routes
var indexRoutes = require('./routes/index');
var dailyRoutes  = require('./routes/daily');
var contact = require('./routes/contact')

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(session({
  secret:"secret123",
  saveUninitialized: true,
  resave: true
}));
app.use(flash());

app.use(indexRoutes);
app.use(dailyRoutes);
app.use(contact);

app.get('*', function(req, res) {
  res.send("PAGE NOT FOUND")
});

port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('server started on ' + port);
  });
