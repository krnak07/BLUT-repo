angular.module('bbApp')
.controller('logincontroler',logincontroler);

function logincontroler($route,$http,$location) {
  var vm = this;

  vm.login = function(){
    var postdata = {
      email : vm.u_input,
      password : vm.p_input
    };

  if (vm.loginForm.$valid){

    $http.post('/api/bloodbank/login',postdata)
    .then(function(response){
      console.log(response);
      if(response.status == 200){
        vm.bank = response.data._id;
        $location.path('/bloodbank/'+vm.bank);
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
