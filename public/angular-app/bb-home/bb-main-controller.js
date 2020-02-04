angular.module('bbApp')
.controller('mainbbcontroller',mainbbcontroller);

function mainbbcontroller($http,$routeParams,$location) {
  var vm = this;
  var id = sessionStorage.getItem('id');
  vm.name = sessionStorage.getItem('bank_name');
  if(!id==''){
    var postdata = {
      name : vm.name,
      toke : sessionStorage.getItem('toke')
    };
    $http.post('/api/bloodbank/tokenregister',postdata).then(function(){});

    $http.get('/api/bloodbank/'+id).then(function(response) {
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
    $location.path('/bloodbank/blood_availability');
  };

  vm.donation = function(){
    $location.path('/bloodbank/donation');
  };

  vm.camp = function(){
    $location.path('/bloodbank/camp');
  };

  vm.goHome = function(){
    $location.path('/bloodbank/home');
  };
  vm.refres = function(){
    console.log('refreh');
  };
}
