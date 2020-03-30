  angular.module('bbApp')
.controller('logincontroller',logincontroller);

function logincontroller($route,$http,$location) {
  var vm = this;
  vm.isloading = false;
  var ck = document.cookie;
  console.log(ck);

  vm.login = function(){
    vm.isloading = true;
    var postdata = {
      email : vm.email_input,
      password : vm.pass_input
    };

  if (vm.loginForm.$valid){


    $http.post('/api/bloodbank/login',postdata)
    .then(function(response){
      if(response.status == 200){
        sessionStorage.setItem('id',response.data._id);
        sessionStorage.setItem('bank_name',response.data.name);
        $location.path('/bloodbank/home');
      }

    })
    .catch(function(err){
      vm.isloading=false;
      alert(err.data.code);
    });
  }
  else {
    console.log('Invalid Form');
  }
  document.getElementById()


  };
}
