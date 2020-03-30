var mongoose = require('mongoose');
var firebase = require('firebase');
var bbuser = mongoose.model('bloodbankuser');
var bloodbank = mongoose.model('bloodbank');

auth = firebase.auth();

module.exports.bbusersignup = function(req,res){

    var dob = new Date(req.body.dob);
    var d =new Date();

    bbuser
        .findOne({email : req.body.email})
        .exec(function(err,pro){
            if(err){
                res
                    .status(400)
                    .json({"msg":"snr"})
            }
            else
            {
                if(pro == null ){
                    k = 0;
                    auth.createUserWithEmailAndPassword(req.body.email, req.body.password)
                        .then(function () {
                            auth.signInWithEmailAndPassword(req.body.email, req.body.password)
                                .then(function () {
                                    var user = auth.currentUser;
                                    bbuser
                                        .create({
                                            firstname : req.body.fname,
                                            lastname : req.body.lname,
                                            dateofbirth : dob,
                                            email : req.body.email,
                                            phoneNo : req.body.phoneNo,
                                            address : req.body.addr,
                                            city : req.body.city.toUpperCase(),
                                            state : req.body.state,
                                            pincode : req.body.pincode,
                                            bloodgroup: req.body.bg,
                                            gender : req.body.gender.toUpperCase(),
                                            bloodbankname : req.body.bbname,
                                            bloodbankemail : req.body.bbemail,
                                            createdOn : d,
                                        },function(err,pro) {
                                            if(err){
                                                res
                                                    .status(400)
                                                    .json({"msg":"es"})
                                            }
                                            else {
                                                user.updateProfile({
                                                    displayName: pro.id,
                                                });
                                                user.sendEmailVerification()
                                                    .then(function () {
                                                        var d =new Date(pro.dateofbirth);
                                                        console.log(d.toLocaleDateString());
                                                        res
                                                            .status(201)
                                                            .json({"msg":"created"});
                                                    });


                                            }
                                        });

                                });
                        })
                        .catch(function (error) {
                            if(error.code == 'auth/weak-password'){
                                res
                                    .status(400)
                                    .json({"msg":"wp"});
                            }
                            else if(error.code == 'auth/email-already-in-use'){
                                res
                                    .status(400)
                                    .json({"msg":"ue"});
                            }
                            console.log(error)

                        });
                }

                else
                {
                    res
                        .status(400)
                        .json({"msg": "exists"});
                }

            }
        });


};

module.exports.updatePass = function(req,res){
    var user = auth.currentUser;
    user.updatePassword(req.body.newpassword)
        .then(function(us){
            res
                .status(200)
                .json({"update":"success"});
        })
        .catch(function(err){

        })
};
module.exports.resetPass = function(req,res){
    auth.sendPasswordResetEmail(req.body.email)
        .then(function() {
            // Email sent.
            res
                .status(200)
                .json({"Message" : "Sent"});

        })
        .catch(function(error) {
            // An error happened.
            res
                .status(400)
                .json(error)
        });
};


module.exports.bbuserlogin = function(req,res) {

    auth.signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(function(){
            var user = auth.currentUser;
            if(user.emailVerified){
                bbuser
                    .findById(user.displayName)
                    .exec(function(err,pro){
                        if(err){
                            res
                                .status(404)
                                .json({"msg":"snr"});
                        }
                        else{
                            if(pro == null){
                                res
                                    .status(404)
                                    .json({"msg":"unf"});
                            }
                            else{
                                res
                                    .status(200)
                                    .json({"useremail":pro.email,"username":pro.firstname,"bbemail":pro.bloodbankemail,"bbname":pro.bloodbankname});
                            }
                        }

                    });
            }
            else
            {
                res
                    .status(400)
                    .json({"msg" : "nv"});
            }
        })
        .catch(function(error) {
            if(error.code == "auth/user-not-found"){
                res
                    .status(400)
                    .json({"msg":"ie"});
            }
            else if(error.code == "auth/wrong-password"){
                res
                    .status(400)
                    .json({"msg":"wp"});
            }
            else if(error.code == "auth/too-many-requests"){
                res
                    .status(404)
                    .json({"msg":"tmr"});
            }

        });
};


module.exports.usercheck = function(req,res){
    bloodbank
        .findOne({email:req.body.bbemail})
        .exec(function(err,bank){
            if(err){
                res
                    .status(400)
                    .json({"msg":"snr"});
            }
            else{
                if(bank==null){
                    res
                        .status(400)
                        .json({"msg":"bnf"});
                }
                else{
                    bbuser
                        .findOne({phoneNo: req.body.userphone})
                        .exec(function(err,pro){
                            if(err){
                                res
                                    .status(400)
                                    .json({"msg":"snr"})
                            }
                            else{
                                if(pro==null){
                                    res
                                        .status(200)
                                        .json({"msg":"unf","bbname":bank.name})
                                }
                                else{
                                    if(pro.bloodbankemail == req.body.bbemail){
                                        res
                                            .status(400)
                                            .json({"msg":"exists"})
                                    }
                                    else{
                                        res
                                            .status(400)
                                            .json({"msg":"not associated"})
                                    }
                                }
                            }
                        })
                }
            }
        })
};
