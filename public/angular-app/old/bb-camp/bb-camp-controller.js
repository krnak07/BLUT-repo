angular.module('bbApp')
    .controller('bbcampcontroller',bbcampcontroller);

function bbcampcontroller($http,$routeParams,$location) {
    var vm = this;
    vm.da = [];
    vm.bank_name = sessionStorage.getItem('bank_name');
    var id = sessionStorage.getItem('id');
    $http.get('/api/bloodbank/'+id+'/allcamps')
        .then(function(response) {
            vm.dat = response.data;
            var i = 0;
            for( i =0;i<response.data.length;i++){
                var d = new Date(vm.dat[i].dateofhost);
                vm.da[i] = d.toLocaleDateString('en-US');
            }

    });

    vm.ba = function(){
        $location.path('/bloodbank/blood_availability');
    };

    vm.donation = function(){
        $location.path('/bloodbank/donation');
    };

    vm.goHome = function(){
        $location.path('/bloodbank/home');
    };
    vm.refres = function(){
        console.log('refreh');
    };
    vm.create = function(){
        $location.path('/bloodbank/camp/create')
    }
}