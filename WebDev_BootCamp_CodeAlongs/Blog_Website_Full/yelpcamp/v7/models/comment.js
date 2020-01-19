// var mongoose = require("mongoose");

// var commentschema = new mongoose.Schema({
//     text: String,
//     author : String
// });

// module.exports = mongoose.model("Comment",commentschema);

var  mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://webddev:blackwidow@webdevproject-fzonw.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true, useCreateIndex:true}).then(() => {
// 	console.log("Connected to db");
// }).catch(err => {
// 	console.log("Error:",err.message);
// });
var commentSchema=new mongoose.Schema({
    text:String,
    author:String
    // description:String,
    // comments:[{
    //     type :mongoose.Schema.Types.ObjectId,
    //     ref:"commment"
    // }]
});

module.exports=mongoose.model("comment",commentSchema);