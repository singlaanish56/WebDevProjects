var express = require("express");
var router  = express.Router({mergeParams:true});
var campground = require("../models/campground");
var Comments  = require("../models/comment");
var User  =require("../models/user");


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
router.get("/campgrounds/new",isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//CREATE RESTFULL ROUTE
router.post("/campgrounds",isLoggedIn,function(req,res){
    var name = req.body.campname;
    var image = req.body.image;
    var desc = req.body.description;
	var author ={
		id: req.user._id,
		username : req.user.username
	}
    var newcg = {name:name,image:image,description:desc, author:author};
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
          
           console.log(foundCampg);
           res.render("campgrounds/show",{campg :foundCampg});
       }
    });
    //res.send("This is the show page ");
});
//edit campground
router.get("/campgrounds/:id/edit",campgroundonwership,function(req,res){
	campground.findById(req.params.id,function(err,foundcampground){
			res.render("campgrounds/edit",{campground : 			 					foundcampground});
			
	});
});
//update campground
router.put("/campgrounds/:id",campgroundonwership,function(req,res){
	//find and update campground
	
	campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updatedcampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			//redirect somewhere
			res.redirect("/campgrounds/"+ req.params.id);
		}
	});
	
});

//delete campground
router.delete("/campgrounds/:id",campgroundonwership,function(req,res){
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
function isLoggedIn (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }    
    res.redirect("/login");
}

//check campground ownership
function campgroundonwership (req,res,next){
	if(req.isAuthenticated()){
		campground.findById(req.params.id,function(err,foundcampground){
			if(err){
				res.redirect("back");
			}else{
				//does the user own the campground ; foundcampground object is a mongoose id and the req one is a string hence === wont work
				if(foundcampground.author.id.equals(req.user._id)){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		});
	}else{
		res.redirect("back"); //back to previous page
	}
}

module.exports = router;