var mongoose = require('mongoose');
var firebase = require('firebase');
var bloodbank = mongoose.model('bloodbank');
var profile = mongoose.model('profile');

const firebaseConfig = {
  apiKey: "AIzaSyARrRzk-qumZ7fAHD6y9NpTrEaT2q8lD5k",
  authDomain: "blut-110799.firebaseapp.com",
  databaseURL: "https://blut-110799.firebaseio.com",
  projectId: "blut-110799",
  storageBucket: "blut-110799.appspot.com",
  messagingSenderId: "715930854454",
  appId: "1:715930854454:web:b4f14841505dee51"
};
var app = firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();


module.exports.bloodbankGetOne = function(req,res) {
  auth.signInWithEmailAndPassword(req.body.email, req.body.password)
      .then(function(){
        var user = auth.currentUser;
        if(user.emailVerified)
        {
          bloodbank
              .findById(user.displayName)
              .exec(function(err,bank){
                if(err){
                  res
                      .status(400)
                      .json(err);
                }
                res
                    .status(200)
                    .json(bank); //logged in bank details
              });

        }
        else
        {
          res
              .status(400)
              .json({"message" : "bank not verified"});
        }
      })
      .catch(function(error) {
        res
            .status(404)
            .json(error);
      });

};

module.exports.bloodbankGetAll = function(req,res) {
  bloodbank
  .find()
  .exec(function(err,banks){
    if(err){
      res
      .status(500)
      .json(err);
    }
    else
    res
    .status(200)
    .json(banks);
    });

};

function addbloodgroups(bank) {
    bloodgroup = ["A+","A-","B+","O+","O-"];
    var i= 0;
    while(i<bloodgroup.length)
    {
        bank.BloodAvailability.push({
            bloodType: bloodgroup[i],
            quantity: 0

        });

        bank.save(function(err,bankupdated)
        { });

        i+=1;
    }
};

module.exports.blooadbankAddOne = function(req,res){

    bloodbank
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
                                    bloodbank
                                        .create({
                                          name : req.body.name,
                                          address : req.body.addr,
                                          city : req.body.city,
                                          state : req.body.state,
                                          phoneNo : req.body.phone,
                                          email : req.body.email,
                                          password  : req.body.password,
                                          liscense : req.body.liscense
                                        },function(err,bank) {
                                            if(err){
                                                res
                                                    .status(400)
                                                    .json(err)
                                            }
                                            else {
                                              user.updateProfile({
                                                  displayName: bank.id,
                                              });
                                                user.sendEmailVerification()
                                                    .then(function () {
                                                        res
                                                            .status(200)
                                                            .json(bank);
                                                    });
                                                    addbloodgroups(bank);

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


function updatebloodunits(req,res,bank,bg,unit) {
    var i = 0;
    while(i<bank.BloodAvailability.length)
    {
        if(bank.BloodAvailability[i].bloodType == bg)
        {
            bank.BloodAvailability[i].quantity += unit;
        }
        i+=1;
    }



}

module.exports.donate = function(req,res){
  var bId = req.params.bankID;

  bloodbank
      .findById(bId)
      .exec(function(err,bank){
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
                  pro.lastdonation.push({
                    venue_id : bId,
                    venue_name : bank.name,
                    dateofdonation : req.body.dateofdonation,
                    quantity : parseInt(req.body.units)
                  });

                  pro.totalunits += parseInt(req.body.units);
                  updatebloodunits(req,res,bank,pro.bloodgroup,parseInt(req.body.units));

                  pro.save(function(err,proupdated) {
                    if(err){
                      res
                          .status(400)
                          .json(err)

                    }
                    else{
                      bank.donations.push({
                          donor_name : pro.firstname,
                          phoneNo : pro.phoneNo,
                          dateofdonation : req.body.dateofdonation,
                          bloodgroup : pro.bloodgroup,
                          unitsofblood : parseInt(req.body.units)

                      });
                      bank.save(function(err,updatedbank){
                          if(err){
                              res
                                  .status(400)
                                  .json(err)
                          }
                          else{
                              res
                                  .status(200)
                                  .json(updatedbank)
                          }
                      });

                    }

                  });




                }
              })
        }
      })

};

module.exports.getAllDonations = function(req,res) {
  bId = req.params.bankID;

  bloodbank
      .findById(bId)
      .select('donations')
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

module.exports.test_1 = function(req,res){
  bId = req.params.bankID;

  bloodbank
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
