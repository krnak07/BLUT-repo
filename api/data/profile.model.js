var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var donated = new mongoose.Schema({
  venue_name : {
    type: String,
    required: true
  },
  venue_id : {
    type : String,
    required : true
  },
  dateofdonation : {
    type : Date,
    required : true
  },
  quantity : {
    type : Number,
    required : true
  }
});

var profileSchema = new mongoose.Schema({
  firstname : {
    type : String,
    required : true
  },
  lastname : {
    type : String,
    required : true
  },
  dateofbirth : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  phoneNo : {
    type : Number,
    required : true
  },
  address : {
    type : String,
    required : true
  },
  city:{
    type : String,
    required : true
  },
  state:{
    type : String,
    required : true
  },
  bloodgroup : {
    type : String,
    required  : true
  },
  bloodgrpCerti : {
    type : String, //file Upload
  },
  totalunits : {
    type : Number
  },
  createdOn :{
    type :Date,
    required : true
  },

  lastdonatedDate : {
    type : Date,
    required : false
  },
  nextdonationDate : {
    type : Date,
    required : false
  },
  lastdonatedVenue : {
    type : String,
    required : false
  },

  donationhistory : [donated]


});

mongoose.model('profile',profileSchema);
