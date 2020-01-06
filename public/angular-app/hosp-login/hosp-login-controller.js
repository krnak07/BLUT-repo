angular.module('bbApp')
.controller('hosplogincontroller',hosplogincontroller);

function hosplogincontroller($route,$http,$location) {
  var vm = this;
  vm.login = function(){
    var postdata = {
      email : vm.u_input,
      password : vm.p_input
    };
    console.log(postdata);

  if (vm.loginForm.$valid){

    $http.post('/api/hospitals/login',postdata)
    .then(function(response){
      if(response.status == 200){
        vm.hosp = response.data._id;
        hosp_usr = 'true';
        hosp_id = vm.hosp;
        $location.path('/hospital/home');
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
