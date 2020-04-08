angular.module('bbApp')
    .controller('campcreatecontroller',campcreatecontroller);

function campcreatecontroller($http,$location,$routeParams){
    var vm=this;
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
    var bank_id = sessionStorage.getItem('id');
    vm.create = function(){
        if(vm.createForm.$valid){
            var postdata = {
                name : vm.name,
                location : vm.addr,
                dof: vm.date,
                phoneNo : vm.phone
            };
            $http.post('/api/bloodbank/'+bank_id+'/camp_new',postdata)
                .then(function (response) {
                    var file = document.getElementById('lis_upload').files[0];
                    var storageref = firebase.storage().ref('/camp-lis/'+vm.name+'-liscense-file.jpg');

                    storageref.put(file)
                        .then(function(snapshot){
                            alert('CAMP created');
                            $location.path('/bloodbank/camp');

                        })
                        .catch(function(error){
                            console.log(error);
                        })


                })
                .catch(function (err) {
                    alert('error');
                })
        }
    }

}