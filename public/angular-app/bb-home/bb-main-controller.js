angular.module('bbApp')
.controller('mainbbcontroller',mainbbcontroller);

function mainbbcontroller($http,$routeParams,$location) {
  var vm = this;
  var id = sessionStorage.getItem('id');
  if(!id==''){
    $http.get('/api/bloodbank/'+id+'/test').then(function(response) {
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


  vm.ba = function(){
    console.log('ba');
  };

  vm.donation = function(){
    $location.path('/bloodbank/donation');
  };

  vm.camp = function(){
    console.log('camp');
  };

  vm.goHome = function(){
    $location.path('/bloodbank/home');
  };
  vm.refres = function(){
    console.log('refreh');
  };
}
