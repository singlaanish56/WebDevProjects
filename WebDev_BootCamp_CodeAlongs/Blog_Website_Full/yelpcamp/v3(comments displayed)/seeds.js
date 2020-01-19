var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var data = [
        {   name: "SpiderVerse1",
            image:"https://images.pexels.com/photos/419293/pexels-photo-419293.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            description : "climb the walls and swing around" 
        },
         {   name: "SpiderVerse2",
            image:"https://images.pexels.com/photos/419293/pexels-photo-419293.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            description : "ching ching" 
        },
          {   name: "SpiderVerse3",
            image:"https://images.pexels.com/photos/419293/pexels-photo-419293.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            description : "chang chang chang" 
        }
    ]
function seeddb(){
    //remove campgrounds
    Campground.remove({},function(err){
      if(err){
         console.log(err);
         }
          console.log("removed campgrounds");
            data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
             if(err){
                 console.log(err);
               }else{
                    console.log("added campground");
                  //create comments
                      Comment.create({text:"This is great place for cardio",
                                author:"Anish"
                     },function(err, comment){
                          if(err){
                             console.log(err);
                         }else{
                            // console.log(comment);
                             campground.comments.push(comment);
                              campground.save();
                             console.log("Created commented campgrounds");
                        
                         }
                      });
                 }
              });    
           });
         
    });
    
   
    
}

module.exports = seeddb;