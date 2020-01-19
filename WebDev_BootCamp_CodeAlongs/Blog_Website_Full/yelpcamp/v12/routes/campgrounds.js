var express = require("express");
var router  = express.Router({mergeParams:true});
var campground = require("../models/campground");
var Comments  = require("../models/comment");
var User  =require("../models/user");
var middleware = require("../middleware/index.js");

//INDEX RESTFULL
router.get("/campgrounds",function(req,res){
  //from db
  campground.find({},function(err,campgrounds){
      if(err){
          console.log(err);
      }else{
          res.render("campgrounds/index",{campg : campgrounds,currentUser:req.user});
      }
  });
  //res.render("campgrounds",{campg : campgrounds});
});

//NEW RESTULL ROUTE
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//CREATE RESTFULL ROUTE
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
    var name = req.body.campname;
    var image = req.body.image;
    var desc = req.body.description;
	var price = req.body.price;
	var author ={
		id: req.user._id,
		username : req.user.username
	}
    var newcg = {name:name,image:image,description:desc,price:price, author:author};
	console.log(newcg);
    campground.create(newcg,function(err,newCreate){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//SHOW RESTFULL ROUTE
router.get("/campgrounds/:id",function(req,res){
    campground.findById(req.params.id).populate({path:"comments",model:Comments}).exec(function(err,foundCampg){
       if(err){
           console.log(err);
       } else{
          if(!foundCampg){
					req.flash("error","Item Not Found");
					return res.redirect("back");
				}
           console.log(foundCampg);
           res.render("campgrounds/show",{campg :foundCampg});
       }
    });
    //res.send("This is the show page ");
});
//edit campground
router.get("/campgrounds/:id/edit",middleware.campgroundonwership,function(req,res){
	campground.findById(req.params.id,function(err,foundcampground){
			if(!foundcampground){
					req.flash("error","Item Not Found");
					return res.redirect("back");
				}
			res.render("campgrounds/edit",{campground : foundcampground});
			
	});
});
//update campground
router.put("/campgrounds/:id",middleware.campgroundonwership,function(req,res){
	//find and update campground
	
	campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updatedcampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			//redirect somewhere
			// if(!updatedcampground){
			// 		req.flash("error","Item Not Found");
			// 		return res.redirect("back");
			// 	}
			res.redirect("/campgrounds/"+ req.params.id);
		}
	});
	
});

//delete campground
router.delete("/campgrounds/:id",middleware.campgroundonwership,function(req,res){
	campground.findByIdAndRemove(req.params.id,req.body.campground, function(err, updatedcampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			//redirect somewhere
			res.redirect("/campgrounds");
		}
	});
	
});


//check campground ownership

module.exports = router;