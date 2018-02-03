//======Modules=======
var express = require('express');
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

mongoose.Promise = Promise;
//=======BoilerPlate=======
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

require("./routes/pageroutes")(app);

app.listen(port);