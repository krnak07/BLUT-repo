var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var bloodlistSchema = new mongoose.Schema({
  bloodType : {
    type : String,
    required : true
  },
  quantity : {
    type : Number,
    required : true
  }
});

var bankdonor = new mongoose.Schema({
  phoneNo : {
    type : Number,
    required : true
  },
  bloodgroup : {
    type : String,
    required : true
  },
  dateofdonation : {
    type : Date,
    required : true
  },

  unitsofblood : {
    type: Number,
    required : true
  },
  donor_name : {
    type : String,
    required : true
  },
  user_name : {
    type : String,
    required : true
  },
  user_email : {
    type: String,
    required: true
  }

});

var campdonor = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  dateofdonation : {
    type : Date,
    requierd  : true
  },
  bloodlist : [bloodlistSchema]
});

var donation = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  user_name : {
    type : String,
    required : true
  },
  user_email : {
    type : String,
    required : true
  },
  dateofdonation: {
    type : Date,
    required : true
  },
  bloodgroup : {
    type : String,
    required : true
  },
  unitsofblood : {
    type: Number,
    required : true
  }
});

var bloodbankSchema = new mongoose.Schema({
  name:{
    type : String,
    required : true
  },
  address:{
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
  phoneNo : {
    type: Number,
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
  liscense : {
    type : String,
  },
  createdOn :{
    type :Date,
    required : true
  },
  BloodAvailability : [bloodlistSchema],
  donordonationhistory : [bankdonor],
  campdonationhistory : [campdonor],
  donatedhistory : [donation]


});

mongoose.model('bloodbank',bloodbankSchema);
