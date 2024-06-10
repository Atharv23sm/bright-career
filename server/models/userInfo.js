const mongoose = require('mongoose')

const userInfoSchema = new mongoose.Schema({

  name: { type: String, required: true},
  about: {type:String},
  email:{type:String, required:true, unique:true},
  role:{type:String},
  address:{type:String},
  education:{type:String},
  activity:{type:String},
  skills:{type:String},
  experience:{type:String},
  profilepicname:{type:String}
});

const userInfo = mongoose.model('userInfo', userInfoSchema);

module.exports = userInfo;