var mongoose = require('mongoose');
var firebase = require('firebase');
var admin = require('firebase-admin');
var hospitals = mongoose.model('hospital');
var bloodbank = mongoose.model('bloodbank');
var profile = mongoose.model('profile');
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
                    .json(err)
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
                                    console.log("User created : ",req.body.name);
                                    hospitals
                                        .create({
                                            name : req.body.name,
                                            address : req.body.addr,
                                            city : req.body.city.toUpperCase(),
                                            state : req.body.state,
                                            phoneNo : req.body.phoneNo,
                                            email : req.body.email,
                                            liscense : req.body.liscense,
                                            createdOn : d,
                                        },function(err,hosp) {
                                            if(err){
                                                res
                                                    .status(400)
                                                    .json(err)
                                            }
                                            else {
                                                user.updateProfile({
                                                    displayName: hosp.id,
                                                });
                                                user.sendEmailVerification()
                                                    .then(function () {
                                                        res
                                                            .status(200)
                                                            .json(hosp);
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
module.exports.hospitallogin = function(req,res){
    auth.signInWithEmailAndPassword(req.body.email,req.body.password)
        .then(function() {
            var user = auth.currentUser;
            if(user.emailVerified)
            {
                hospitals
                    .findById(user.displayName)
                    .exec(function(err,hosp){
                        if(err)
                        {
                            res
                                .status(400)
                                .json(err);
                        }
                        else
                        {
                            res
                                .status(200)
                                .json(hosp);
                        }
            });
            }
            else
            {
                res
                    .status(400)
                    .json({'message' : 'user not verified'});
            }
        })
        .catch(function(error){
            res
                .status(404)
                .json(error)
        });

};

module.exports.hospitalGetnearbyBB = function(req,res){
  hid = req.params.hospID;
  hospitals
  .findById(hid)
  .exec(function(err,hosp){
    if(err){
      res
      .status(400)
      .json(err);
    }

    else{
      bloodbank
      .find({city : hosp.city})
      .exec(function(err,bank){
        if(err){
          res
          .status(400)
          .json(err)
        }
        else {
          res
          .status(200)
          .json(bank)
        }

      })
    }
  });
};

module.exports.hospitalGetnearbyDonors = function(req,res){
  hid = req.params.hospID;
  hospitals
  .findById(hid)
  .exec(function(err,hosp){
    if(err){
      res
      .status(400)
      .json(err);
    }

    else{
      profile
      .find({city : hosp.city})
      .exec(function(err,pro){
        if(err){
          res
          .status(400)
          .json(err)
        }
        else {
          res
          .status(200)
          .json(pro)
        }

      })
    }
  });
};

module.exports.donation = function(req,res){
  var hid = req.params.hospID;
  var d = new Date();


  hospitals
      .findById(hid)
      .exec(function(err,hosp){
        if(err){
          res
              .status(400)
              .json(err)
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
                    if(d<nd){
                        res
                            .status(206)
                            .json({"Message" : "Cannot Donate as next donation date is not reached"});
                    }
                    else {
                        var nd = new Date(d);
                        nd.setDate(d.getDate() + 56);
                        pro.lastdonatedDate = d;
                        pro.lastdonatedVenue = hosp.name;
                        pro.nextdonationDate = nd;
                        pro.donationhistory.push({
                            venue_id : hid,
                            venue_name : hosp.name,
                            dateofdonation : d,
                            quantity : parseInt(req.body.units)
                        });

                        pro.totalunits += parseInt(req.body.units);
                        //updatebloodunits(req,res,bank,pro.bloodgroup,parseInt(req.body.units));

                        pro.save(function(err,proupdated) {
                            if(err){
                                res
                                    .status(400)
                                    .json(err)

                            }
                            else{
                                hosp.donationhistory.push({
                                    donor_name : pro.firstname,
                                    phoneNo : pro.phoneNo,
                                    dateofdonation : d,
                                    bloodgroup : pro.bloodgroup,
                                    unitsofblood : parseInt(req.body.units)

                                });
                                hosp.save(function(err,updatedhosp){
                                    if(err){
                                        res
                                            .status(400)
                                            .json(err)
                                    }
                                    else{
                                        res
                                            .status(200)
                                            .json(updatedhosp)
                                    }
                                });

                            }

                        });
                    }

                }
              })
        }
      })

};

module.exports.getAlldonors = function(req,res){
    hid = req.params.hospID;
    hospitals
        .findById(hid)
        .select('donationhistory')
        .exec(function(err,hosp){
            if(err){
                res
                    .status(400)
                    .json(err);
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
                console.log(err);
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
                                .json(err)
                        }
                        else{
                            var msg = {
                                data: {
                                    title: noti.client_name,
                                    content:'Requested "'+req.body.bg+'" blood - UNITS : '+req.body.unit
                                },
                                token: noti.token
                            };
                            admin.messaging().send(msg)
                                .then(function(response){
                                    res
                                        .status(201)
                                        .json(re)
                                })
                                .catch(function (error) {
                                    console.log(error);

                                });
                        }

                    })

            }

        })

};
