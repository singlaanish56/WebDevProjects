var express = require("express");
var router  = express.Router({mergeParams:true});
var passport=require("passport");
var User  =require("../models/user");


//route route
router.get("/",function(req,res){
    res.render("landingp")
});

//sign up logic
router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
			console.log(err);
			req.flash("error",err.message);
        	return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to Avenger's Camp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});


//login logic
router.get("/login",function(req,res){
    res.render("login");
});

  router.post("/login", passport.authenticate("local",{
        successRedirect : "/campgrounds",
        failureRedirect : "/login"
        
    }),function(req,res){
        
    });
    
//logout route
router.get("/logout",function(req,res){
    req.logout();
	req.flash("success","You have Logged Out");
    res.redirect("/campgrounds");
});

//middleware
// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }    
//     res.redirect("/login");
// };

module.exports=router;