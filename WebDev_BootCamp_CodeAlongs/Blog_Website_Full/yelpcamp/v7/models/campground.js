var  mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://webddev:blackwidow@webdevproject-fzonw.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true, useCreateIndex:true}).then(() => {
// 	console.log("Connected to db");
// }).catch(err => {
// 	console.log("Error:",err.message);
// });
var campgroundSchema= new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    comments:[{
        type :mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }]
});

module.exports=mongoose.model("campground",campgroundSchema);