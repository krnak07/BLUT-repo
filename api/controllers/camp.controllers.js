var mongoose = require('mongoose');

var camp = mongoose.model('camp')
var bloodbank = mongoose.model('bloodbank');
var profile = mongoose.model('profile');

module.exports.addNewCamp = function(req, res) {

  var id = req.params.bankID;

  console.log('Camp Created to Bank : ', id);

  bloodbank
  .findById(id)
  .exec(function(error,bankk) {
    if(error)
    {
      res
      .status(400)
      .json(error)
    }
    else {
      {
        camp
            .create({
                name : req.body.name,
                location : req.body.location,
                dateofhost: req.body.dof,
                phoneNo : req.body.phoneNo,
                hosting: id,
                bloodbank : bankk.name
            },function(err,cam) {
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
                        .json(cam)
                }
            });
      }
    }

  })
};

module.exports.addNewcampdonor = function(req, res) {

  var bId = req.params.bankID;
  var cId = req.params.campID;

    bloodbank
        .findById(bId)
        .exec(function(err,bb){
            if(err)
            {
                res
                    .status(400)
                    .json(err)
            }
            else
            {
                camp
                    .findById(cId)
                    .exec(function(err,cam){
                        if(err)
                        {
                            res
                                .status(400)
                                .json(err)
                        }
                        else if(cam.hosting != bId)
                        {
                            res
                                .status(400)
                                .json({"INVALID" : "Bloodbank Not associated with camp"})
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
                                            .json(err)
                                    }
                                    else
                                    {
                                        cam.campdonor.push({
                                            donor_name : pro.firstname,
                                            phoneNo : pro.phoneNo,
                                            dateofdonation : req.body.dateofdonation,
                                            bloodgroup : pro.bloodgroup,
                                            unitsofblood : parseInt(req.body.units)

                                        });
                                        pro.lastdonation.push({
                                            venue_id : cam._id,
                                            venue_name : cam.name,
                                            dateofdonation : req.body.dateofdonation,
                                            quantity : parseInt(req.body.units)
                                        });

                                        pro.totalunits += parseInt(req.body.units);

                                        pro.save(function(err,proupdated) {

                                        });

                                        cam.save(function(err,camupdated){
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
                                                    .json(camupdated)
                                            }

                                        });


                                    }
                                });
                        }
                    });
            }
        });


};

module.exports.getAllDonors = function(req, res) {
    var bId = req.params.bankID;
    var cId = req.params.campID;

    camp
        .findById(cId)
        .select('campdonor')
        .exec(function(err,cam){
           //console.log(cam.campdonor[1]['bloodgroup']);
           if(err)
           {

           }
           else
           {
               res
                   .status(200)
                   .json(cam.campdonor)
           }
        });

};

module.exports.getOneCamp = function(req, res) {
  var bId = req.params.bankID;
  var camp_name = req.query.name;

  bloodbank
      .findById(bId)
      .exec(function(err,bb){
          if(err)
          {
              res
                  .status(400)
                  .json(err)
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
                              .json(err)
                      }
                      else if(cam.hosting != bId)
                      {
                          res
                              .status(400)
                              .json({"INVALID" : "Bloodbank Not associated with camp"})
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
                   .json(err)
           }
           else{
               camp
                   .find({hosting : bId})
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
