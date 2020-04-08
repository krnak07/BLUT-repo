angular.module('bbApp')
    .controller('bbBAcontroller',bbBAcontroller);

function bbBAcontroller($http,$location,$routeParams){
    var vm = this;
    vm.bank_name = sessionStorage.getItem('bank_name');
    var id = sessionStorage.getItem('id');

    $http.get('/api/bloodbank/'+id)
        .then(function(response){
            vm.aneg = response.data.BloodAvailability[1].quantity;
            vm.apos = response.data.BloodAvailability[0].quantity;
            vm.bneg = response.data.BloodAvailability[3].quantity;
            vm.bpos = response.data.BloodAvailability[2].quantity;
            vm.abneg = response.data.BloodAvailability[7].quantity;
            vm.abpos = response.data.BloodAvailability[6].quantity;
            vm.oneg = response.data.BloodAvailability[5].quantity;
            vm.opos = response.data.BloodAvailability[4].quantity;

        });

    vm.donation = function(){
        $location.path('/bloodbank/donation');
    };

    vm.goHome = function () {
        $location.path('/bloodbank/home');

    };

    vm.camp = function(){
        $location.path('/bloodbank/camp');
    }

}