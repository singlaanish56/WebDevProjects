var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var data = [
        {   name: "SpiderVerse1",
            image:"https://images.pexels.com/photos/419293/pexels-photo-419293.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." 
        },
         {   name: "SpiderVerse2",
            image:"https://images.pexels.com/photos/419293/pexels-photo-419293.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." 
        },
          {   name: "SpiderVerse3",
            image:"https://images.pexels.com/photos/419293/pexels-photo-419293.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." 
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