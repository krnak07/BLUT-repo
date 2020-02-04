var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var reqSchema = new mongoose.Schema({
    from:{
        type: String,
        required : true
    },
    to:{
        type: String,
        required: true
    },
    bloodgroup:{
        type: String,
        required: true
    },
    units:{
        type: String,
        required: true
    },
    createdOn : {
        type: Date,
        required : true
    },
    reacted : {
        type: String,
        required : true
    },
    donated : {
        type : String,
        required : true
    }
});

mongoose.model('requests',reqSchema);