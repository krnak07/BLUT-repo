angular.module('bbApp')
    .controller('bbsignupcontroller',bbsignupcontroller);

function bbsignupcontroller($http,$location,$routeParams){
    var vm = this;
    vm.signup = function() {
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
                                alert('bloodbank created');

                            })
                            .catch(function(error){
                                console.log(error);
                            })
                    }
                    else if(response.status == 200){
                        alert('User Already Exists');
                    }

                    else if(response.status == 400) {
                        alert('error');
                    }
                    else
                        alert('ERROR');

                })
                .catch(function (err) {
                    alert(err.data.code);

                });

        } else {
            alert('empty');
        }
    }

}