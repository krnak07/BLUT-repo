var express = require('express');
var router = express.Router();

var ctrlbloodbank = require('../controllers/bloodbank.controllers.js');
var ctrlprofile = require('../controllers/profile.controllers.js');
var ctrlcamp = require('../controllers/camp.controllers.js');
var ctrlhosp = require('../controllers/hospitals.controllers');


//Donor
router
    .route('/donor/signup')
    .post(ctrlprofile.profilesignup);
router
    .route('/donor/login')
    .post(ctrlprofile.profilelogin);
router
    .route('/donor/check')
    .get(ctrlprofile.checkprofile);

//Bloodbank
router
    .route('/bloodbank/create')
    .post(ctrlbloodbank.blooadbankAddOne);
router
    .route('/bloodbank')
    .get(ctrlbloodbank.bloodbankGetAll);
router
    .route('/bloodbank/login')
    .post(ctrlbloodbank.bloodbankGetOne);
router
    .route('/bloodbank/:bankID/donate')
    .post(ctrlbloodbank.donate);
router
    .route('/bloodbank/:bankID/alldonations')
    .get(ctrlbloodbank.getAllDonations);

//Camps
router
    .route('/bloodbank/:bankID/camp_new')
    .post(ctrlcamp.addNewCamp);
router
    .route('/bloodbank/:bankID/camps/getone')
    .get(ctrlcamp.getOneCamp);
router
    .route('/bloodbank/:bankID/allcamps')
    .get(ctrlcamp.getAllcamps);
router
    .route('/bloodbank/:bankID/camps/:campID/donors')
    .get(ctrlcamp.getAllDonors);
router
    .route('/bloodbank/:bankID/camps/:campID/donation')
    .post(ctrlcamp.addNewcampdonor);

//Hospitals
router
    .route('/hospitals/signup')
    .post(ctrlhosp.hospitalSignup);
router
    .route('/hospitals/login')
    .post(ctrlhosp.hospitallogin);
router
    .route('/hospitals/:hospID/get_nearbyBB')
    .get(ctrlhosp.hospitalGetnearbyBB);
router
    .route('/hospitals/:hospID/get_nearbyDonors')
    .get(ctrlhosp.hospitalGetnearbyDonors);
router
    .route('/hospitals/:hospID/donate')
    .post(ctrlhosp.donation);





//test
router
    .route('/bloodbank/:bankID/test')
    .get(ctrlbloodbank.test_1);

module.exports = router;
