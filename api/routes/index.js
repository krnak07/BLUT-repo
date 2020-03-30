var express = require('express');
var router = express.Router();

var ctrlbloodbank = require('../controllers/bloodbank.controllers.js');
var ctrlprofile = require('../controllers/profile.controllers.js');
var ctrlcamp = require('../controllers/camp.controllers.js');
var ctrlhosp = require('../controllers/hospitals.controllers');
var ctrltest = require('../controllers/test-controller');
var ctrlbbuser = require('../controllers/bloodbank-user.controllers');
var ctrlhospuser = require('../controllers/hospital-user.controllers');


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
    .post(ctrlbloodbank.bloodbankLogin);
router
    .route('/bloodbank/donor_donate')
    .post(ctrlbloodbank.donordonate);
router
    .route('/bloodbank/hospital_donate')
    .post(ctrlbloodbank.hospitaldonate);
router
    .route('/bloodbank/alldonations')
    .get(ctrlbloodbank.getAllDonorDonations);
router
    .route('/bloodbank/tokenregister')
    .post(ctrlbloodbank.tokenregister);
router
    .route('/bloodbank/requests')
    .post(ctrlbloodbank.requests);

//Camps
router
    .route('/bloodbank/camp_new')
    .post(ctrlcamp.addNewCamp);
router
    .route('/bloodbank/allcamps')
    .get(ctrlcamp.getAllcamps);
router
    .route('/bloodbank/camps/:campID')
    .get(ctrlcamp.getOnecamp);
router
    .route('/bloodbank/camps/:campID/donors')
    .get(ctrlcamp.getAllDonors);
router
    .route('/bloodbank/camps/:campID/donation')
    .post(ctrlcamp.addNewcampdonor);
router
    .route('/bloodbank/camps/:campID/close')
    .post(ctrlcamp.closecamp);

//Hospitals
router
    .route('/hospitals/signup')
    .post(ctrlhosp.hospitalSignup);
router
    .route('/hospitals/login')
    .post(ctrlhosp.hospitallogin);
router
    .route('/hospitals/get_nearbyBB')
    .get(ctrlhosp.hospitalGetnearbyBB);
router
    .route('/hospitals/get_nearbyDonors')
    .get(ctrlhosp.hospitalGetnearbyDonors);
router
    .route('/hospitals/donate')
    .post(ctrlhosp.donation);
router
    .route('/hospitals/donors')
    .get(ctrlhosp.getAlldonors);
router
    .route('/hospitals/request')
    .post(ctrlhosp.requests);


//users

router
    .route('/signup/bbuser')
    .post(ctrlbbuser.bbusersignup);
router
    .route('/login/bbuser')
    .post(ctrlbbuser.bbuserlogin);
router
    .route('/bloodbank/usercheck')
    .post(ctrlbbuser.usercheck);

router
    .route('/signup/hospuser')
    .post(ctrlhospuser.hospusersignup);
router
    .route('/login/hospuser')
    .post(ctrlhospuser.hospuserlogin);



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
