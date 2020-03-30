angular.module('bbApp')
    .controller('websignupcontroller',websignupcontroller);

function websignupcontroller($location) {
    var vm = this;
    document.getElementById('web_signup').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        document.getElementById('web_signup').style.visibility = 'visible';
    });


    vm.hosp = function(){
        sessionStorage.setItem('type','hospital');
        $location.path('/signup/hospital/user');
    };
    vm.bb = function(){
        sessionStorage.setItem('type','bloodbank');
        $location.path('/signup/bloodbank/user');
    };

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
}