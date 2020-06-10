angular.module('bbApp',['ngRoute'])
.config(config).run(run);

function config($routeProvider,$locationProvider,$httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
        .when('/',{
            templateUrl : 'angular-app/web-main/web_main.html',
            controller : webmaincontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup',{
            templateUrl : 'angular-app/web-signup/web_signup.html',
            controller : websignupcontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup/bloodbank',{
            templateUrl : 'angular-app/web-bb-signup/web_bb_signup.html',
            controller : webbbsignupcontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup/hospital',{
            templateUrl : 'angular-app/web-hosp-signup/web_hosp_signup.html',
            controller : webhospsignupcontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup/liscenseupload',{
            templateUrl : 'angular-app/web-liscense-upload/web_liscense_upload.html',
            controller : weblisuploadcontroller   ,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup/bloodbank/user',{
            templateUrl : 'angular-app/web-gender/web_gender.html',
            controller : webgendercontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup/hospital/user',{
            templateUrl : 'angular-app/web-gender/web_gender.html',
            controller : webgendercontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup/bloodbank/user/male',{
            templateUrl : 'angular-app/web-bb-user-signup/web_bb_user_signup.html',
            controller : webbbusersignupcontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup/bloodbank/user/female',{
            templateUrl : 'angular-app/web-bb-user-signup/web_bb_user_signup.html',
            controller : webbbusersignupcontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup/hospital/user/male',{
            templateUrl : 'angular-app/web-hosp-user-signup/web_hosp_user_signup.html',
            controller : webhospusersignupcontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup/hospital/user/female',{
            templateUrl : 'angular-app/web-hosp-user-signup/web_hosp_user_signup.html',
            controller : webhospusersignupcontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup/user/details',{
            templateUrl : 'angular-app/web-user-details/web_user_details.html',
            controller : webuserdetailscontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup/user/upload',{
            templateUrl : 'angular-app/web-user-upload/web_user_upload.html',
            controller : webuseruploadcontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/signup/emailverify',{
            templateUrl : 'angular-app/emailverify/web_emailverify.html',
            controller : emailverifycontroller,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
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
            controllerAs : 'vm',
            access : {
                restricted : true
            }
        })
        .when('/bloodbank/bloodavailability',{
            templateUrl : 'angular-app/web-bb-ba/web_bb_BA.html',
            controller : webbbbacontroller,
            controllerAs : 'vm',
            access : {
                restricted : true
            }
        })
        .when('/bloodbank/donation',{
            templateUrl : 'angular-app/web-bb-donation-dash/web_bb_donation_dashboard.html',
            controller : webbbdonationdashcontroller,
            controllerAs : 'vm',
            access : {
                restricted : true
            }
        })
        .when('/bloodbank/donationlist',{
            templateUrl : 'angular-app/web-bb-donation-list/web_bb_donation_list.html',
            controller : webbbdonationlistcontroller,
            controllerAs : 'vm',
            access : {
                restricted : true
            }
        })
        .when('/bloodbank/donate',{
            templateUrl : 'angular-app/web-bb-donate/web_bb_donate.html',
            controller : webbbdonatecontroller,
            controllerAs : 'vm',
            access : {
                restricted : true
            }
        })
        .when('/login/hospital',{
            templateUrl : 'angular-app/web-hosp-login/web_hosp_login.html',
            controller : webhosplogincontroller,
            controllerAs : 'vm'
        })
        .when('/hospital/dashboard',{
            templateUrl : 'angular-app/web-hosp-dashboard/web_hosp_dashboard.html',
            controller : webhospdashboardcontroller,
            controllerAs : 'vm',
            access : {
                restricted : true
            }
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
    // window.addEventListener("unload", function(event) {
    //     localStorage.clear();
    // });
}

function run($rootScope,$location,AuthFactory){
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !localStorage.getItem('token') && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/login');
        }
    });
}
