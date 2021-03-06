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
   
});
//edit comment
router.get("/campgrounds/:id/comments/:comment_id/edit",commentsonwership,function(req,res){
	Comments.findById(req.params.comment_id,function(err,foundcomment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{campg_id : req.params.id,comment :foundcomment});
		}
	});
	
});
//update comment
router.put("/campgrounds/:id/comments/:comment_id/",commentsonwership,function(req,res){
	Comments.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatecomment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//delete comment
router.delete("/campgrounds/:id/comments/:comment_id",commentsonwership,function(req,res){
	Comments.findByIdAndRemove(req.params.comment_id,req.body.comment,function(err,deletecomment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("back");
		}
	});
});
//middleware
function isLoggedIn (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }    
    res.redirect("/login");
}
function commentsonwership (req,res,next){
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

module.exports=router;