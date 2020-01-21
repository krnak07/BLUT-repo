var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
var organisationSchema = new mongoose.Schema({
    name : {
        type:String,
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
    liscense : {
        type : String,
        required : true,
    },
    createdOn :{
        type :Date,
        required : true
    }
});
mongoose.model('organisation',organisationSchema);