angular.module('bbApp')
.controller('mainbbcontroller',mainbbcontroller);

function mainbbcontroller($http,$routeParams) {
  var vm = this;
  var id = $routeParams.bankID;

  $http.get('/api/bloodbank/'+id+'/test').then(function(response) {
    vm.dat = response.data._id;
    vm.name = response.data.name;
    vm.phone = response.data.phoneNo;
    vm.email = response.data.email;
    vm.license = response.data.liscense;
  })
  .catch(function(error){
    console.log(error);
  });
}
