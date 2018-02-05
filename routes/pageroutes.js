

module.exports = function(app, db, loginauth){

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