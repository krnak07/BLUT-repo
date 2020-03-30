var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var userSchema = new mongoose.Schema({
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
    bloodbankemail:{
        type : String,
        required  : true
    },
    bloodbankname:{
        type : String,
        required  : true
    },
    gender : {
        type : String,
        required : true
    },

});

mongoose.model('bloodbankuser',userSchema);