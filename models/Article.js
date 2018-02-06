var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    headline: {
        type:String,
        required: true,
        unique: true
    },
    summary: {
        type:String,
        required:true
    },
    url: {
        type:String,
        required:true,
        unique: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
    

})


var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;