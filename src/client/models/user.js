var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')

var userSchema = new Schema({
  userId: Schema.ObjectId,
  username : {
    type : String,
    required : true,
    unique: true
  },
  password : {
    type:String,
    required : true
  }
},
{
  timestamps : true
})
//Possible user property or other schema property are passwords

//A Pre-hook to save the hash of the password rather than the plaintext password
userSchema.pre('save',function(next){
  const thisUser = this
  const ROUNDS = 11

  if(!thisUser.isModified('password')) return next();
  bcrypt.genSalt(ROUNDS, function(err, salt){
    if(err) return next(err)

    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) return next(err)
      thisUser.password = hash
      next()
    })
  })
})
module.exports = {
  userModel : mongoose.model('User',userSchema),
  userSchema : userSchema
}
