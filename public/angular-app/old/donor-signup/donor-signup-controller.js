angular.module('bbApp')
    .controller('donorsignupcontroller',donorsignupcontroller);

function donorsignupcontroller($http,$location,$routeParams){
    var vm = this;

    vm.signup = function() {
        if (vm.loginForm.$valid) {
            var postdata = {
                fname : vm.fname,
                lname : vm.lname,
                dob : vm.date,
                email : vm.email,
                password : vm.password,
                phoneNo : vm.phone,
                addr : vm.addr,
                city : vm.city,
                state : vm.state,
                bg : vm.bg,
            };
            $http.post('/api/donor/signup',postdata)
                .then(function (response) {
                    if (response.status == 201){
                        alert('donor created')
                    }
                    else if(response.status == 200){
                        alert(response.data)
                    }
                    console.log(response);


                })
                .catch(function (err) {
                    console.log(err);

                })
        }
}}