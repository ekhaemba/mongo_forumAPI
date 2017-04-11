var mongoose = require('mongoose')
var Schema = mongoose.Schema

var forumSchema = new Schema({
  topic : {
    type : String,
    require : true
  },
  topicId : Schema.ObjectId,
  comments : [{type: Schema.ObjectId,
  ref : 'Comment'}],
  createdBy:{
    type: Schema.ObjectId,
    ref:'User',
    require:true
  }
},
{
  timestamps : true
})
//Could add acess control list for users who are moderators to this forum.
//Such that only they can update any of the forum fields

module.exports = {
  forumModel : mongoose.model('Forum',forumSchema),
  forumSchema : forumSchema
}
