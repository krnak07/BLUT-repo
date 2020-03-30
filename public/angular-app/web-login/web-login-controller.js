angular.module('bbApp')
    .controller('weblogincontroller',weblogincontroller);

function weblogincontroller($location){
    var vm = this;
    document.getElementById('web_login').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        document.getElementById('web_login').style.visibility = 'visible';
    });
    vm.hosp = function(){
        $location.path('/login/hospital');
    };
    vm.bb = function(){
        $location.path('/login/bloodbank');
    };
    vm.camps = function(){
        $location.path('/login/camps');
    };

    //button-animation
    vm.hospchange = function(){
        document.getElementById("Rectangle_46").style.fill='rgba(49,49,49,1)';
        document.getElementById('HOSPITALS').style.color = 'rgba(255,255,255,1)';
    };
    vm.hospori = function(){
        document.getElementById("Rectangle_46").style.fill='rgba(245,245,245,1)';
        document.getElementById('HOSPITALS').style.color = 'rgba(49,49,49,1)';
    };
    vm.bbchange = function(){
        document.getElementById("Rectangle_47").style.fill='rgba(49,49,49,1)';
        document.getElementById('BLOODBANK').style.color = 'rgba(255,255,255,1)';
    };
    vm.bbori = function(){
        document.getElementById("Rectangle_47").style.fill='rgba(245,245,245,1)';
        document.getElementById('BLOODBANK').style.color = 'rgba(49,49,49,1)';
    };
    vm.campchange = function(){
        document.getElementById("Rectangle_53").style.fill='rgba(49,49,49,1)';
        document.getElementById('CAMPS').style.color = 'rgba(255,255,255,1)';
    };
    vm.campori = function(){
        document.getElementById("Rectangle_53").style.fill='rgba(245,245,245,1)';
        document.getElementById('CAMPS').style.color = 'rgba(49,49,49,1)';
    };

}