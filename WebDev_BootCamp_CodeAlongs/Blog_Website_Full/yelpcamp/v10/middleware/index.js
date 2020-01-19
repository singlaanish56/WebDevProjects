var middlewareObj ={};
var campground = require("../models/campground");
var Comments  = require("../models/comment");
var User  =require("../models/user");

middlewareObj.campgroundonwership = function(req,res,next){
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

middlewareObj.commentsonwership = function(req,res,next){
	if(req.isAuthenticated()){
		Comments.findById(req.params.comment_id,function(err,foundcomment){
			if(err){
				res.redirect("back");
			}else{
				//does the user own the campground ; foundcampground object is a mongoose id and the req one is a string hence === wont work
				if(foundcomment.author.id.equals(req.user._id)){
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

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }  
	
    res.redirect("/login");
}

module.exports = middlewareObj