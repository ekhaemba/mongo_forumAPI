var mongoose = require('mongoose')
var Schema = mongoose.Schema

var commentSchema = new Schema({
  commentId: Schema.ObjectId,
  comment : String,
  user :{
      type: Schema.ObjectId,
      ref : 'User'
  }
},
{
  timestamps : true
})


module.exports = {
  commentModel : mongoose.model('Comment',commentSchema),
  commentSchema : commentSchema
}
