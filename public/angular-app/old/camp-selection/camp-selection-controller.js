angular.module('bbApp')
    .controller('campselectioncontroller',campselectioncontroller);

function campselectioncontroller($location,$http,$routeParams){
    var vm = this;
    vm.bank_name = sessionStorage.getItem('bank_name');
    var id = sessionStorage.getItem('bank_id');
    if(!id==''){
        $http.get('/api/bloodbank/'+id+'/allcamps')
            .then(function(response){
            vm.data = response.data;
            });

    }
    else{
        alert('Login Again !');
        $location.path('/camp')
    }
}
