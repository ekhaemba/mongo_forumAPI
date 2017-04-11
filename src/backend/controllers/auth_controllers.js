const userModel = require("../models/user").userModel
const genToken = require('../helpers/helper_funcs').genToken
const getPriority = require("../helpers/constants").getPriority

const register = function (req, res){
  if(!req.body.username || !req.body.password){
    res.json({success:false, message: "Please enter a username & password"})
  }
  else{
    var newUser;
    if(!req.body.role){
      newUser = new userModel({
        username: req.body.username,
        password : req.body.password
      })
    }
    else{
      newUser = new userModel({
        username: req.body.username,
        password : req.body.password,
        role : req.body.role
      })
    }
    newUser.save(function(err){
      if(err){
        console.log(err.message)
        res.json({success: false, message : err.message})
      }
      else{
        res.json({success : true, message : "User has been successfully added"})
      }
    })
  }
}

const login = function(req, res){
  userModel.findOne({
    username: req.body.username
  }, function(err, user){
    if(err){
      throw err;
    }
    if(!user){
      res.send({success : false, message: "Auth failed, User not found"});
    }
    else{
      user.comparePassword(req.body.password, function(err, isMatch){
        if(!err && isMatch){
            res.json({success: true, token: `JWT ${genToken(user)}`})
        }else{
            res.json({success: false, message: 'Authentication failed. Passwords did not match'})
        }
      })
    }
  })
}

//This controller requires authorization
const roleAuthorization = function(required_role){
  return function(req, res, next){
    userModel.findById(req.user._id, function(err, user){
      if(err){
        res.json({success: false, message : "An error was thrown"})
        return next(err);
      }
      if(getPriority(user.role) >= getPriority(required_role)){
        return next();
      }
      else{
        res.json({success: false, message : "Unauthorized role"})
      }
    })
  }
}
module.exports = {
    register : register,
    login : login,
    roleAuthorization : roleAuthorization
}