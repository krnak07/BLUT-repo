var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var campDonorSchema = new mongoose.Schema({
    donor_name : {
      type :String,
      required: true
    },
    phoneNo : {
        type : Number,
        required : true
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
var campSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    phoneNo : {
        type : Number,
        required : true
    },
    dateofhost : {
        type : Date,
        required : true
    },
    hosting  : {
        type : String,
        required : true
    },
    bloodbank : {
      type :String,
      required : true
    },
    createdOn : {
      type : Date,
      required : true
    },
    BloodAvailability : [bloodlistSchema],
    donationhistory : [campDonorSchema]
});


mongoose.model('camp',campSchema);
