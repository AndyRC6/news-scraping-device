var mongoose = require("mongoose");
var loginauth = require("../middleware/loginauth");
var db = require("../models");


mongoose.connect('mongodb://heroku_0vg7r2nr:fdqb2sr9c9vc9bd4uc92afrqg@ds123728.mlab.com:23728/heroku_0vg7r2nr');
mongoose.Promise = Promise;

module.exports = function(app){

    app.get("/", function(req, res){
        res.render("login");
    })

    app.get("/login", function(req, res){
        res.render("login");
    })

    app.get("/register", function(req, res){
        res.render("register");
    })

    app.post("/register", function(req, res){
        db.User
        .create(req.body)
        .then(function(newuser){
            res.json(newuser);
        })
    })

    app.post("/login", function(req, res){
        if (req.body.email && req.body.password) {
            db.User.authenticate(req.body.email, req.body.password, function (error, user) {
              if (error || !user) {
                return res.render("login", {error401: "Invalid email or password"});
              } else {
                req.session.userId = user._id;
                return res.redirect('/home');
              }
            });
          } else {
            return res.render("login", {error400: "All fields required"});
          }
    })

    app.get('/logout', function (req, res, next) {
        if (req.session) {
          // delete session object
          req.session.destroy(function (err) {
            if (err) {
              return err;
            } else {
              return res.redirect('/');
            }
          });
        }
      });

      app.get("/home", loginauth, function(req, res){
        var userid = req.session.userId;
        db.User.findById(userid)
        .exec(function(error, user){
            if(error){
                return res.render("login");
            }
            else
            {
                console.log(user);
                res.render("index", user);
            }
        })
        
      })

}