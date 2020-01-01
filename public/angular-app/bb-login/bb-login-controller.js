angular.module('bbApp')
.controller('logincontroller',logincontroller);

function logincontroller($route,$http,$location) {
  var vm = this;

  vm.login = function(){
    var postdata = {
      email : vm.u_input,
      password : vm.p_input
    };

  if (vm.loginForm.$valid){

    $http.post('/api/bloodbank/login',postdata)
    .then(function(response){
      if(response.status == 200){
        vm.bank = response.data._id;
        bb_id = vm.bank;
        $location.path('/bloodbank/home');
      }

    })
    .catch(function(err){
      alert(err.data.code);
    });
  }
  else {
    console.log('Invalid Form');
  }


  };
}
