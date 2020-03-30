angular.module('bbApp')
.controller('maincontroller',maincontroller);

function maincontroller($location){
  var vm = this;
  const msg = firebase.messaging();
  msg.onMessage(function(payload){
    console.log("onMessage",payload);
  });
  vm.bloodbank = function(){
    $location.path('/bloodbank');
  };
  vm.hospital = function(){
    $location.path('/hospital');
  };
  vm.camps = function(){
    $location.path('/camp');
  };
}
