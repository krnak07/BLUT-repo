angular.module('bbApp')
    .controller('testc',testc);


function testc($http,$location,$routeParams) {
    var vm = this;
    vm.login = function(){
        /*
       var file = document.getElementById('myfile').files[0];
        var storageref = firebase.storage().ref('/bloodbank-lis/kiran.jpg');

                storageref.put(file)
                    .then(function(snapshot){
                        console.log(snapshot);

                    })
                    .catch(function(error){
                        console.log(error);
                    })*/

        /*$http.get('/api/bloodbank/test')
            .then(function(response){
                console.log(response.data);
            })
            .catch(function(err){
                console.log(err)
            })*/






    };





    //$http.post
}