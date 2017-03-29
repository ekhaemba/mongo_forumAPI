var mongoose = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')

var userMongoose = require('./models/user')
var commentMongoose = require('./models/comment')
var forumMongoose = require('./models/forums')

var modelFunctions = require('./modelFunctions/modelFunc')


var app = express()
var router = express.Router()
router.use(bodyParser.json());

var dbName = "mongodb://localhost/db"
var port = 8080
mongoose.connect(dbName)
mongoose.Promise = global.Promise
var db = mongoose.connection

var createDoc = modelFunctions.createDoc
var findDocs = modelFunctions.findDocs
var findOneDoc = modelFunctions.findOneDoc
var populateDoc = modelFunctions.populateDoc
var updateDoc = modelFunctions.updateDoc
var deleteDoc = modelFunctions.deleteDoc

var userModel = userMongoose.userModel
var commentModel = commentMongoose.commentModel
var forumModel = forumMongoose.forumModel

var catchErrors = function(error_code){
  switch (error_code) {
    case 11000:
      return "Duplicate values"
    default:
      return "Error Unknown"
  }
}

//Get all users
router.get("/user",function(req,res){
  findDocs({}, "-__v", userModel, function(results){
    res.json(results)
  })
})

//Post new user to database
.post("/user",function(req, res){
  createDoc(req.body, userModel, function(results){
    results.error_code ? res.json({error : catchErrors(results.error_code)}) : res.json({ userId: results._id })
  })
})

//Get all comments
.get("/comments",function(req,res){
  populateDoc({}, "-__v", { path:"user",select:"-_id -__v" }, commentModel, function(results){
    res.json(results)
  })
})

//Post new comment to database
.post("/comments",function(req,res){
  createDoc(req.body, commentModel, function(results){
    results.error_code ? res.json({error : catchErrors(results.error_code)}) : res.json({ commentId: results._id })
  })
})

//Get comments by userId
.get("/comments/user/:userId",function(req,res){
  populateDoc({user:req.params.userId}, "-__v", { path:"user", select:"-_id -__v"}, commentModel, function(results){
    res.json(results)
  })
})

//Get comment by commentId
.get("/comments/:commentId",function(req,res){
  populateDoc({_id:req.params.commentId}, "-__v", {path:"user",select:"-_id -__v"}, commentModel, function(results){
    res.json(results)
  })
})

//Post a new forum topic
.post("/forum",function(req,res){
  createDoc(req.body, forumModel, function(results){
      results.error_code ? res.json({error : catchErrors(results.error_code)}) : res.json({ forumId: results._id })
  })
})

//Add new comment to a forum
.post("/forum/:forumId/newComment",function(req,res){
  var newComment = new commentModel(req.body)//Create a new instance of the comment object using the model
  newComment.save(function(err,newComment){
    if(err){
      console.log("Error", err)
      res.json({error:catchErrors(err.code)})
    }else {
      updateDoc({$push:{"comments":newComment._id}}, req.params.forumId, forumModel, function(results){
          results.error_code ? res.json({error : catchErrors(results.error_code)}) : res.json({commentId: newComment._id})
      })
    }
  })
})

//Get all forums
.get("/forum",function(req,res){                                //Populate the comments' user reference
  populateDoc({},"-__v", { path: 'comments', select: "-_id -__v", populate: { path: 'user', select: "-_id -__v" } }, forumModel, function(results){
    res.json(results)
  })
})

//Get a specific forum
.get("/forum/:forumId",function(req,res){                                             //Populate the comments' user reference
  populateDoc({_id:req.params.forumId},"-__v", { path: 'comments', select: "-_id -__v", populate: { path: 'user', select: "-_id -__v" } }, forumModel, function(results){
    res.json(results)
  })
})

//Delete a forum
.delete("/forum/:forumId",function(req,res){
  deleteDoc(req.params.forumId, forumModel, function(results){
    results.error_code ? res.json({error : catchErrors(results.error_code)}) : res.json(results)
  })
})
//Delete a user
.delete("/user/:userId",function(req,res){
  deleteDoc(req.params.userId, userModel, function(results){
    results.error_code ? res.json({error : catchErrors(results.error_code)}) : res.json(results)
  })
})
//Delete a comment
.delete("/comment/:commentId",function(req,res){
  deleteDoc(req.params.commentId, commentModel, function(results){
    results.error_code ? res.json({error : catchErrors(results.error_code)}) : res.json(results)
  })
})

//Updates the forum properties given a forum Id
.put("/forum/:forumId",function(req, res){
  updateDoc({ $set : req.body}, req.params.forumId, forumModel, function(results){
    res.json(results)
  })
})

//Updates the comment properties given a certain comment Id
.put("/comment/:commentId",function(req, res){
  updateDoc({ $set : req.body}, req.params.commentId, commentModel, function(results){
    res.json(results)
  })
})

//Updates a certain user properties given a certain user Id
.put("/user/:userId",function(req, res){
  updateDoc({ $set : req.body}, req.params.userId, userModel, function(results){
    res.json(results)
  })
})

app.use(router)
app.listen(port)
