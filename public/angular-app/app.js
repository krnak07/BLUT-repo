angular.module('bbApp',['ngRoute'])
.config(config);

function config($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'angular-app/main/web_main.html',
    controller : maincontroller,
    controllerAs: 'vm'
  })
  .when('/bloodbank', {
    templateUrl : 'angular-app/bb-login/web_login.html',
    controller : logincontroller,
    controllerAs : 'vm'
  })
  .when('/bloodbank/home',{
    templateUrl : 'angular-app/bb-main/bb-main.html',
    controller : mainbbcontroller,
    controllerAs: 'vm'
  })
  .when('/bloodbank/list', {
    templateUrl : 'angular-app/bb-list/bb-list.html',
    controller : listcontroller,
    controllerAs: 'vm'
  })
  .when('/hospital', {
    templateUrl : 'angular-app/hosp-login/web_hosp_login.html',
    controller : hosplogincontroller,
    controllerAs : 'vm'
  })
  .when('/hospital/:hospID', {
    templateUrl : 'angular-app/hosp-main/web_hosp_home.html',
    controller : mainhospcontroller,
    controllerAs: 'vm'
  })




}
