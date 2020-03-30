angular.module('bbApp')
    .controller('webuseruploadcontroller',webuseruploadcontroller);

function webuseruploadcontroller($location,$http){
    var vm = this;
    vm.isloading=false;
    var k=-1;

    if(sessionStorage.getItem('gender') == null){
        $location.path('/signup/bloodbank/user');
    }


    vm.uploadd = function () {
        vm.isloading=true;
        var id_file = document.getElementById('id_upload').files[0];
        var propic_file = document.getElementById('propic_upload').files[0];
        var IDstorageref = firebase.storage().ref('/bloodbank-user-ID/'+sessionStorage.getItem('bbname')+'/'+sessionStorage.getItem('userfname')+'.jpg');
        var proPICstorageref = firebase.storage().ref('/bloodbank-user-PIC/'+sessionStorage.getItem('bbname')+'/'+sessionStorage.getItem('userfname')+'.jpg');

        IDstorageref.put(id_file)
            .then(function(snapshot){
                proPICstorageref.put(propic_file)
                    .then(function(snapshot){
                        window.location.href = '/';
                    })
                    .catch(function (error) {

                    });

            })
            .catch(function (error) {
                console.log(error);
            });






    }
}