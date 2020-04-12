var mongoose = require('mongoose');
var request = require("request");
var firebase = require('firebase');
var nodemailer = require('nodemailer');
var path = require('path');
var cpath = path.dirname('credentials/blut-110799-firebase-adminsdk-h7frz-7d77f4b9e4');
var serviceAccount = cpath+'/blut-110799-firebase-adminsdk-h7frz-7d77f4b9e4.json';
require('firebase/storage');
require('firebase/messaging');
var admin = require('firebase-admin');
var bloodbank = mongoose.model('bloodbank');
var profile = mongoose.model('profile');
var bbuser = mongoose.model('bloodbankuser');
var hospitals = mongoose.model('hospital');
var jwt = require('jsonwebtoken');
var notification = mongoose.model('notification_token');
var bb_req = mongoose.model('requests');
var email 	= require("emailjs");
var jade = require('jade');

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

module.exports.authenticate = function(req,res,next){
    var headerExists = req.headers.authorization;
    if(headerExists){
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token,'cptn3m0',function(err,decoded){
            if(err){
                res
                    .status(401)
                    .json({"msg":"Unauthorized"})
            }
            else{
                req.email = decoded.email;
                next();
            }
        })
    }
    else{
        res
            .status(403)
            .json({"msg":"token missing"})
    }
}

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
function send_mail_blooddonate(uemail,username,bbname,units,Dtime,Ddate) {
    username = 'Hi '+username+',';
    var TestTemplate = jade.renderFile(__dirname+'\\email-template\\test-template.jade',{name:username,place:bbname,Ddate:Ddate,Dtime:Dtime,units:units});
    var server 	= email.server.connect({
        user:	"codered.blut@gmail.com",
        password:"daokcdcgniytuzkk",
        host:	"smtp.gmail.com",
        ssl : true,
    });

    var message	= {
        from:	"BLOOD <codered.blut@gmail.com>",
        to:		uemail,
        subject:	"Blood Donation",
        attachment:
            [
                {data : TestTemplate, alternative: true},
                {path:__dirname+"\\email-template\\LOGO.png", type:"image/jpg",  headers:{"Content-ID":"<krnak110799>"}}
            ]
    };

// send the message and get a callback with an error or details of the message that was sent
    server.send(message, function(err, message) { console.log(err);});
};


module.exports.donordonate = function(req,res){

    var d = new Date();
    bbuser
        .findOne({email:req.useremail})
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
                    if(req.email == bu.bloodbankemail){
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
                                                    if (d < nd && req.body.superdonation == 'n') {
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
                                                            user_name : bu.firstname,
                                                            dateofdonation : d,
                                                            quantity : parseInt(req.body.units)
                                                        });

                                                        pro.totalunits += parseInt(req.body.units);
                                                        updatebloodunits(req,res,bank,pro.bloodgroup,parseInt(req.body.units));

                                                        bank.donordonationhistory.push({
                                                            user_name : bu.firstname,
                                                            user_email : bu.email,
                                                            donor_name : pro.firstname,
                                                            phoneNo : pro.phoneNo,
                                                            dateofdonation : d,
                                                            bloodgroup : pro.bloodgroup,
                                                            unitsofblood : parseInt(req.body.units)

                                                        });

                                                        pro.save(function(err,proupdated) {
                                                            if(err){
                                                                console.log(err);
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
                                                                send_mail_blooddonate(pro.email,pro.firstname,bank.name,req.body.units,d.toLocaleTimeString(),d.toLocaleDateString());
                                                            }
                                                        });
                                                    }
                                                }
                                            })
                                    }

                                }
                            })
                    }

                    else{
                        res
                            .status(401)
                            .json({"msg":"Unauthorized"})
                    }
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
        .findOne({email:req.useremail})
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
                                                            user_name : bu.firstname,
                                                            dateofdonation : d,
                                                            bloodgroup : req.body.bg,
                                                            unitsofblood : parseInt(req.body.units)
                                                        });
                                                        bank.donatedhistory.push({
                                                            user_name : bu.firstname,
                                                            user_email : req.useremail,
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

module.exports.getBA = function(req,res){
    bloodbank
        .findOne({email:req.email})
        .exec(function(err,bank){
            if(err){
                res
                    .status(400)
                    .json({"msg":"snr"})
            }
            else{
                res
                    .status(200)
                    .json(bank.BloodAvailability)
            }
        })
}
module.exports.getDL = function(req,res){
    bloodbank
        .findOne({email:req.email})
        .exec(function(err,bank){
            if(err){
                res
                    .status(400)
                    .json({"msg":"snr"})
            }
            else{
                res
                    .status(200)
                    .json(bank.donordonationhistory)
            }
        })
}











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

module.exports.sendemail1 = function(req,res){
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'codered.blut@gmail.com',
            pass: 'daokcdcgniytuzkk'
        },
    });
    const output = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div id="email_template" style="position: absolute;
width: 400px;
height: 450px;
overflow: hidden;"> 
<svg class="Rectangle_122" style="position: absolute;
overflow: visible;
width: 400px;
height: 450px;
left: 0px;
top: 0px;">
<rect fill="rgba(255,255,255,1)" stroke="rgba(49,49,49,1)" stroke-width="5px" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" shape-rendering="auto" id="Rectangle_122" rx="25" ry="25" x="0" y="0" width="400" height="450">
</rect>
</svg>
<table>
<thead>
<tr>
<th>
<img id="LOGO" src="cid:krnak110799@blood.in" style="position: absolute;
width: 131px;
height: 32.851px;
left: 25px;
top: 25px;
overflow: visible;">
</th>
<th id="date_inp" style="position: absolute;
left: 297px;
top: 32px;
overflow: visible;
width: 92px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 17px;
color: rgba(49,49,49,1);">
<span>Jul, 11 1999</span>
</th>
</tr>
</thead>
<svg class="Rectangle_123" style="position: absolute;
overflow: visible;
width: 350px;
height: 166px;
left: 20px;
top: 83px;">
<rect fill="rgba(245,245,245,1)" id="Rectangle_123" rx="5" ry="5" x="0" y="0" width="350" height="166">
</rect>
</svg>
<tbody>
<tr>
<td id="Donation" style="position: absolute;
left: 35px;
top: 93px;
overflow: visible;
width: 69px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 17px;
color: rgba(0,0,0,1);">
<span>Donation</span>
</td>
</tr>
<tr>
<td>
<svg class="Line_12" viewBox="0 0 336 1" style="overflow: visible;
position: absolute;
width: 336px;
height: 1px;
left: 32px;
top: 122px;
transform: matrix(1,0,0,1,0,0);
opacity: 0.26;">
<path fill="transparent" stroke="rgba(112,112,112,1)" stroke-width="1px" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" shape-rendering="auto" id="Line_12" d="M 0 0 L 336 0">
</path>
</svg>
</td>
</tr>
<tr>
<td id="STATUS" style="position: absolute;
left: 32px;
top: 129px;
overflow: visible;
width: 58px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<span>STATUS</span>
</td>
<td id="_" style="position: absolute;
left: 174px;
top: 129px;
overflow: visible;
width: 5px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<span>:</span>
</td>
<td id="status_inp" style="position: absolute;
left: 188px;
top: 129px;
overflow: visible;
width: 25px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<span>text</span>
</td>
</tr>
<tr>
<td>
<svg class="Line_13" viewBox="0 0 336 1" style="overflow: visible;
position: absolute;
width: 336px;
height: 1px;
left: 32px;
top: 153px;
transform: matrix(1,0,0,1,0,0);.
opacity: 0.26;">
<path fill="transparent" stroke="rgba(112,112,112,1)" stroke-width="1px" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" shape-rendering="auto" id="Line_13" d="M 0 0 L 336 0">
</path>
</svg>
</td>
</tr>
<tr>
<td id="UNITS" style="position: absolute;
left: 32px;
top: 160px;
overflow: visible;
width: 46px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<span>UNITS</span>
</td>
<td id="__c" style="position: absolute;
left: 174px;
top: 160px;
overflow: visible;
width: 5px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<span>:</span>
</td>
<td id="units_inp" style="position: absolute;
left: 188px;
top: 160px;
overflow: visible;
width: 25px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<span>text</span>
</td>
</tr>
<tr>
<td>
<svg class="Line_14" viewBox="0 0 336 1" style="overflow: visible;
position: absolute;
width: 336px;
height: 1px;
left: 32px;
top: 184px;
transform: matrix(1,0,0,1,0,0); opacity: 0.26;">
<path fill="transparent" stroke="rgba(112,112,112,1)" stroke-width="1px" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" shape-rendering="auto" id="Line_14" d="M 0 0 L 336 0">
</path>
</svg>
</td>
</tr>
<tr>
<td id="TIME" style="position: absolute;
left: 32px;
top: 191px;
overflow: visible;
width: 37px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<span>TIME</span>
</td>
<td id="__da" style="
position: absolute;
left: 174px;
top: 191px;
overflow: visible;
width: 5px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<span>:</span>
</td>
<td id="time_inp" style="
position: absolute;
left: 188px;
top: 191px;
overflow: visible;
width: 25px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<span>text</span>
</td>
</tr>
<tr>
<td>
<svg class="Line_15" viewBox="0 0 336 1" 
overflow: visible;
position: absolute;
width: 336px;
height: 1px;
left: 32px;
top: 215px;
transform: matrix(1,0,0,1,0,0);>
<path fill="transparent" stroke="rgba(112,112,112,1)" stroke-width="1px" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" shape-rendering="auto" id="Line_15" d="M 0 0 L 336 0">
</path>
</svg>
</td>
</tr>
<tr>
<td id="PLACE" style="position: absolute;
left: 188px;
top: 222px;
overflow: visible;
width: 25px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<span>PLACE</span>
</td>
<td id="__db" style="position: absolute;
left: 174px;
top: 222px;
overflow: visible;
width: 5px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<span>:</span>
</td>
<td id="place_inp" style="position: absolute;
left: 188px;
top: 222px;
overflow: visible;
width: 25px;
white-space: nowrap;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<span>text</span>
</td>
</tr>
<tr id="Hi_Kiran_A_K__If_you_have_not_" style="position: absolute;
left: 20px;
top: 294px;
overflow: visible;
width: 351px;
height: 122px;
text-align: left;
font-family: Arial;
font-style: normal;
font-weight: normal;
font-size: 15px;
color: rgba(0,0,0,1);">
<td><br/>Hi Kiran A K<br/>If you have not made this donation or notice any error please contact us.<br/><br/>Cheers!<br/>Team BLOOD</td>
</tr>
</table>
</div>
</body>
</html>`;
    var mailoptions = {
        from: 'BLOOD <codered.blut@gmail.com>',
        to: 'krnak526@gmail.com',
        subject: 'Blood Donation',
        attachments : [
            {
                filename : 'sample.png',
                pathname : __dirname+'/sample.png',
            }
        ],
        html : output ,
    };
    transporter.sendMail(mailoptions,function(err,info){
        if(err){
            res
                .json(err)
            console.log(err);
        }
        else{
            res
                .json(info)
            console.log(info);
        }
    });
}

module.exports.sendemail = function(req,res){
    var email 	= require("emailjs");
    var jade = require('jade');
    var TestTemplate = jade.renderFile(__dirname+'\\email-template\\test-template.jade',{name:dname,place:place,Ddate:ddate,Dtime:dtime,units:units});
    var server 	= email.server.connect({
        user:	"codered.blut@gmail.com",
        password:"daokcdcgniytuzkk",
        host:	"smtp.gmail.com",
        ssl : true,
    });

    var message	= {
        from:	"BLOOD <codered.blut@gmail.com>",
        to:		"krnak526@gmail.com",
        subject:	"Blood Donation",
        attachment:
            [
                {data : TestTemplate, alternative: true},
                {path:__dirname+"\\email-template\\LOGO.png", type:"image/jpg",  headers:{"Content-ID":"<krnak110799>"}}
            ]
    };

// send the message and get a callback with an error or details of the message that was sent
    server.send(message, function(err, message) { console.log(err || message);});
}


