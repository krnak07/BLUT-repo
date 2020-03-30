angular.module('bbApp')
    .controller('bbsignupcontroller',bbsignupcontroller);

function bbsignupcontroller($http,$location,$routeParams){
    var vm = this;

    vm.isloading = false;
    vm.signup = function() {
        vm.isloading=true;
        if (vm.loginForm.$valid) {
            var postdata = {
                name: vm.name,
                addr: vm.address,
                city: vm.city,
                state: vm.state,
                phoneNo: vm.phone,
                email: vm.email,
                password:vm.password,
            };
            $http.post('/api/bloodbank/signup',postdata)
                .then(function (response) {
                    if(response.status==201){
                        var file = document.getElementById('lis_upload').files[0];
                        var storageref = firebase.storage().ref('/bloodbank-lis/'+vm.name+'-liscense-file.jpg');

                        storageref.put(file)
                            .then(function(snapshot){
                                vm.isloading=false;
                                alert('bloodbank created');
                            })
                            .catch(function(error){
                                vm.isloading=false;
                                console.log(error);
                            })
                    }
                    else if(response.status == 200){
                        vm.isloading=false;
                        alert('User Already Exists');
                    }

                    else if(response.status == 400) {
                        vm.isloading=false;
                        alert('error');
                    }
                    else{
                        vm.isloading=false;
                        alert('ERROR');
                    }


                })
                .catch(function (err) {
                    vm.isloading=false;
                    alert(err.data.code);

                });

        } else {
            vm.isloading=false;
            alert('empty');
        }
    }

}