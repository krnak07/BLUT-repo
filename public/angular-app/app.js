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
      .when('/hospital/request', {
          templateUrl : 'angular-app/hosp-req/web_hosp_req.html',
          controller : hospreqcontroller,
          controllerAs: 'vm'
      })
      .when('/hospital/request/new', {
          templateUrl : 'angular-app/hosp-req-s/web_req.html',
          controller : hospreqnewcontroller,
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
      });

    const firebaseConfig = {
        apiKey: "AIzaSyARrRzk-qumZ7fAHD6y9NpTrEaT2q8lD5k",
        authDomain: "blut-110799.firebaseapp.com",
        databaseURL: "https://blut-110799.firebaseio.com",
        projectId: "blut-110799",
        storageBucket: "blut-110799.appspot.com",
        messagingSenderId: "715930854454",
        appId: "1:715930854454:web:b4f14841505dee51"
    };
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey('BDnKskUcVoeK8-w_mMStz6Dx5L2Yye1vN-J1sQZvecgb6cKIJjunsjjOjaBwybzI8BrT8r4ZLdI8-j1o6XIVDaU');
    Notification.requestPermission()
        .then(function(permission){
            if(permission == 'granted'){
                return messaging.getToken();
            }
            else{
                console.log('unable to get permission');
            }
        })
        .then(function(token){
            sessionStorage.setItem('toke',token);
        });
    messaging.onMessage(function(payload) {
        alert('msg received');
        console.log(payload);
        const notificationTitle = payload.data.title;
        const notificationOptions = {
            body: payload.data.content,
        };
        navigator.serviceWorker.ready
            .then(function(registration){
            registration.showNotification(notificationTitle, notificationOptions);
        });
    });




}
