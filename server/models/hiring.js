const mongoose = require('mongoose')

const hiringSchema = new mongoose.Schema({

  jobrole: { type: String},
  about:{type:String},
  hirer_name:{type:String},
  hirer_email:{type:String},
  address:{type:String},
  payment:{type:String},
  category:{type:String},
  workmode:{type:String},
  experience:{type:String},
  reqskills:{type:String},
  h_date:{type:Date}
});

const hiringdb = mongoose.model('hiring', hiringSchema);

module.exports = hiringdb;