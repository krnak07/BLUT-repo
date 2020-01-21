angular.module('bbApp')
    .controller('testc',testc);


function testc($http,$location,$routeParams) {
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

    vm.login = function(){
       var file = document.getElementById('myfile').files[0];
        var storageref = firebase.storage().ref('/bloodbank-lis/kiran.jpg');

                storageref.put(file)
                    .then(function(snapshot){
                        console.log(snapshot);

                    })
                    .catch(function(error){
                        console.log(error);
                    })


    };

    const msg = firebase.messaging();
    msg.usePublicVapidKey('BDnKskUcVoeK8-w_mMStz6Dx5L2Yye1vN-J1sQZvecgb6cKIJjunsjjOjaBwybzI8BrT8r4ZLdI8-j1o6XIVDaU');
    Notification.requestPermission()
        .then(function(permission){
            if(permission == 'granted'){
                console.log('Permission granted')
                return msg.getToken();
            }
            else{
                console.log('unable to get permission');
            }
        })
        .then(function(token){
            console.log(token);
        })
    msg.onMessage(function(payload){
        console.log(payload);
    })


    //$http.post
}