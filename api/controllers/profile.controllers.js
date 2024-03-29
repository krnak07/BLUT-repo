var mongoose = require('mongoose');
var firebase = require('firebase');
var profile = mongoose.model('profile');
var Barc = require('node-barc-c')
    ,barc = new Barc
    ,fs = require('fs');

var err_profile;
var new_profile;


auth = firebase.auth();


module.exports.profilesignup = function(req,res){

    var d =new Date();

    profile
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
                                    profile
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
                                            bloodgroup: req.body.bg.toUpperCase(),
                                            gender : req.body.gender.toUpperCase(),
                                            totalunits : 0,
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
                                                        // var buf = barc.code128(pro.bloodgroup + '-' +pro.firstname, 1400, 400);
                                                        // var filename = 'barcode/' + pro.bloodgroup + '-' +pro.firstname + '.png';
                                                        // fs.writeFile(filename, buf, function(){
                                                        //     console.log('wrote it');
                                                        // });
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
                        .status(200)
                        .json({"msg": "ue"});
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


module.exports.profilelogin = function(req,res) {

    auth.signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(function(){
            var user = auth.currentUser;
            if(user.emailVerified)
            {
                profile
                    .findById(user.displayName)
                    .exec(function(err,profile){
                        if(err){
                            res
                                .status(400)
                                .json(err);
                        }
                        res
                            .status(200)
                            .json(profile); //logged in user details
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



module.exports.checkprofile = function(req,res) {
    var d = new Date();

    profile
        .findOne({phoneNo : req.query.ph})
        .exec(function(err,pro){
            if(err){
                res
                    .status(400)
                    .json({"msg":"snr"});
            }
            else {
                if(pro == null)
                {
                    res
                        .status(400)
                        .json({"msg":"unf"})
                }
                else {
                    var nd = new Date(pro.nextdonationDate);
                    if(d<nd){
                        res
                            .status(206)
                            .json({"fname":pro.firstname,"bg":pro.bloodgroup,"email":pro.email});
                    }
                    else {
                        res
                            .status(200)
                            .json({"fname":pro.firstname,"bg":pro.bloodgroup,"email":pro.email});
                    }
                }

            }

        });
};
