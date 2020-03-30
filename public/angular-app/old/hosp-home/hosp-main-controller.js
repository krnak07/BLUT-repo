angular.module('bbApp')
    .controller('mainhospcontroller',mainhospcontroller);

function mainhospcontroller($http,$routeParams,$location) {
    var vm = this;
    var id = sessionStorage.getItem('hosp_id');
    vm.hosp_name = sessionStorage.getItem('hosp_name');

    if(!id==''){
        $http.get('/api/hospital/'+id+'/test')
            .then(function(response){
                sessionStorage.setItem('hospname',response.data.name);
            })
            .catch(function(err){
                console.log(err);
            })

    }
    else{
        alert('Login Again');
        $location.path('/hospital');
    }

    vm.donation = function () {
        $location.path('/hospital/donation');
    };
    vm.BB = function () {
        $location.path('/hospital/bloodbanks');
    };
    vm.donor = function () {
       $location.path('/hospital/donor');
    };
    vm.request = function(){
        $location.path('/hospital/request');
    };
    vm.goHome = function () {
        $location.path('/hospital/home');
    };
    vm.refres = function () {
        console.log('refresh');
    };

}