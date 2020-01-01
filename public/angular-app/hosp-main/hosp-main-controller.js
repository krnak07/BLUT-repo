angular.module('bbApp')
.controller('mainhospcontroller',mainhospcontroller);

function mainhospcontroller($http,$routeParams,$location) {
  var vm = this;
  if(!hosp_id==''){
    $http.get('/api/hospital/'+hosp_id+'/test').then(function(response) {
      vm.dat = response.data._id;
      vm.name = response.data.name;
      vm.phone = response.data.phoneNo;
      vm.email = response.data.email;
      vm.license = response.data.liscense;
    })
    .catch(function(error){
      if(error.status == 404){
        alert('login again');
        $location.path('/hospital');
      }
    });
  }
  else{
    alert('login again');
    $location.path('/hospital');
  }



}
