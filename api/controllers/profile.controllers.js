var mongoose = require('mongoose');
var firebase = require('firebase');
var profile = mongoose.model('profile');

var err_profile;
var new_profile;


auth = firebase.auth();


module.exports.profilesignup = function(req,res){

    var d =new Date();
    /*var options = {
        method: 'POST',
        url: 'https://aadhaarnumber-verify.p.rapidapi.com/Uidverify',
        qs: {
            uidnumber: '368116792609',
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
    });*/

    profile
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
                                          totalunits : 0,
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
              .json(err);
      }
      else {
        if(pro == null)
        {
          res
          .status(200)
              .json(pro)
        }
        else {
          var nd = new Date(pro.nextdonationDate);
          if(d<nd){
            res
            .status(206)
            .json(pro);
          }
          else {
            res
            .status(200)
            .json(pro);
          }
        }

      }

  });
};
