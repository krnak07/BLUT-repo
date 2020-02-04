var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var notitokenSchema = new mongoose.Schema({
    client_name :{
        type : String,
        required : true
    },
    token: {
        type: String,
        required: true
    }
});

mongoose.model('notification_token',notitokenSchema);