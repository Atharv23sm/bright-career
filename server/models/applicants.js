const mongoose = require('mongoose')

const applicantsSchema = new mongoose.Schema({

  jobpostId : {type:String},
  hirer_email : {type:String},
  applicant_email : {type:String}
});

const hiringdb = mongoose.model('applicants', applicantsSchema);

module.exports = hiringdb;