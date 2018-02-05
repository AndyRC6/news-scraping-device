//======Modules=======
var express = require('express');
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var path = require('path');
var session = require("express-session");

var app = express();
var port = process.env.PORT || 3000;

//=======BoilerPlate=======
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
    secret: 'dont die',
    resave: true,
    saveUninitialized: false
  }));
//=======Routes=======
require("./routes/pageroutes")(app);

app.listen(port);