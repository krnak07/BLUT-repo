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
      type : String,
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
        type : String,
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
    campdonor : [campDonorSchema]
});


mongoose.model('camp',campSchema);
