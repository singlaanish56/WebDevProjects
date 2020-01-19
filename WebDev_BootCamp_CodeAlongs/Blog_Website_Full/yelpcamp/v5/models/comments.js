// var mongoose = require("mongoose");

// var commentschema = new mongoose.Schema({
//     text: String,
//     author : String
// });

// module.exports = mongoose.model("Comment",commentschema);

var  mongoose = require("mongoose");
var commentSchema=new mongoose.Schema({
    text:String,
    author:String
    // description:String,
    // comments:[{
    //     type :mongoose.Schema.Types.ObjectId,
    //     ref:"Commment"
    // }]
});

module.exports=mongoose.model("comment",commentSchema);