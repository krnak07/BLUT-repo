var mongoose = require('mongoose');
var request = require("request");
var firebase = require('firebase');
var nodemailer = require('nodemailer');
var serviceAccount = require('C:\\Users\\admin\\Downloads\\blut-110799-firebase-adminsdk-h7frz-7d77f4b9e4.json');
require('firebase/storage');
require('firebase/messaging');
var admin = require('firebase-admin');
var bloodbank = mongoose.model('bloodbank');
var profile = mongoose.model('profile');
var hospitals = mongoose.model('hospital');
var notification = mongoose.model('notification_token');
var bb_req = mongoose.model('requests');
var cors = require('cors')({origin: true});

const firebaseConfig = {
  apiKey: "AIzaSyARrRzk-qumZ7fAHD6y9NpTrEaT2q8lD5k",
  authDomain: "blut-110799.firebaseapp.com",
  databaseURL: "https://blut-110799.firebaseio.com",
  projectId: "blut-110799",
  storageBucket: "blut-110799.appspot.com",
  messagingSenderId: "715930854454",
  appId: "1:715930854454:web:b4f14841505dee51"
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();

module.exports.tokenregister = function(req,res){
    notification
        .findOne({client_name : req.body.name})
        .exec(function(err, noti){
            if(err){
                res
                    .status(400)
                    .json(err)
            }
            else{
                if(noti == null){
                    notification
                        .create({
                            client_name: req.body.name,
                            token : req.body.toke
                        },function(err,noti){
                            if(err){
                                res
                                    .status(400)
                                    .json(err)
                            }
                            else{
                                res
                                    .status(201)
                                    .json(noti)
                            }

                        })

                }
                else{
                    console.log('exists');
                    res
                        .status(200)
                        .json({"Message":"Already Exists"})
                }
            }
        })


};
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
    bloodgroup = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
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

    var d = new Date();

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
                                          phoneNo : req.body.phoneNo,
                                          email : req.body.email,
                                          password  : req.body.password,
                                          liscense : req.body.liscense,
                                          createdOn : d,
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
                                                            .status(201)
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



};
function send_mail_blooddonate(email) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'codered.blut@gmail.com',
            pass: 'qwe123rty456'
        }
    });
    var k = 0;
    var mailoptions = {
        from: 'BLUT <codered.blut@gmail.com>',
            to: email,
            subject: 'Blood Donation', // email subject
            html: `test`
    };
    transporter.sendMail(mailoptions,function(err,info){
        if(err){
            console.log(err);

        }
    });

};


module.exports.donordonate = function(req,res){
  var bId = req.params.bankID;
  var d = new Date();

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
                        pro.lastdonatedVenue = bank.name;
                        pro.nextdonationDate = nd;
                        pro.donationhistory.push({
                            venue_id : bId,
                            venue_name : bank.name,
                            dateofdonation : d,
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
                                bank.donordonationhistory.push({
                                    donor_name : pro.firstname,
                                    phoneNo : pro.phoneNo,
                                    dateofdonation : d,
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
                                            .json(updatedbank);
                                        send_mail_blooddonate(pro.email);
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

module.exports.getAllDonorDonations = function(req,res) {
  bId = req.params.bankID;

  bloodbank
      .findById(bId)
      .select('donordonationhistory')
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

function checkbloodavailablity(bank,bg,units) {
    var i = 0;
    while(i<bank.BloodAvailability.length)
    {
        if(bank.BloodAvailability[i].bloodType == bg)
        {
            if(bank.BloodAvailability[i].quantity>=units){
                bank.BloodAvailability[i].quantity -= units;
                return true;
            }
            else{
                return false;
            }
        }
        i+=1;
    }
}
module.exports.hospitaldonate = function(req,res){
    var bId = req.params.bankID;
    var d = new Date();

    bloodbank
        .findById(bId)
        .exec(function(err,bank){
            if(err){
                res
                    .status(400)
                    .json(err)
            }
            else{
                hospitals
                    .findById(req.body.hosp_id)
                    .exec(function(err,hosp){
                        if(err){
                            res
                                .status(400)
                                .json(err)
                        }
                        else{
                            if(checkbloodavailablity(bank,req.body.bg,parseInt(req.body.units))){
                                hosp.bloodbankdonationhistory.push({
                                    name : bank.name,
                                    dateofdonation : d,
                                    bloodgroup : req.body.bg,
                                    unitsofblood : parseInt(req.body.units)
                                });
                                hosp.save(function(err,uphosp){
                                    if(err){
                                        res
                                            .status(400)
                                            .json(err)
                                    }
                                    else{
                                        bank.donatedhistory.push({
                                            name : hosp.name,
                                            dateofdonation : d,
                                            bloodgroup : req.body.bg,
                                            unitsofblood : parseInt(req.body.units)
                                        });
                                        bank.save(function(err,upbank){
                                            if(err){
                                                res
                                                    .status(400)
                                                    .json(err)
                                            }
                                            else{
                                                res
                                                    .status(200)
                                                    .json(upbank)
                                            }
                                        });
                                    }
                                });
                            }
                            else{
                                res
                                    .status(400)
                                    .json({"Message" : "Not Enough Blood"})
                            }


                        }
                    })
            }
        })
};
module.exports.bb = function(req,res){
    var bid = req.params.bankID;
    bloodbank
        .findById(bid)
        .exec(function(err,bb){
            if(err){

            }
            else{
                res
                    .status(200)
                    .json(bb)
            }
        })
};

module.exports.test_1 = function(req,res){

    var options = {
        method: 'POST',
        url: 'https://aadhaarnumber-verify.p.rapidapi.com/Uidverify',
        qs: {
            uidnumber: '368116792602',
            clientid: '111',
            method: 'uidverify',
            txn_id: '123456'
        },
        headers: {
            'x-rapidapi-host': 'aadhaarnumber-verify.p.rapidapi.com',
            'x-rapidapi-key': '99a0ac0e75msh71c954386d154c5p1e3512jsn5ba9fc4e38ab',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {}
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
};
module.exports.requests = function(req,res){
    bb_req
        .findOne({"to":req.body.to})
        .exec(function(err,bb){
            if(err){
                res
                    .status(400)
                    .json(err)
            }
            else{
                res
                    .status(200)
                    .json(bb)
            }
        })
};
