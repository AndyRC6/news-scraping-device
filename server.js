//======Modules=======
var express = require('express');
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var path = require('path');
var session = require("express-session");
var mongoose = require("mongoose");
var MongoStore = require("connect-mongo")(session);

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
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.createConnection('mongodb://heroku_0vg7r2nr:fdqb2sr9c9vc9bd4uc92afrqg@ds123728.mlab.com:23728/heroku_0vg7r2nr')
      })
  }));

  
  mongoose.Promise = Promise;
  mongoose.connect('mongodb://heroku_0vg7r2nr:fdqb2sr9c9vc9bd4uc92afrqg@ds123728.mlab.com:23728/heroku_0vg7r2nr');
  var db = require("./models");
  var loginauth = require("./middleware/loginauth");
//=======Routes=======
require("./routes/pageroutes")(app, db, loginauth);

app.listen(port);