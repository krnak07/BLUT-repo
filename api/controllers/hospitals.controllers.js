var mongoose = require('mongoose');
var firebase = require('firebase');
var admin = require('firebase-admin');
var hospitals = mongoose.model('hospital');
var bloodbank = mongoose.model('bloodbank');
var profile = mongoose.model('profile');
var hospuser = mongoose.model('hospitaluser');
var notification = mongoose.model('notification_token');
var hosp_req = mongoose.model('requests');
auth = firebase.auth();



module.exports.hospitalSignup = function(req,res){

    var d = new Date();

    hospitals
        .findOne({name : req.body.name})
        .exec(function(err,bank){
            if(err){
                res
                    .status(400)
                    .json({"msg" : "snr"});
            }
            else
            {
                if(bank == null ){
                    k = 0;
                    auth.createUserWithEmailAndPassword(req.body.email, req.body.password)
                        .then(function () {
                            auth.signInWithEmailAndPassword(req.body.email, req.body.password)
                                .then(function () {
                                    var user = auth.currentUser;
                                    hospitals
                                        .create({
                                            name : req.body.name,
                                            address : req.body.addr,
                                            city : req.body.city.toUpperCase(),
                                            state : req.body.state,
                                            pincode : req.body.pincode,
                                            phoneNo : req.body.phoneNo,
                                            email : req.body.email,
                                            createdOn : d,
                                        },function(err,hosp) {
                                            if(err){
                                                console.log(err)
                                                res
                                                    .status(400)
                                                    .json({"msg" : "es"});
                                            }
                                            else {
                                                user.updateProfile({
                                                    displayName: hosp.id,
                                                });
                                                user.sendEmailVerification()
                                                    .then(function () {
                                                        res
                                                            .status(201)
                                                            .json({"msg" : "created"});
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

module.exports.hospitallogin = function(req,res){
    auth.signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(function(){
            var user = auth.currentUser;
            if(user.emailVerified){
                hospitals
                    .findById(user.displayName)
                    .exec(function(err,hosp){
                        if(err){
                            res
                                .status(404)
                                .json({"msg":"snr"});
                        }
                        else{
                            if(hosp == null){
                                res
                                    .status(404)
                                    .json({"msg":"hnf"});
                            }
                            else{
                                res
                                    .status(200)
                                    .json({"id":hosp._id,"name":hosp.name});
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

module.exports.hospitalGetnearbyBB = function(req,res){
    hospitals
        .findById(req.body.hospid)
        .exec(function(err,hosp){
            if(err){
                res
                    .status(400)
                    .json({"msg" : "snr"});
            }

            else{
                if(hosp == null){
                    res
                        .status(400)
                        .json({"msg":"hnf"})
                }
                else{
                    bloodbank
                        .find({city : hosp.city})
                        .exec(function(err,bank){
                            if(err){
                                res
                                    .status(400)
                                    .json({"msg" : "snr"});
                            }
                            else {
                                res
                                    .status(200)
                                    .json(bank)
                            }

                        })
                }

            }
        });


};

module.exports.hospitalGetnearbyDonors = function(req,res){
    hospitals
        .findById(req.body.hospid)
        .exec(function(err,hosp){
            if(err){
                res
                    .status(400)
                    .json({"msg" : "snr"});
            }

            else{
                if(hosp == null){
                    res
                        .status(400)
                        .json({"msg":"hnf"})
                }
                else{
                    profile
                        .find({city : hosp.city})
                        .exec(function(err,pro){
                            if(err){
                                res
                                    .status(400)
                                    .json({"msg" : "snr"});
                            }
                            else {
                                res
                                    .status(200)
                                    .json(pro)
                            }

                        })
                }

            }
        });
};


module.exports.donation = function(req,res){
    var d = new Date();

    hospuser
        .findOne({email:req.bodu.useremail})
        .exec(function(err,hu){
            if(err){
                res
                    .status(400)
                    .json({"msg":"snr"})
            }
            else{
                if(hu==null){
                    res
                        .status(400)
                        .json({"msg":"unf"})
                }
                else{
                    hospitals
                        .findOne({email:hu.hospitalemail})
                        .exec(function(err,hosp){
                            if(err){
                                res
                                    .status(400)
                                    .json(err)
                            }
                            else{
                                if(hosp == null){
                                    res
                                        .status(400)
                                        .json({"msg":"hnf"})
                                }
                                else{
                                    profile
                                        .findOne({phoneNo : req.body.phoneNo})
                                        .exec(function(err,pro){
                                            if(err){
                                                res
                                                    .status(400)
                                                    .json(err)

                                            }
                                            else
                                            {
                                                var nd = new Date(pro.nextdonationDate);
                                                if(d<nd && req.body.superdonation == 'false'){
                                                    res
                                                        .status(206)
                                                        .json({"msg" : "cannot"});
                                                }
                                                else {

                                                    var nd = new Date(d);
                                                    nd.setDate(d.getDate() + 56);
                                                    pro.lastdonatedDate = d;
                                                    pro.lastdonatedVenue = hosp.name;
                                                    pro.nextdonationDate = nd;
                                                    pro.donationhistory.push({
                                                        venue_email : bank.email,
                                                        venue_name : bank.name,
                                                        user_name : req.body.username,
                                                        dateofdonation : d,
                                                        quantity : parseInt(req.body.units)
                                                    });

                                                    pro.totalunits += parseInt(req.body.units);
                                                    hosp.donationhistory.push({
                                                        user_name : req.body.username,
                                                        user_email : req.body.useremail,
                                                        donor_name : pro.firstname,
                                                        phoneNo : pro.phoneNo,
                                                        dateofdonation : d,
                                                        bloodgroup : pro.bloodgroup,
                                                        unitsofblood : parseInt(req.body.units)

                                                    });

                                                    pro.save(function(err,proupdated) {
                                                        if(err){
                                                            res
                                                                .status(400)
                                                                .json({"msg": "es"});

                                                        }

                                                    });
                                                    hosp.save(function(err,updatedhosp){
                                                        if(err){
                                                            res
                                                                .status(400)
                                                                .json({"msg": "es"});
                                                        }
                                                        else{
                                                            res
                                                                .status(200)
                                                                .json({"msg": "done"})
                                                        }
                                                    });
                                                }

                                            }
                                        })
                                }
                            }
                        })
                }
            }
        })
};

module.exports.getAlldonors = function(req,res){
    hospitals
        .findOne({email:req.body.email})
        .select('donationhistory')
        .exec(function(err,hosp){
            if(err){
                res
                    .status(400)
                    .json({"msg": "snr"});
            }

            else{
                res
                    .status(200)
                    .json(hosp);
            }
        });
};

module.exports.test_1 = function(req,res){
  bId = req.params.hospID;

  hospitals
      .findById(bId)
      .exec(function(err,bank){
        if(err){
          res
              .status(400)
              .json(err)
        }
        else{
          res
              .status(200)
              .json(bank)
        }
      })
};



module.exports.test_2 = function(req,res){
  var hid = req.params.hospID;

  hospitals
      .findById(hid)
      .select('donationhistory')
      .exec(function(err,hosp){
        if(err){
          res
              .status(400)
              .json(err)
        }
        else{
          var d = new Date().toLocaleDateString("en-US");
          console.log(hosp.donations[0].dateofdonation.toLocaleDateString("en-US"));

        }
      })

};

module.exports.requests = function (req,res) {
    var d = new Date();
    notification
        .findOne({client_name : req.body.toname})
        .exec(function (err,noti) {
            if(err){
                res
                    .status(400)
                    .json({"msg": "snr"});
            }
            else{
                hosp_req
                    .create({
                        from : req.body.fromname,
                        to : req.body.toname,
                        bloodgroup : req.body.bg,
                        units : req.body.unit,
                        createdOn : d,
                        reacted : 'no',
                        donated : 'no'
                    },function (err,re) {
                        if(err){
                            res
                                .status(400)
                                .json({"msg": "ce"});
                        }
                        else{
                            res
                                .status(201)
                                .json({"msg": "created"});

                            var msg = {
                                data: {
                                    title: noti.client_name,
                                    content:'Requested "'+req.body.bg+'" blood - UNITS : '+req.body.unit
                                },
                                token: noti.token
                            };
                            admin.messaging().send(msg)
                                .then(function(response){

                                })
                                .catch(function (error) {
                                    console.log(error)
                                });
                        }

                    })

            }

        })

};
