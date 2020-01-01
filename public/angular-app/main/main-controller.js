angular.module('bbApp')
.controller('maincontroller',maincontroller);

function maincontroller($location){
  var vm = this;
  vm.bloodbank = function(){
    $location.path('/bloodbank');
  };
  vm.hospital = function(){
    $location.path('/hospital');
  };
}
