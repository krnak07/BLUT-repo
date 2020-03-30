angular.module('bbApp')
    .controller('campmainconntroller',campmainconntroller);

function campmainconntroller($http,$location,$routeParams){
    var vm = this;
    sessionStorage.setItem('camp_id',$routeParams.id);
    bank_id = sessionStorage.getItem('bank_id');
    id = sessionStorage.getItem('camp_id')

    if(!bank_id==''){
        $http.get('/api/bloodbank/'+bank_id+'/camps/'+id)
            .then(function(response){
                vm.bank_name = response.data.bloodbank;
                vm.camp_name = response.data.name;
            });

    }
    else{
        alert('Login Again !');
        $location.path('/camp')
    }

    vm.BA = function () {
        $location.path('/camp/'+id+'/blood_availability');

    };
    vm.donation = function () {
        $location.path('/camp/'+id+'/donation');

    };
    vm.goHome = function () {
        $location.path('/camp/'+id);

    };
    vm.refres = function () {
        console.log('refresh');

    }
}