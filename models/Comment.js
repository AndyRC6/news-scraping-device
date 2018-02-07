var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

    text: {
        type:String,
        required:true
    },
    user: {
        type: Schema.Types.ObjectId
    }    

})


module.exports = mongoose.model('Comment', CommentSchema);