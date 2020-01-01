angular.module('bbApp')
.controller('mainbbcontroller',mainbbcontroller);

function mainbbcontroller($http,$routeParams,$location) {
  var vm = this;
  var id = $routeParams.bankID;
  if(!bb_id==''){
    $http.get('/api/bloodbank/'+bb_id+'/test').then(function(response) {
      vm.dat = response.data._id;
      vm.name = response.data.name;
      vm.phone = response.data.phoneNo;
      vm.email = response.data.email;
      vm.license = response.data.liscense;
    })
    .catch(function(error){
      if(error.status == 404){
        alert('login again');
        $location.path('/bloodbank');
      }
    });
  }
  else{
    alert('login again');
    $location.path('/bloodbank');
  }
}
