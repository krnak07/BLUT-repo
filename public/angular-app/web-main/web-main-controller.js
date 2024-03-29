angular.module('bbApp')
    .controller('webmaincontroller',webmaincontroller);

function webmaincontroller($location){
    var vm = this;
    document.getElementById('web_main').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        window.setTimeout(showall(),5000);
    });
    function showall(){
        if(document.readyState == 'complete'){
            document.getElementById('web_main').style.visibility = 'visible';
        }
    }

    const msg = firebase.messaging();
    msg.onMessage(function(payload){
        console.log("onMessage",payload);
    });
    vm.logins = function(){
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
        document.getElementById("Rectangle_4_cf").style.fill='rgba(245,245,245,1)';
    };
    vm.signup_ori = function(){
        document.getElementById("Rectangle_4_cf").style.fill='rgba(248,223,0,1)';
    };
}
