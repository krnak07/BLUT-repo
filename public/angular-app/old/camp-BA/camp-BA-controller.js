angular.module('bbApp')
    .controller('campBAcontroller',campBAcontroller);

function campBAcontroller($http,$location,$routeParams){
    var vm = this;

    var camp_id = sessionStorage.getItem('camp_id');
    var bank_id = sessionStorage.getItem('bank_id');


    $http.get('/api/bloodbank/'+bank_id+'/camps/'+camp_id)
        .then(function(response){
            sessionStorage.setItem('camp_name',response.data.name);
            sessionStorage.setItem('bank_name',response.data.bloodbank);
            vm.camp_name = response.data.name;
            vm.aneg = response.data.BloodAvailability[1].quantity;
            vm.apos = response.data.BloodAvailability[0].quantity;
            vm.bneg = response.data.BloodAvailability[3].quantity;
            vm.bpos = response.data.BloodAvailability[2].quantity;
            vm.abneg = response.data.BloodAvailability[7].quantity;
            vm.abpos = response.data.BloodAvailability[6].quantity;
            vm.oneg = response.data.BloodAvailability[5].quantity;
            vm.opos = response.data.BloodAvailability[4].quantity;
            vm.bank_name = response.data.bloodbank;

        })
        .catch(function (err) {
            alert('Login Again');
            $location.path('/camp');
        });

    vm.donation = function(){
        $location.path('/camp/'+camp_id+'/donation');
    };

    vm.goHome = function () {
        $location.path('/camp/'+camp_id);

    };
    vm.refres = function () {
        console.log('refresh');

    }
}