angular.module('bbApp')
.controller('hosplogincontroller',hosplogincontroller);

function hosplogincontroller($route,$http,$location) {
  var vm = this;
  vm.login = function(){
    var postdata = {
      email : vm.u_input,
      password : vm.p_input
    };

  if (vm.loginForm.$valid){

    $http.post('/api/hospitals/login',postdata)
    .then(function(response){
      if(response.status == 200){
        sessionStorage.setItem('hosp_name',response.data.name);
        sessionStorage.setItem('hosp_id',response.data._id);
        $location.path('/hospital/home');
      }

    })
    .catch(function(err){
      alert(err.data.code);
    });
  }
  else {
    alert("error loggin in");
  }


  };
}
