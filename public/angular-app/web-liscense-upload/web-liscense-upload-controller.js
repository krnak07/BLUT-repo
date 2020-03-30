angular.module('bbApp')
    .controller('weblisuploadcontroller',weblisuploadcontroller);

function weblisuploadcontroller($location,$http){
    var vm = this;
    vm.isloading=false;
    document.getElementById('web_liscense_upload').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        document.getElementById('web_liscense_upload').style.visibility = 'visible';
    });


    if(sessionStorage.getItem('email') == null){
        $location.path('/signup');
    }


    vm.lisupload = function () {
        vm.isloading=true;
        var lis_file = document.getElementById('lisupload').files[0];
        var logo_file = document.getElementById('logoupload').files[0];
        var lisstorageref = firebase.storage().ref('/'+sessionStorage.getItem('type')+'/'+sessionStorage.getItem('name')+'/LISCENSE.jpg');
        var logostorageref = firebase.storage().ref('/'+sessionStorage.getItem('type')+'/'+sessionStorage.getItem('name')+'/LOGO.jpg');


        lisstorageref.put(lis_file)
            .then(function(snapshot){
                logostorageref.put(logo_file)
                    .then(function(snapshot){
                        sessionStorage.removeItem('name');
                        sessionStorage.removeItem('type');
                        window.location.href = '/#!/signup/emailverify';
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

