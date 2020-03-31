var mongoose = require('mongoose');
var request = require("request");
var firebase = require('firebase');
var nodemailer = require('nodemailer');
var serviceAccount = require('F:\\BLUT\\BLUT-v1.0.0\\blut-110799-firebase-adminsdk-h7frz-7d77f4b9e4.json');
require('firebase/storage');
require('firebase/messaging');
var admin = require('firebase-admin');
var bloodbank = mongoose.model('bloodbank');
var profile = mongoose.model('profile');
var bbuser = mongoose.model('bloodbankuser');
var hospitals = mongoose.model('hospital');
var notification = mongoose.model('notification_token');
var bb_req = mongoose.model('requests');



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
                    .json({"msg":"snr"});
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
                                    .json({"msg":"ce"});
                            }
                            else{
                                res
                                    .status(201)
                                    .json({"msg":"created"});
                            }

                        })

                }
                else{
                    res
                        .status(200)
                        .json({"msg":"ue"})
                }
            }
        })


};
module.exports.bloodbankLogin = function(req,res) {
  auth.signInWithEmailAndPassword(req.body.email, req.body.password)
      .then(function(){
        var user = auth.currentUser;
        if(user.emailVerified){
          bloodbank
              .findById(user.displayName)
              .exec(function(err,bank){
                if(err){
                  res
                      .status(404)
                      .json({"msg":"snr"});
                }
                else{
                    if(bank == null){
                        res
                            .status(404)
                            .json({"msg":"unf"});
                    }
                    else{
                        res
                            .status(200)
                            .json({"id":bank._id,"name":bank.name});
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
        .findOne({email : req.body.email})
        .exec(function(err,bank){
            if(err){
                res
                    .status(400)
                    .json({"msg":"snr"});
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
                                    bloodbank
                                        .create({
                                          name : req.body.name,
                                          address : req.body.addr,
                                          city : req.body.city,
                                          state : req.body.state,
                                          pincode : req.body.pincode,
                                          phoneNo : req.body.phoneNo,
                                          email : req.body.email,
                                          createdOn : d,
                                        },function(err,bank) {
                                            if(err){
                                                res
                                                    .status(400)
                                                    .json({"msg":"es"});
                                            }
                                            else {
                                              user.updateProfile({
                                                  displayName: bank.id,
                                              });
                                                user.sendEmailVerification()
                                                    .then(function () {
                                                        res
                                                            .status(201)
                                                            .json({"msg":"created"});
                                                    });
                                                    addbloodgroups(bank);

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
                        .json({"msg":"ue"});
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

    var d = new Date();
    bbuser
        .findOne({email:req.body.useremail})
        .exec(function(err,bu) {
            if (err) {
                res
                    .status(400)
                    .json({"msg": "ce"})
            }
            else{
                if(bu == null){
                    res
                        .status(400)
                        .json({"msg":"unf"});
                }
                else{
                    bloodbank
                        .findOne({email:bu.bloodbankemail})
                        .exec(function(err,bank){
                            if(err){
                                res
                                    .status(400)
                                    .json({"msg":"snr"});
                            }
                            else{
                                if(bank == null){
                                    res
                                        .status(400)
                                        .json({"msg":"bnf"})
                                }
                                else{
                                    profile
                                        .findOne({phoneNo : req.body.phoneNo})
                                        .exec(function(err,pro) {
                                            if (err) {
                                                res
                                                    .status(400)
                                                    .json({"msg": "snr"});

                                            } else {
                                                var nd = new Date(pro.nextdonationDate);
                                                if (d < nd && req.body.superdontaion == 'false') {
                                                    res
                                                        .status(206)
                                                        .json({"msg": "cannot"});
                                                }
                                                else {
                                                    var nd = new Date(d);
                                                    nd.setDate(d.getDate() + 56);
                                                    pro.lastdonatedDate = d;
                                                    pro.lastdonatedVenue = bank.name;
                                                    pro.nextdonationDate = nd;
                                                    pro.donationhistory.push({
                                                        venue_email : bank.email,
                                                        venue_name : bank.name,
                                                        user_name : req.body.username,
                                                        dateofdonation : d,
                                                        quantity : parseInt(req.body.units)
                                                    });

                                                    pro.totalunits += parseInt(req.body.units);
                                                    updatebloodunits(req,res,bank,pro.bloodgroup,parseInt(req.body.units));

                                                    bank.donordonationhistory.push({
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
                                                                .json({"msg":"es"});

                                                        }
                                                    });
                                                    bank.save(function(err,updatedbank){
                                                        if(err){
                                                            res
                                                                .status(400)
                                                                .json({"msg":"es"});
                                                        }
                                                        else{
                                                            res
                                                                .status(200)
                                                                .json({"msg":"done"});
                                                            send_mail_blooddonate(pro.email);
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
        });


};

module.exports.getAllDonorDonations = function(req,res) {
    bloodbank
        .findOne({email:req.body.email})
        .select('donordonationhistory')
        .exec(function(err,bank){
            if(err){
                res
                    .status(400)
                    .json({"msg":"snr"});
            }
            else{
                if(bank == null){
                    res
                        .status(400)
                        .json({"msg":"bnk"})
                }
                else{
                    res
                        .status(200)
                        .json(bank)
                }
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
    var d = new Date();
    bbuser
        .findOne({email:req.body.useremail})
        .exec(function(err,bu){
            if(err){
                res
                    .status(400)
                    .json({"msg":"snr"})
            }
            else{
                if(bu==null){
                    res
                        .status(400)
                        .json({"msg":"unf"})
                }
                else{
                    bloodbank
                        .findOne({email:bu.bloodbankemail})
                        .exec(function(err,bank){
                            if(err){
                                res
                                    .status(400)
                                    .json({"msg":"snr"});
                            }
                            else{
                                if (bank == null ){
                                    res
                                        .status(400)
                                        .json({"msg":"bnf"})
                                }
                                else{
                                    hospitals
                                        .findById(req.body.hospid)
                                        .exec(function(err,hosp){
                                            if(err){
                                                res
                                                    .status(400)
                                                    .json({"msg":"ce"});
                                            }
                                            else{
                                                if(hosp == null){
                                                    res
                                                        .status(400)
                                                        .json({"msg":"hnf"});
                                                }
                                                else{
                                                    if(checkbloodavailablity(bank,req.body.bg,parseInt(req.body.units))){
                                                        hosp.bloodbankdonationhistory.push({
                                                            name : bank.name,
                                                            email : bank.email,
                                                            user_name : req.body.username,
                                                            dateofdonation : d,
                                                            bloodgroup : req.body.bg,
                                                            unitsofblood : parseInt(req.body.units)
                                                        });
                                                        bank.donatedhistory.push({
                                                            user_name : req.body.username,
                                                            user_email : req.body.useremail,
                                                            name : hosp.name,
                                                            email : hosp.email,
                                                            dateofdonation : d,
                                                            bloodgroup : req.body.bg,
                                                            unitsofblood : parseInt(req.body.units)
                                                        });
                                                        hosp.save(function(err,uphosp){
                                                            if(err){
                                                                res
                                                                    .status(400)
                                                                    .json({"msg":"es"});
                                                            }
                                                        });
                                                        bank.save(function(err,upbank){
                                                            if(err){
                                                                res
                                                                    .status(400)
                                                                    .json({"msg":"es"});
                                                            }
                                                            else{
                                                                res
                                                                    .status(200)
                                                                    .json({"msg":"done"});
                                                            }
                                                        });

                                                    }
                                                    else{
                                                        res
                                                            .status(400)
                                                            .json({"Message" : "neb"})
                                                    }
                                                }
                                            }
                                        })
                                }
                            }
                        })
                }
            }
        });


};
module.exports.requests = function(req,res){
    bb_req
        .findOne({"to":req.body.to})
        .exec(function(err,bb){
            if(err){
                res
                    .status(400)
                    .json({"Message" : "snr"})
            }
            else{
                res
                    .status(200)
                    .json(bb)
            }
        })
};











//test
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

