var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyparser = require("body-parser");


mongoose.connect("mongodb://localhost/avenger_camp",{useNewUrlParser:true});

app.use(bodyparser.urlencoded({encoded:true}));
app.set("view engine","ejs");

//schema setup
var campgroundSchema= new mongoose.Schema({
    name:String,
    image:String,
    description:String
});

var campground=mongoose.model("campground",campgroundSchema);

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
//      });
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
app.get("/",function(req,res){
    res.render("landingp")
});

//INDEX RESTFULL ROUTE
app.get("/campgrounds",function(req,res){
  //from db
  campground.find({},function(err,campgrounds){
      if(err){
          console.log(err);
      }else{
          res.render("index",{campg : campgrounds});
      }
  });
  //res.render("campgrounds",{campg : campgrounds});
});

//NEW RESTULL ROUTE
app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

//CREATE RESTFULL ROUTE
app.post("/campgrounds",function(req,res){
    var name = req.body.campname;
    var image = req.body.image;
    var desc = req.body.description;
    var newcg = {name:name,image:image,description:desc};
    campground.create(newcg,function(err,newCreate){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//SHOW RESTFULL ROUTE
app.get("/campgrounds/:id",function(req,res){
    campground.findById(req.params.id,function(err,foundCampg){
       if(err){
           console.log(err);
       } else{
           res.render("show",{campg :foundCampg});
       }
    });
    //res.send("This is the show page ");
});
app.listen(process.env.PORT,process.env.IP,function(){// express listens for request here
    console.log("Server has started");
});