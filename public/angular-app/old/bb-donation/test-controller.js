angular.module('bbApp')
    .controller('testcontroller',testcontroller);

function testcontroller($http,$location,$route){
    var vm = this;
    $http.get('/api/bloodbank/5e194569c0edf13b3c684906/test')
        .then(function(response) {
        vm.dat = response.data.donordonationhistory;
        vm.name = response.data.name;
        vm.phone = response.data.phoneNo;
        vm.email = response.data.email;
        vm.license = response.data.liscense;
    });

    vm.Okay = function(){
        $route.reload();
    }
}