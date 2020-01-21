angular.module('bbApp')
    .controller('bbsignupcontroller',bbsignupcontroller);

function bbsignupcontroller($http,$location,$routeParams){
    var vm = this;
    const firebaseConfig = {
        apiKey: "AIzaSyARrRzk-qumZ7fAHD6y9NpTrEaT2q8lD5k",
        authDomain: "blut-110799.firebaseapp.com",
        databaseURL: "https://blut-110799.firebaseio.com",
        projectId: "blut-110799",
        storageBucket: "blut-110799.appspot.com",
        messagingSenderId: "715930854454",
        appId: "1:715930854454:web:b4f14841505dee51"
    };
    firebase.initializeApp(firebaseConfig);
    vm.name = '' ;
    vm.email == '' ;
    vm.password == '' ;
    vm.phone == '' ;
    vm.address == '';
    vm.city == '' ;
    vm.state == '';
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