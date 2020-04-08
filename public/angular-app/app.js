angular.module('bbApp',['ngRoute'])
.config(config);

function config($routeProvider,$locationProvider) {

    $routeProvider
        .when('/',{
            templateUrl : 'angular-app/web-main/web_main.html',
            controller : webmaincontroller,
            controllerAs : 'vm'
        })
        .when('/signup',{
            templateUrl : 'angular-app/web-signup/web_signup.html',
            controller : websignupcontroller,
            controllerAs : 'vm'
        })
        .when('/signup/bloodbank',{
            templateUrl : 'angular-app/web-bb-signup/web_bb_signup.html',
            controller : webbbsignupcontroller,
            controllerAs : 'vm'
        })
        .when('/signup/hospital',{
            templateUrl : 'angular-app/web-hosp-signup/web_hosp_signup.html',
            controller : webhospsignupcontroller,
            controllerAs : 'vm'
        })
        .when('/signup/liscenseupload',{
            templateUrl : 'angular-app/web-liscense-upload/web_liscense_upload.html',
            controller : weblisuploadcontroller   ,
            controllerAs : 'vm'
        })
        .when('/signup/bloodbank/user',{
            templateUrl : 'angular-app/web-gender/web_gender.html',
            controller : webgendercontroller,
            controllerAs : 'vm'
        })
        .when('/signup/hospital/user',{
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
        .when('/signup/hospital/user/male',{
            templateUrl : 'angular-app/web-hosp-user-signup/web_hosp_user_signup.html',
            controller : webhospusersignupcontroller,
            controllerAs : 'vm'
        })
        .when('/signup/hospital/user/female',{
            templateUrl : 'angular-app/web-hosp-user-signup/web_hosp_user_signup.html',
            controller : webhospusersignupcontroller,
            controllerAs : 'vm'
        })
        .when('/signup/user/details',{
            templateUrl : 'angular-app/web-user-details/web_user_details.html',
            controller : webuserdetailscontroller,
            controllerAs : 'vm'
        })
        .when('/signup/user/upload',{
            templateUrl : 'angular-app/web-user-upload/web_user_upload.html',
            controller : webuseruploadcontroller,
            controllerAs : 'vm'
        })
        .when('/signup/emailverify',{
            templateUrl : 'angular-app/emailverify/web_emailverify.html',
            controller : emailverifycontroller,
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
        .when('/bloodbank/dashboard',{
            templateUrl : 'angular-app/web-bb-dashboard/web_bb_dashboard.html',
            controller : webbbdashboardcontroller,
            controllerAs : 'vm'
        })
        .when('/bloodbank/bloodavailability',{
            templateUrl : 'angular-app/web-bb-ba/web_bb_BA.html',
            controller : webbbbacontroller,
            controllerAs : 'vm'
        })
        .when('/bloodbank/donation',{
            templateUrl : 'angular-app/web-bb-donation-dash/web_bb_donation_dashboard.html',
            controller : webbbdonationdashcontroller,
            controllerAs : 'vm'
        })
        .when('/bloodbank/donationlist',{
            templateUrl : 'angular-app/web-bb-donation-list/web_bb_donation_list.html',
            controller : webbbdonationlistcontroller,
            controllerAs : 'vm'
        })
        .when('/bloodbank/donate',{
            templateUrl : 'angular-app/web-bb-donate/web_bb_donate.html',
            controller : webbbdonatecontroller,
            controllerAs : 'vm'
        })
        .when('/login/hospital',{
            templateUrl : 'angular-app/web-hosp-login/web_hosp_login.html',
            controller : webhosplogincontroller,
            controllerAs : 'vm'
        })
        .when('/hospital/dashboard',{
            templateUrl : 'angular-app/web-hosp-dashboard/web_hosp_dashboard.html',
            controller : webhospdashboardcontroller,
            controllerAs : 'vm'
        })
        .when('/login/camps',{
            templateUrl : 'angular-app/web-camp-login/web_camp_login.html',
            controller : webcamplogincontroller,
            controllerAs : 'vm'
        })
        .when('/table', {
            templateUrl: 'angular-app/table-test/web_camp_donation_list___1.html',
            controller: tablec,
            controllerAs: 'vm'
        })
        .when('/error404', {
            templateUrl: 'angular-app/waiting/web_waiting.html',
        })
        .otherwise({
            redirectTo : '/error404',
        })

        .when('/test', {
            templateUrl: 'angular-app/test/web_bb_dashboard.html',
            controller: testc,
            controllerAs: 'vm'
        });

    $locationProvider.html5Mode(true);


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
