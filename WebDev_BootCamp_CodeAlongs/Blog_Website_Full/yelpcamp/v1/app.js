var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({encoded:true}));
app.set("view engine","ejs");
var campgrounds=[
        {name:"Capt America Training Ground", image:"https://images.pexels.com/photos/305239/pexels-photo-305239.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name:"Deadpool's Pool", image:"https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500 "},
        {name:"SpiderVerse", image:"https://images.pexels.com/photos/419293/pexels-photo-419293.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name:"Hawk Eye'Camp", image:"https://images.pexels.com/photos/545006/pexels-photo-545006.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name:"Iron Man's Tech Camp", image:"https://images.pexels.com/photos/1329068/pexels-photo-1329068.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name:"Black Widow's Fight Camp", image:"https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name:"Dr.Strange Magic Camp", image:"https://images.pexels.com/photos/1236730/pexels-photo-1236730.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name:"Hulk's Smash Camp", image:"https://images.pexels.com/photos/930434/pexels-photo-930434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
      ] 
app.get("/",function(req,res){
    res.render("landingp")
});


app.get("/campgrounds",function(req,res){
  res.render("campgrounds",{campg : campgrounds});
});
app.get("/campgrounds/new",function(req,res){
    res.render("new");
});
app.post("/campgrounds",function(req,res){
    var name = req.body.campname;
    var image = req.body.image;
    var newcg = {name:name,image:image};
    campgrounds.push(newcg);
    
    res.redirect("/campgrounds");
});
app.listen(process.env.PORT,process.env.IP,function(){// express listens for request here
    console.log("Server has started");
});