var express = require('express');
var router = express.Router();

var ctrlbloodbank = require('../controllers/bloodbank.controllers.js');
var ctrlprofile = require('../controllers/profile.controllers.js');
var ctrlcamp = require('../controllers/camp.controllers.js');
var ctrlhosp = require('../controllers/hospitals.controllers');
var ctrltest = require('../controllers/test-controller');


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
    .route('/bloodbank/signup')
    .post(ctrlbloodbank.blooadbankAddOne);
router
    .route('/bloodbank')
    .get(ctrlbloodbank.bloodbankGetAll);
router
    .route('/bloodbank/login')
    .post(ctrlbloodbank.bloodbankGetOne);
router
    .route('/bloodbank/:bankID')
    .get(ctrlbloodbank.bb);
router
    .route('/bloodbank/:bankID/donor_donate')
    .post(ctrlbloodbank.donordonate);
router
    .route('/bloodbank/:bankID/hospital_donate')
    .post(ctrlbloodbank.hospitaldonate);
router
    .route('/bloodbank/:bankID/alldonations')
    .get(ctrlbloodbank.getAllDonorDonations);
router
    .route('/bloodbank/tokenregister')
    .post(ctrlbloodbank.tokenregister);
router
    .route('/bloodbank/requests')
    .post(ctrlbloodbank.requests);

//Camps
router
    .route('/bloodbank/:bankID/camp_new')
    .post(ctrlcamp.addNewCamp);
router
    .route('/bloodbank/:bankID/allcamps')
    .get(ctrlcamp.getAllcamps);
router
    .route('/bloodbank/:bankID/camps/:campID')
    .get(ctrlcamp.getOnecamp);
router
    .route('/bloodbank/:bankID/camps/:campID/donors')
    .get(ctrlcamp.getAllDonors);
router
    .route('/bloodbank/:bankID/camps/:campID/donation')
    .post(ctrlcamp.addNewcampdonor);
router
    .route('/bloodbank/:bankID/camps/:campID/close')
    .post(ctrlcamp.closecamp);

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
router
    .route('/hospitals/:hospID/donors')
    .get(ctrlhosp.getAlldonors);
router
    .route('/hospitals/:hospID/request')
    .post(ctrlhosp.requests);






//test
router
    .route('/hospital/:hospID/test')
    .get(ctrlhosp.test_1);
router
    .route('/hospitals/:hospID/test')
    .post(ctrlhosp.test_2);
router
    .route('/test')
    .get(ctrltest.wr);

module.exports = router;
