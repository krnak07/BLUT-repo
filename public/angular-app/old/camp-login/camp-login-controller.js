angular.module('bbApp')
    .controller('camplogincontroller',camplogincontroller);

function camplogincontroller ($http,$location){
    var vm = this;
    vm.login = function(){
        var postdata = {
            email : vm.u_input,
            password : vm.p_input
        };

        if (vm.loginForm.$valid){

            $http.post('/api/bloodbank/login',postdata)
                .then(function(response){
                    if(response.status == 200){
                        sessionStorage.setItem('bank_id',response.data._id);
                        sessionStorage.setItem('bank_name',response.data.name);
                        $location.path('/camp/selection');
                    }

                })
                .catch(function(err){
                    alert(err.data.code);
                });
        }
        else {
            console.log('Invalid Form');
        }


    };
}
