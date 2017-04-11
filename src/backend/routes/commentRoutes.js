const express = require("express");

const populateDoc = require("../modelFunctions/modelFunc").populateDoc
const populateOneDoc = require("../modelFunctions/modelFunc").populateOneDoc
const createDoc = require("../modelFunctions/modelFunc").createDoc
const deleteDoc = require("../modelFunctions/modelFunc").deleteDoc
const updateDoc = require("../modelFunctions/modelFunc").updateDoc


const commentModel = require("../models/comment").commentModel

const catchErrors = require("../helpers/helper_funcs").catchErrors

var commentRoutes = express.Router();
var exportRoutes = express.Router();
//Get all comments in the database
commentRoutes.get("",function(req,res){
  populateDoc({}, "-__v", { path:"user",select:"-_id -__v" }, commentModel, function(results){
    res.json(results)
  })
})

//Get all comments by a given user
.get("/user/:userId",function(req,res){
  populateDoc({user:req.params.userId}, "-__v", { path:"user", select:"-_id -__v"}, commentModel, function(results){
    res.json(results)
  })
})

//Get a comment by commentId
.get("/:commentId",function(req,res){
  populateOneDoc({_id:req.params.commentId}, "-__v", {path:"user",select:"-_id -__v"}, commentModel, function(results){
    res.json(results)
  })
})

//Post new comment to database
//Generic posting to test if the model works as intended
.post("",function(req,res){
  createDoc(req.body, commentModel, function(results){
    results.error_code ? res.json({error : catchErrors(results.error_code)}) : res.json({ commentId: results._id })
  })
})

//Delete a comment given a comment Id
//Example usage: Deleting a comment given the user who made the comment has been authenticated
.delete("/:commentId",function(req,res){
  deleteDoc(req.params.commentId, commentModel, function(results){
    results.error_code ? res.json({error : catchErrors(results.error_code)}) : res.json(results)
  })
})

//Updates the comment properties given a certain comment Id
//Example usage: Editing a comment, given that the user who made the comment has been authenticated
.put("/:commentId",function(req, res){
  updateDoc({ $set : req.body}, req.params.commentId, commentModel, function(results){
    res.json(results)
  })
})

exportRoutes.use("/comment",commentRoutes)
module.exports = exportRoutes