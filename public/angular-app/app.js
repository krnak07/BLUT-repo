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
    controller : logincontroler,
    controllerAs : 'vm'
  })
  .when('/bloodbank/:bankID',{
    templateUrl : 'angular-app/bb-main/bb-main.html',
    controller : mainbbcontroller,
    controllerAs: 'vm'
  })
  .when('/list', {
    templateUrl : 'angular-app/bb-list/bb-list.html',
    controller : listcontroller,
    controllerAs: 'vm'
  });

}
