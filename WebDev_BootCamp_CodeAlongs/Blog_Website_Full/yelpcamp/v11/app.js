var express = require("express");
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://webddev:blackwidow@webdevproject-fzonw.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true, useCreateIndex:true}).then(() => {
	console.log("Connected to db");
}).catch(err => {
	console.log("Error:",err.message);
});


var bodyparser = require("body-parser");
var passport=require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var campground = require("./models/campground");
var Comments  = require("./models/comment");
var User  =require("./models/user");
var seeddb = require("./seeds");

var app = express();
app.use(bodyparser.urlencoded({encoded:true}));
app.set("view engine","ejs"); 
app.use(express.static(__dirname+"/public"));
console.log(__dirname);
app.use(methodOverride("_method"));
app.use(flash());
//seeddb(); //seed the databse

//requiring routes
      var campgroundsRoutes  = require("./routes/campgrounds");
      var commentsRoutes     = require("./routes/comments");
      var authRoutes         = require("./routes/auth");
//passprt config
app.use(require("express-session")({
    secret:"this is anish",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//app.use(express.bodyParser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
    next();
});


app.use(authRoutes);
app.use(commentsRoutes);
app.use(campgroundsRoutes);
// campground.create(
//     {   name:"SpiderVerse", 
//         image:"https://images.pexels.com/photos/419293/pexels-photo-419293.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//         description:"Perform strength exercises to improve your climbing ability. Your goal should be four to five workouts per week—three days of strength training work, plus at least a day or two of cardiovascular exercise.You’ll want to balance these workouts with time in the climbing gym. A simple way to do this is to focus on strength and fitness one week and then focus on climbing technique the next week.While you will get stronger through climbing workouts alone, having focused strength phases in your training will translate to improvements when you are taking on the next problem at the crag or in the gym."
//      } ,function(err,campground){
//          if(err){
//              console.log(err);
//          }else{
//              console.log("New Camp Gounds");
//              console.log(campground);
//          }
//      });ss
// var campgrounds=[
//         {name:"Capt America Training Ground", image:"https://images.pexels.com/photos/305239/pexels-photo-305239.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//         {name:"Deadpool's Pool", image:"https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500 "},
//         {name:"SpiderVerse", image:"https://images.pexels.com/photos/419293/pexels-photo-419293.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//         {name:"Hawk Eye'Camp", image:"https://images.pexels.com/photos/545006/pexels-photo-545006.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//         {name:"Iron Man's Tech Camp", image:"https://images.pexels.com/photos/1329068/pexels-photo-1329068.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//         {name:"Black Widow's Fight Camp", image:"https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//         {name:"Dr.Strange Magic Camp", image:"https://images.pexels.com/photos/1236730/pexels-photo-1236730.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//         {name:"Hulk's Smash Camp", image:"https://images.pexels.com/photos/930434/pexels-photo-930434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//       ] 


app.listen(process.env.PORT,process.env.IP,function(){// express listens for request here
    console.log("Server has started");
});

app.listen(3000, () => {
	console.log("Server Listening");
});