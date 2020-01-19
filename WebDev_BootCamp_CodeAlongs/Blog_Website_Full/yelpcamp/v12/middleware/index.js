var middlewareObj ={};
var campground = require("../models/campground");
var Comments  = require("../models/comment");
var User  =require("../models/user");

middlewareObj.campgroundonwership = function(req,res,next){
	if(req.isAuthenticated()){
		campground.findById(req.params.id,function(err,foundcampground){
			if(err){
				req.flash("error","CampGround Not Found");
				res.redirect("back");
			}else{
				//does the user own the campground ; foundcampground object is a mongoose id and the req one is a string hence === wont work
				if(!foundcampground){
					req.flash("error","Item Not Found");
					return res.redirect("back");
				}
				if(foundcampground.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error","You Don't Have Permission to do That");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","You need to Log In to do That");
    	//res.redirect("/login");
		res.redirect("back"); //back to previous page
	}
}

middlewareObj.commentsonwership = function(req,res,next){
	if(req.isAuthenticated()){
		Comments.findById(req.params.comment_id,function(err,foundcomment){
			if(err){
				//req.flash("error","Comment Not Found");
				res.redirect("back");
			}else{
				//does the user own the campground ; foundcampground object is a mongoose id and the req one is a string hence === wont work
				if(!foundcampground){
					req.flash("error","Item Not Found");
					return res.redirect("back");
				}
				if(foundcomment.author.id.equals(req.user._id)){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","You need to Log In to do That");
		res.redirect("back"); //back to previous page
	}
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }    
	req.flash("error","You need to Log In to do That");
    res.redirect("/login");
}

module.exports = middlewareObj