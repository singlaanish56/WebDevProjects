var express = require("express");
var router  = express.Router({mergeParams:true});
var campground = require("../models/campground");
var Comments  = require("../models/comment");
var User  =require("../models/user");
//comments new
router.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
	console.log(req.params.id);
    campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground: campground }); 
        }
    });
   
});
//comments create
router.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    //lookup using id
    campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //console.log(req.body.comment);
            Comments.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err);
               }else{
				   //add username and id to comment
				   comment.author.id = req.user._id;
				   comment.author.username =req.user.username;
				   //save cmmeny
				   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/"+campground._id);
               }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect
});


//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }    
    res.redirect("/login");
}

module.exports=router;