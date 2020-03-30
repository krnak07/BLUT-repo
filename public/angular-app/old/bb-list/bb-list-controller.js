angular.module('bbApp')
.controller('listcontroller',listcontroller);

function listcontroller($http) {
  var vm = this;
  $http.get('/api/bloodbank').then(function(response) {
    vm.dat = response.data[0];
    alert('This is sample');
  })
  .catch(function(error){
    console.log(error);
  });
}
