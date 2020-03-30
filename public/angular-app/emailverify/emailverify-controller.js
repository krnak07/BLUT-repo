angular.module('bbApp')
    .controller('emailverifycontroller',emailverifycontroller);

function emailverifycontroller($location,$http) {
    var vm = this;

    document.getElementById('web_emailverify').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        document.getElementById('web_emailverify').style.visibility = 'visible';
    });
    if(sessionStorage.getItem('email') == null){
        $location.path('/signup');
    }

    vm.useremail = sessionStorage.getItem('email');
    sessionStorage.removeItem('email');
    vm.login = function(){
        $location.path('/login');
    };
    vm.signup = function(){
        $location.path('/signup');
    };

    //button-animation
    vm.login_change = function(){
        document.getElementById("Rectangle_4").style.fill='rgba(245,245,245,1)';
    };
    vm.login_ori = function(){
        document.getElementById("Rectangle_4").style.fill='rgba(255,255,255,1)';
    };
    vm.signup_change = function(){
        document.getElementById("Rectangle_4_db").style.fill='rgba(245,245,245,1)';
    };
    vm.signup_ori = function(){
        document.getElementById("Rectangle_4_db").style.fill='rgba(248,223,0,1)';
    };
}