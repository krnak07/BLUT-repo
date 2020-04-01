var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var huserSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    dateofbirth : {
        type : Date,
        required : true
    },
    email : {
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
    pincode:{
        type : Number,
        required : true
    },
    bloodgroup : {
        type : String,
        required  : true
    },
    hospitalemail:{
        type : String,
        required  : true
    },
    hospitalname:{
        type : String,
        required  : true
    },
    gender : {
        type : String,
        required : true
    },

});

mongoose.model('hospitaluser',huserSchema);