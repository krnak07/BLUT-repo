angular.module('bbApp',['ngRoute'])
.config(config);

function config($routeProvider) {
  $routeProvider
      .when('/',{
          templateUrl : 'angular-app/web-main/web_main.html',
          controller : webmaincontroller,
          controllerAs : 'vm'
      })
      // .when('/signup',{
      //     templateUrl : 'angular-app/web-signup/web_signup.html',
      //     controller : websignupcontroller,
      //     controllerAs : 'vm'
      // })
      .when('/signup/bloodbank/user',{
          templateUrl : 'angular-app/web-gender/web_gender.html',
          controller : webgendercontroller,
          controllerAs : 'vm'
      })
      .when('/signup/bloodbank/user/male',{
          templateUrl : 'angular-app/web-bb-user-signup/web_bb_user_signup.html',
          controller : webbbusersignupcontroller,
          controllerAs : 'vm'
      })
      .when('/signup/bloodbank/user/female',{
          templateUrl : 'angular-app/web-bb-user-signup/web_bb_user_signup.html',
          controller : webbbusersignupcontroller,
          controllerAs : 'vm'
      })
      .when('/signup/bloodbank/user/details',{
          templateUrl : 'angular-app/web-user-details/web_user_details.html',
          controller : webuserdetailscontroller,
          controllerAs : 'vm'
      })
      .when('/signup/bloodbank/user/upload',{
          templateUrl : 'angular-app/web-user-upload/web_user_upload.html',
          controller : webuseruploadcontroller,
          controllerAs : 'vm'
      })
      .when('/login',{
          templateUrl : 'angular-app/web-login/web_login.html',
          controller : weblogincontroller,
          controllerAs : 'vm'
      })
      .when('/login/bloodbank',{
          templateUrl : 'angular-app/web-bb-login/web_bb_login.html',
          controller : webbblogincontroller,
          controllerAs : 'vm'
      })
      /*.when('/bloodbank/dashboard',{
          templateUrl : 'angular-app/web-bb-dashboard/web_bb_dashboard.html',
          controller : webbbdashboardcontroller,
          controllerAs : 'vm'
      })*/
      .when('/login/hospital',{
          templateUrl : 'angular-app/web-hosp-login/web_hosp_login.html',
          controller : webhosplogincontroller,
          controllerAs : 'vm'
      })
      .when('/login/camps',{
          templateUrl : 'angular-app/web-camp-login/web_camp_login.html',
          controller : webcamplogincontroller,
          controllerAs : 'vm'
      })

      .when('/test', {
          templateUrl: 'angular-app/test/web_bb_dashboard.html',
          controller: testc,
          controllerAs: 'vm'
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
