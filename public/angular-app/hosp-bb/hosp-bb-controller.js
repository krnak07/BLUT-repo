angular.module('bbApp')
    .controller('hospbbcontroller',hospbbcontroller);

function hospbbcontroller($http,$routeParams,$location,$route){
    var vm = this;
    var hosp_id = sessionStorage.getItem('hosp_id');
    vm.hosp_name = sessionStorage.getItem('hosp_name');
    $http.get('/api/hospitals/'+hosp_id+'/get_nearbyBB')
        .then(function (response) {
            vm.dat=response.data;
        });

    vm.donation = function () {
        $location.path('/hospital/donation');
    };
    vm.donor = function(){
        $location.path('/hospital/donor');
    };
    vm.goHome = function () {
        $location.path('/hospital/home');
    };
    vm.refres = function () {
        console.log('refresh');
    };
}