angular.module('bbApp',['ngRoute'])
.config(config);

function config($routeProvider) {
  $routeProvider
      .when('/', {
    templateUrl : 'angular-app/main/web_main.html',
    controller : maincontroller,
    controllerAs: 'vm'
  })
      .when('/donor/signup', {
          templateUrl : 'angular-app/donor-signup/web_donor_signup.html',
          controller : donorsignupcontroller,
          controllerAs : 'vm'
      })
      .when('/bloodbank', {
    templateUrl : 'angular-app/bb-login/web_bb_login.html',
    controller : logincontroller,
    controllerAs : 'vm'
  })
      .when('/bloodbank/signup', {
          templateUrl : 'angular-app/bb-signup/web_bb_signup.html',
          controller : bbsignupcontroller,
          controllerAs : 'vm'
      })

      .when('/bloodbank/camp', {
          templateUrl : 'angular-app/bb-camp/web_bb_camp.html',
          controller : bbcampcontroller,
          controllerAs : 'vm'
      })
      .when('/bloodbank/camp/create', {
              templateUrl : 'angular-app/camp-create/web_camp_create.html',
              controller : campcreatecontroller,
              controllerAs : 'vm'
          })
  .when('/bloodbank/home',{
    templateUrl : 'angular-app/bb-home/web_bb_home.html',
    controller : mainbbcontroller,
    controllerAs: 'vm'
  })
  .when('/bloodbank/list', {
    templateUrl : 'angular-app/bb-list/bb-list.html',
    controller : listcontroller,
    controllerAs: 'vm'
  })
      .when('/bloodbank/donation', {
        templateUrl : 'angular-app/bb-donation/web_bb_Donation.html',
        controller : bbdonationcontroller,
        controllerAs: 'vm'
      })
      .when('/bloodbank/blood_availability', {
        templateUrl : 'angular-app/bb-BA/web_bb_BA.html',
        controller : bbBAcontroller,
        controllerAs: 'vm'
      })
  .when('/hospital', {
    templateUrl : 'angular-app/hosp-login/web_hosp_login.html',
    controller : hosplogincontroller,
    controllerAs : 'vm'
  })
  .when('/hospital/home', {
    templateUrl : 'angular-app/hosp-home/web_hosp_home.html',
    controller : mainhospcontroller,
    controllerAs: 'vm'
  })
      .when('/hospital/donation', {
          templateUrl : 'angular-app/hosp-donation/web_hosp_Donation.html',
          controller : hospdonationcontroller,
          controllerAs: 'vm'
      })
      .when('/hospital/bloodbanks', {
          templateUrl : 'angular-app/hosp-bb/web_hosp_bb.html',
          controller : hospbbcontroller,
          controllerAs: 'vm'
      })
      .when('/hospital/donor', {
          templateUrl : 'angular-app/hosp-donor/web_hosp_donor.html',
          controller : hospdonorscontroller,
          controllerAs: 'vm'
      })
      .when('/camp', {
          templateUrl : 'angular-app/camp-login/web_bb_camp_login.html',
          controller : camplogincontroller,
          controllerAs: 'vm'
      })

      .when('/camp/selection', {
        templateUrl : 'angular-app/camp-selection/web_camp_selection.html',
        controller : campselectioncontroller,
        controllerAs: 'vm'
      })
      .when('/camp/:id',{
          templateUrl : 'angular-app/camp-home/web_camp_home.html',
          controller : campmainconntroller,
          controllerAs : 'vm'
      })
          .when('/camp/:id/blood_availability',{
          templateUrl : 'angular-app/camp-BA/web_camp_BA.html',
          controller : campBAcontroller,
          controllerAs : 'vm'
      })
      .when('/camp/:id/donation',{
          templateUrl : 'angular-app/camp-donation/web_camp_Donation.html',
          controller : campdonationcontroller,
          controllerAs : 'vm'
      })



      .when('/test',{
          templateUrl : 'angular-app/test/asd.html',
          controller : testc,
          controllerAs : 'vm'
      })






}
