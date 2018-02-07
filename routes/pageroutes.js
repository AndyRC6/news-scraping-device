var request = require('request');
var cheerio = require('cheerio');
var mongoose = require("mongoose");

module.exports = function(app, db, loginauth){

    app.get("/scrape", function(req, res){
      request("https://www.menshealth.com/", function(err, response, html){
        if(err) throw err;
        var $ = cheerio.load(html);

        var result = [];
        $("div.channel-image").each(function(i, element){
            result.push({
            headline: $(element).find(".channel-content").find(".article-title").find("a").text(),
            summary: $(element).find(".channel-content").find(".field-dek").text(),
            url: "https://www.menshealth.com" + $(element).find(".channel-content").find(".article-title").find("a").attr("href")
        })
        for(i = 0; i < result.length; i++){
          try{
            db.Article
            .create(result[i])
          }
          catch (err){
            throw err;
          }
        }

      })
    })
  })

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
            res.render("login", {registerSuccess: "User Created Successfully!"});
        })
    })

    app.get("/removecomments", loginauth, function(req, res){
      db.Comment.find({user: req.session.userId})
      .then(function(docs){
        for(i = 0; i < docs.length; i++)
        {
          docs[i].remove();
        }
        res.redirect("/home")
      })
    })

    app.get("/getcomments/:articleId", loginauth, function(req, res){
      var articleId = req.params.articleId;
      db.Article.findById(articleId)
      .populate({
        path:'comments',
        populate: {
          path: 'user',
          model: 'User'
        }
      })
      .then(function(data){
        var commentArray = [];
        for(i = 0; i < data.comments.length; i++)
        {
          var newcom = {
            comment: data.comments[i].text,
            user: data.comments[i].user.firstName
          }
          commentArray.push(newcom);
        } 
        res.json(commentArray);
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
                db.Article.find({}).sort({_id: -1}).limit(50)
                .exec(function(err, articles){
                  return res.render("index", {user: user, articles: articles});
                })
            }
        })
        
      })

      app.post("/comment", loginauth, function(req, res){
        var userId = req.session.userId;
        var comment = {
          text: req.body.comment,
          user: userId
        }
        var articleId = req.body.articleId;
        var commentId = "";

        db.Comment.create(comment)
        .then(function(newcomment){
          return db.Article.findByIdAndUpdate(articleId, { $push: { comments: newcomment._id } }, { new: true });
        }).then(function(newArticle){
          res.redirect("/home");
        })
      })

}