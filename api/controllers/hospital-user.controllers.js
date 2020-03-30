var mongoose = require('mongoose');
var firebase = require('firebase');
var hospuser = mongoose.model('hospitaluser');

auth = firebase.auth();

module.exports.hospusersignup = function(req,res){

    var d =new Date();

    hospuser
        .findOne({email : req.body.email})
        .exec(function(err,pro){
            if(err){
                res
                    .status(400)
                    .json(err)
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
                                    hospuser
                                        .create({
                                            firstname : req.body.fname,
                                            lastname : req.body.lname,
                                            dateofbirth : req.body.dob,
                                            email : req.body.email,
                                            password : req.body.password,
                                            phoneNo : req.body.phoneNo,
                                            address : req.body.addr,
                                            city : req.body.city.toUpperCase(),
                                            state : req.body.state,
                                            pincode : req.body.pincode,
                                            bloodgroup: req.body.bg.toUpperCase(),
                                            gender : req.body.gender.toUpperCase(),
                                            createdOn : d,
                                        },function(err,pro) {
                                            if(err){
                                                res
                                                    .status(400)
                                                    .json(err)
                                            }
                                            else {
                                                user.updateProfile({
                                                    displayName: pro.id,
                                                });
                                                user.sendEmailVerification()
                                                    .then(function () {
                                                        res
                                                            .status(201)
                                                            .json(pro);
                                                    });


                                            }
                                        });

                                });
                        })
                        .catch(function (error) {
                            res
                                .status(400)
                                .json(error);
                        });
                }

                else
                {
                    res
                        .status(200)
                        .json({"Message": "User Already Exists"});
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


module.exports.hospuserlogin = function(req,res) {

    auth.signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(function(){
            var user = auth.currentUser;
            if(user.emailVerified)
            {
                hospuser
                    .findById(user.displayName)
                    .exec(function(err,pro){
                        if(err){
                            res
                                .status(400)
                                .json(err);
                        }
                        res
                            .status(200)
                            .json(pro); //logged in user details
                    });

            }
            else
            {
                res
                    .status(400)
                    .json({"message" : "User not verified"});
            }
        })
        .catch(function(error) {
            res
                .status(404)
                .json(error);
        });
};

