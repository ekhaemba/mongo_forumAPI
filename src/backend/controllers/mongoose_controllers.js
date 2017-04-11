const userDeleteCallback = function(req, res, customSuccessMessage){
  return function(err, user){
    if(err){
      res.json({success : false, message : err.message})
    }
    else if(!user || user.length == 0){
      res.json({success : false, message : "User(s) not found"})
    }
    else{
      if(!customSuccessMessage)
        res.json({success : true, message : "User(s) successfully deleted", userId : user._id})
      else
        res.json({success : true, message : customSuccessMessage, userId : user._id})
    }
  }
}

const userUpdateCallback = function(req, res, customSuccessMessage){
  return function(err, user){
    if(err){
      res.json({success : false, message : err.message})
    }
    else if(!user || user.length == 0){
      res.json({success : false, message : "User(s) not found"})
    }
    else{
      if(!customSuccessMessage)
        res.json({success : true, message : "User(s) successfully updated", results : user })
      else
        res.json({success : true, message : customSuccessMessage, results : user })
    }
  }
}

const userFindCallback = function(req, res, customSuccessMessage){
  return function(err, user){
    if(err){
      res.json({success : false, message : err.message})
      console.log("Error",err);
    }
    else if(!user || user.length == 0){
      res.json({success : false, message : "User(s) not found"})
      console.log("User(s) not found")
    }
    else{
      if(!customSuccessMessage){
        res.json({success : true, message : "User(s) successfully found", results : user })
        console.log("Found with no custom message")
      }
      else{
        res.json({success : true, message : customSuccessMessage, results : user })
        console.log("Found with custom message")
      }
        
    }
  }
}

const forumFindCallback = function(req, res, customSuccessMessage){
  return function(err, forum){
    if(err){
      res.json({success : false, message : err.message})
      console.log("Error",err);
    }
    else if(!forum || forum.length == 0){
      res.json({success : false, message : "Forum(s) not found"})
      console.log("User(s) not found")
    }
    else{
      if(!customSuccessMessage){
        res.json({success : true, message : "Forum(s) successfully found", results : forum })
        console.log("Found with no custom message")
      }
      else{
        res.json({success : true, message : customSuccessMessage, results : forum })
        console.log("Found with custom message")
      }
    }
  }
}

const forumUpdateCallback = function(req, res, customSuccessMessage){
  return function(err, forum){
    if(err){
      res.json({success : false, message : err.message})
    }
    else if(!forum || forum.length == 0){
      res.json({success : false, message : "Forum(s) not found"})
    }
    else{
      if(!customSuccessMessage)
        res.json({success : true, message : "Forum(s) successfully updated", results : forum })
      else
        res.json({success : true, message : customSuccessMessage, results : forum })
    }
  }
}

const forumDeleteCallback = function(req, res, customSuccessMessage){
  return function(err, forum){
    if(err){
      res.json({success : false, message : err.message})
    }
    else if(!forum || forum.length == 0){
      res.json({success : false, message : "Forum(s) not found"})
    }
    else{
      if(!customSuccessMessage)
        res.json({success : true, message : "Forum(s) successfully deleted", userId : forum._id})
      else
        res.json({success : true, message : customSuccessMessage, userId : forum._id})
    }
  }
}

const forumCreateCallback = function(req, res, customSuccessMessage){
  return function(err, forum){
    if(err){
      res.json({success : false, message : err.message})
    }
    else if(!forum || forum.length == 0){
      res.json({success : false, message : "Forum(s) failed to create"})
    }
    else{
      if(!customSuccessMessage)
        res.json({success : true, message : "Forum(s) successfully created", results : forum })
      else
        res.json({success : true, message : customSuccessMessage, results : forum })
    }
  }
}
module.exports = {
    userDeleteCallback : userDeleteCallback,
    userFindCallback : userFindCallback,
    userUpdateCallback : userUpdateCallback,
    forumFindCallback : forumFindCallback,
    forumUpdateCallback : forumUpdateCallback,
    forumDeleteCallback : forumDeleteCallback,
    forumCreateCallback : forumCreateCallback
}