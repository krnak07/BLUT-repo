angular.module('bbApp')
    .controller('webuseruploadcontroller',webuseruploadcontroller);

function webuseruploadcontroller($location,$http){
    var vm = this;
    vm.isloading=false;
    document.getElementById('web_user_upload').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        document.getElementById('web_user_upload').style.visibility = 'visible';
    });


    if(sessionStorage.getItem('gender') == null){
        $location.path('/signup/'+sessionStorage.getItem('type')+'/user');
    }


    vm.uploadd = function () {
        vm.isloading=true;
        var id_file = document.getElementById('id_upload').files[0];
        var propic_file = document.getElementById('propic_upload').files[0];
        var IDstorageref = firebase.storage().ref('/'+sessionStorage.getItem('type')+'/'+sessionStorage.getItem('typename')+'/USER-IDs/'+sessionStorage.getItem('userfname')+'.jpg');
        var proPICstorageref = firebase.storage().ref('/'+sessionStorage.getItem('type')+'/'+sessionStorage.getItem('typename')+'/USER-PHOTO/'+sessionStorage.getItem('userfname')+'.jpg');


        IDstorageref.put(id_file)
            .then(function(snapshot){
                proPICstorageref.put(propic_file)
                    .then(function(snapshot){
                        sessionStorage.removeItem('userfname');
                        sessionStorage.removeItem('typename');
                        window.location.href = '/signup/emailverify';
                    })
                    .catch(function (error) {

                    });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}