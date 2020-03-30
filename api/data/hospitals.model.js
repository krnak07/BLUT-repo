var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
var hospdonor = new mongoose.Schema({
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
  }
});

var bbdonation = new mongoose.Schema({
    name : {
        type: String,
        requierd: true
    },
    dateofdonation : {
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
var hospitalSchema = new mongoose.Schema({
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
    pincode : {
        type: Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    createdOn :{
      type :Date,
      required : true
    },
    donationhistory : [hospdonor],
    bloodbankdonationhistory : [bbdonation],

});

mongoose.model('hospital',hospitalSchema);
