angular.module('bbApp')
    .controller('testc',testc);


function testc($http,$location,$routeParams) {
    var vm = this;
    var a = document.getElementById("imgShow");
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


        //download
        var storage = firebase.storage();
        var pathReference = storage.ref('bloodbank-lis/Test-liscense-file.jpg');
        pathReference.getDownloadURL().then(function(url) {
            document.getElementById("imgShow").innerHTML+= '<img src="'+url+'">';
        })
            .catch(function(error) {
                console.log('error');
        });
    };





    //$http.post
}