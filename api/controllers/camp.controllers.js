var mongoose = require('mongoose');

var camp = mongoose.model('camp');
var bloodbank = mongoose.model('bloodbank');
var profile = mongoose.model('profile');
var bbuser = mongoose.model('bloodbankuser');


function addbloodgroups(cam) {
    bloodgroup = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
    var i= 0;
    while(i<bloodgroup.length)
    {
        cam.BloodAvailability.push({
            bloodType: bloodgroup[i],
            quantity: 0

        });

        cam.save(function(err,bankupdated)
        { });

        i+=1;
    }
};
function updatebloodunits(req,res,cam,bg,unit) {
    var i = 0;
    while(i<cam.BloodAvailability.length)
    {
        if(cam.BloodAvailability[i].bloodType == bg)
        {
            cam.BloodAvailability[i].quantity += unit;
        }
        i+=1;
    }



}
module.exports.addNewCamp = function(req, res) {
    var id = req.params.bankID;
    var d = new Date();
    var dof = new Date(req.body.dof);

    bloodbank
        .findById(id)
        .exec(function(error,bankk) {
            if(error)
            {
                res
                    .status(400)
                    .json({"msg":"snr"});
            }
            else {
                {
                    camp
                        .create({
                            name : req.body.name,
                            location : req.body.location.toUpperCase(),
                            dateofhost: dof,
                            phoneNo : req.body.phoneNo,
                            hosting: id,
                            bloodbank : bankk.name,
                            createdOn : d
                        },function(err,cam) {
                            if(err)
                            {
                                res
                                    .status(400)
                                    .json({"msg":"ce"});
                            }
                            else
                            {
                                addbloodgroups(cam);
                                res
                                    .status(201)
                                    .json({"msg":"created"});
                            }
                        });
                }
            }

        })
};

module.exports.addNewcampdonor = function(req, res) {
    var cId = req.params.campID;
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
                if(bu==null){
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
                                if(bank==null){
                                    res
                                        .status(400)
                                        .json({"msg":"unf"});
                                }
                                else{
                                    camp
                                        .findById(cId)
                                        .exec(function(err,cam){
                                            if(err)
                                            {
                                                res
                                                    .status(400)
                                                    .json({"msg":"snr"});
                                            }
                                            else if(cam.hosting != bank._id)
                                            {
                                                res
                                                    .status(400)
                                                    .json({"msg" : "invalid"})
                                            }
                                            else
                                            {
                                                profile
                                                    .findOne({phoneNo : req.body.phoneNo})
                                                    .exec(function(err,pro){
                                                        if(err)
                                                        {
                                                            res
                                                                .status(400)
                                                                .json({"msg" : "snr"});
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
                                                                if (pro == null) {
                                                                    res
                                                                        .status(400)
                                                                        .json({"msg": "unf"})
                                                                } else {
                                                                    cam.donationhistory.push({
                                                                        user_name : req.body.username,
                                                                        user_email : req.body.useremail,
                                                                        donor_name : pro.firstname,
                                                                        phoneNo : pro.phoneNo,
                                                                        dateofdonation : d,
                                                                        bloodgroup : pro.bloodgroup,
                                                                        unitsofblood : parseInt(req.body.units)

                                                                    });

                                                                    var nd = new Date(d);
                                                                    nd.setDate(d.getDate() + 56);
                                                                    pro.lastdonatedDate = d;
                                                                    pro.lastdonatedVenue = cam.name;
                                                                    pro.nextdonationDate = nd;
                                                                    pro.donationhistory.push({
                                                                        venue_email : bank.email,
                                                                        venue_name : bank.name,
                                                                        user_name : req.body.username,
                                                                        dateofdonation : d,
                                                                        quantity : parseInt(req.body.units)
                                                                    });

                                                                    pro.totalunits += parseInt(req.body.units);
                                                                    updatebloodunits(req,res,cam,pro.bloodgroup,parseInt(req.body.units));

                                                                    pro.save(function(err,proupdated) {

                                                                    });

                                                                    cam.save(function(err,camupdated){
                                                                        if(err)
                                                                        {
                                                                            res
                                                                                .status(400)
                                                                                .json({"msg" : "snr"});
                                                                        }
                                                                        else
                                                                        {
                                                                            res
                                                                                .status(200)
                                                                                .json({"msg" : "done"});
                                                                        }

                                                                    });
                                                                }
                                                            }
                                                        }
                                                    });
                                            }
                                        });

                                }
                            }
                        })

                }
            }
        });


};

module.exports.getAllDonors = function(req, res) {
    var cId = req.params.campID;

    camp
        .findById(cId)
        .select('donationhistory')
        .exec(function(err,cam){
           //console.log(cam.campdonor[1]['bloodgroup']);
           if(err)
           {
             res
             .status(400)
             .json(err)
           }
           else
           {
               res
                   .status(200)
                   .json(cam.donationhistory)
           }
        });

};

function updatecampblooddetails(bank,cam,res){
    bloodgroup = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
    var i= 0;
    bloodbank
        .findById(bank.id)
        .select('campdonationhistory')
        .exec(function(err,bb){
            if(err){
                res
                    .status(400)
                    .json({"msg" : "snr"});
            }
            else{
                while(i<bloodgroup.length)
                {
                    bb.campdonationhistory[bb.campdonationhistory.length-1].bloodlist.push({
                        bloodType: bloodgroup[i],
                        quantity: cam.BloodAvailability[i].quantity
                    });
                    i+=1;
                }

                bb.save(function(err,updatebb){
                    if(err){
                        res
                            .status(400)
                            .json({"msg" : "es"});
                    }
                    else{ }
                });
            }
        });
}

module.exports.closecamp = function(req,res){
    var cId = req.params.campID;
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
                if(bu == null){
                    res
                        .status(400)
                        .json({"msg":"unf"})
                }
                else{
                    bloodbank
                        .findOne({email:bu.bloodbankemail})
                        .exec(function(err,bank){
                            if(err)
                            {
                                res
                                    .status(400)
                                    .json({"msg" : "snr"});
                            }
                            else
                            {
                                if(bank==null){
                                    res
                                        .status(400)
                                        .json({"msg":"bnf"})
                                }
                                else{

                                    camp
                                        .findById(cId)
                                        .exec(function(err,cam){
                                            if(err)
                                            {
                                                res
                                                    .status(400)
                                                    .json({"msg" : "snr"});
                                            }
                                            else if(cam.hosting != bank._id)
                                            {
                                                res
                                                    .status(400)
                                                    .json({"msg" : "invalid"})
                                            }
                                            else
                                            {

                                                bank.campdonationhistory.push({
                                                    name : cam.name,
                                                    dateofdonation : d
                                                });

                                                var i = 0;
                                                while(i<bank.BloodAvailability.length)
                                                {
                                                    bank.BloodAvailability[i].quantity += cam.BloodAvailability[i].quantity;
                                                    i+=1;
                                                }

                                                bank.save(function(err,upbb){
                                                    if(err){
                                                        res
                                                            .status(400)
                                                            .json({"msg" : "es"});
                                                    }
                                                    else{ updatecampblooddetails(upbb,cam,res);
                                                        res
                                                            .status(200)
                                                            .json({"msg" : "done"});
                                                    }
                                                });
                                            }
                                        });
                                }
                            }
                        });

                }
            }
        });

};
module.exports.getOneCamp = function(req, res) {
  var bId = req.params.bankID;
  var camp_name = req.query.name;

  bloodbank
      .findById(bId)
      .exec(function(err,bank){
          if(err)
          {
              res
                  .status(400)
                  .json({"msg" : "snr"});
          }
          else
          {
              camp
                  .findOne({name : camp_name})
                  .exec(function(err,cam){
                      if(err)
                      {
                          res
                              .status(400)
                              .json({"msg" : "done"});
                      }
                      else if(cam.hosting != bId)
                      {
                          res
                              .status(400)
                              .json({"msg" : "invalid"})
                      }
                      else
                      {
                          res
                              .status(200)
                              .json(cam)
                      }
                  });
          }
      });

};

module.exports.getAllcamps = function(req,res) {
    var bId = req.params.bankID;

    bloodbank
        .findById(bId)
        .exec(function(err,bb){
           if(err){
               res
                   .status(400)
                   .json({"msg" : "snr"});
           }
           else{
               camp
                   .find({hosting : bId})
                   .exec(function(err,cam){
                       if(err){
                           res
                               .status(400)
                               .json({"msg" : "snr"});
                       }
                       else{
                           res
                               .status(200)
                               .json(cam)
                       }

                   });
           }
        });
};
module.exports.getOnecamp = function(req,res) {
    var bId = req.params.bankID;
    var cId = req.params.campID;

    bloodbank
        .findById(bId)
        .exec(function(err,bb){
            if(err){
                res
                    .status(400)
                    .json(err)
            }
            else{
                camp
                    .findById(cId)
                    .exec(function(err,cam){
                        if(err){
                            res
                                .status(400)
                                .json(err)

                        }
                        else{
                            res
                                .status(200)
                                .json(cam)
                        }

                    });
            }
        });
};