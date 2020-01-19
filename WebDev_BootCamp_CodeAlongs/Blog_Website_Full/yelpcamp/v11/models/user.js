var mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://webddev:blackwidow@webdevproject-fzonw.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true, useCreateIndex:true}).then(() => {
// 	console.log("Connected to db");
// }).catch(err => {
// 	console.log("Error:",err.message);
// });
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
    username:String,
    password:String
});
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);