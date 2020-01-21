var mongoose = require('mongoose');
var firebase = require('firebase');
var bloodbank = mongoose.model('bloodbank');
var organisations = mongoose.model('organisation');

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

module.exports.orgSignup = function(req,res){
    var d = new Date();

    organisations
        .findOne({name : req.body.name})
        .exec(function(err,org){
            if(err){
                res
                    .status(400)
                    .json(err)
            }
            else
            {
                if(org == null ){
                    k = 0;
                    auth.createUserWithEmailAndPassword(req.body.email, req.body.password)
                        .then(function () {
                            auth.signInWithEmailAndPassword(req.body.email, req.body.password)
                                .then(function () {
                                    var user = auth.currentUser;
                                    console.log("User created : ",req.body.name);
                                    organisations
                                        .create({
                                            name : req.body.name,
                                            address : req.body.addr,
                                            city : req.body.city,
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
                                                    displayName: org.id,
                                                });
                                                user.sendEmailVerification()
                                                    .then(function () {
                                                        res
                                                            .status(200)
                                                            .json(org);
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