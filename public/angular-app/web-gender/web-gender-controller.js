angular.module('bbApp')
    .controller('webgendercontroller',webgendercontroller);

function webgendercontroller($location){
    var vm = this;
    document.getElementById('web_gender').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        document.getElementById('web_gender').style.visibility = 'visible';
    });
    if(sessionStorage.getItem('type')==null){
        $location.path('/signup');
    }
    vm.male = function(){
        sessionStorage.setItem('gender','M');
        $location.path('/signup/'+sessionStorage.getItem('type')+'/user/male');
    };
    vm.female = function(){
        sessionStorage.setItem('gender','F');
        $location.path('/signup/'+sessionStorage.getItem('type')+'/user/female');
    };
    vm.bac = function(){
        $location.path('/signup');
    };

    //button-animation
    vm.malechange = function(){
        document.getElementById("Rectangle_46").style.fill='rgba(225,83,83,1)';
    };
    vm.maleori = function(){
        document.getElementById("Rectangle_46").style.fill='rgba(255,255,255,1)';
    };
    vm.femalechange = function(){
        document.getElementById("Rectangle_47").style.fill='rgba(225,83,83,1)';
    };
    vm.femaleori = function(){
        document.getElementById("Rectangle_47").style.fill='rgba(255,255,255,1)';
    };


}