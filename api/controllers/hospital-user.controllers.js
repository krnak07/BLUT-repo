var mongoose = require('mongoose');
var firebase = require('firebase');
var hospuser = mongoose.model('hospitaluser');
var hospital = mongoose.model('hospital');

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
                                            hospitalname : req.body.typename,
                                            hospitalemail : req.body.typeemail,
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
                                .json({"msg":"snr"});
                        }
                        if(pro == null){
                            res
                                .status(400)
                                .json({"msg":"unf"});
                        }
                        else{
                            res
                                .status(200)
                                .json({"useremail":pro.email,"username":pro.firstname,"hospemail":pro.hospitalemail,"hospname":pro.hospitalname});
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
            console.log(error);
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
                    .status(400)
                    .json({"msg":"tmr"});
            }
            else if(error.code == "auth/invalid-email"){
                res
                    .status(400)
                    .json({"msg":"ie"});
            }
        });
};

module.exports.usercheck = function(req,res){
    hospital
        .findOne({email:req.body.hospemail})
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
                    hospuser
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
                                        .json({"msg":"unf","hospname":bank.name})
                                }
                                else{
                                    if(pro.hospitalemail == req.body.hospemail){
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

