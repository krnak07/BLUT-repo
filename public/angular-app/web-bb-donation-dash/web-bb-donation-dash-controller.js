angular.module('bbApp')
    .controller('webbbdonationdashcontroller',webbbdonationdashcontroller);
function webbbdonationdashcontroller($location,$scope) {
    var vm = this;
    document.getElementById('web_bb_donation_dashboard').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        window.setTimeout(showall, 1000);
    });
    function showall() {
        if (document.readyState == 'complete') {
            document.getElementById('web_bb_donation_dashboard').style.visibility = 'visible';
        }
    }

    vm.userShow = false;
    vm.bbname = localStorage.getItem('bbname');
    vm.bbusername = localStorage.getItem('bbusername');
    var IDstorageref = firebase.storage().ref('/bloodbank/' + vm.bbname + '/USER-PHOTO/' + vm.bbusername + '.jpg');
    IDstorageref.getDownloadURL()
        .then(function (url) {
            document.getElementById("user_info_disp").innerHTML += '<img id="pro_pic" src="' + url + '">';
            //window.setTimeout(welcomehide(),2000);
        })
        .catch(function (error) {
            console.log('error');
        });
    vm.donationchange = function () {
        document.getElementById('Rectangle_53').style.fill = "rgba(225,83,83,1)";
    };
    vm.donationori = function () {
        document.getElementById('Rectangle_53').style.fill = "rgba(255,255,255,1)";
    };

    //user panel
    vm.bb_donations = function () {
        sessionStorage.setItem('len','0');
        $location.path('/bloodbank/donationlist');
    };
    vm.bb_requests = function () {
        $location.path('/bloodbank/requests');
    };
    vm.bb_ba = function () {
        $location.path('/bloodbank/bloodavailability');
    };
    vm.bb_ndonation = function(){
        sessionStorage.setItem('donate','n');
        sessionStorage.setItem('donation','n');
        $location.path('/bloodbank/donate');
    };
    vm.bb_sdonation = function(){
        sessionStorage.setItem('donate','s');
        sessionStorage.setItem('donation','n');
        $location.path('/bloodbank/donate');
    };
    vm.showdash = function () {
        vm.dashShow = true;
    };
    vm.hidedash = function () {
        vm.dashShow = false;
    };
    vm.showuser = function () {
        vm.userShow = true;
    };
    vm.hideuser = function () {
        vm.userShow = false;
    };
    vm.goHome = function(){
        $location.path('/bloodbank/dashboard');
    };
    vm.logout = function () {
        var now = new Date();
        now.setMonth(now.getFullYear() + 24);
        document.cookie = "bbuserloggedout=1" + ";expires=" + now.toUTCString() + "; path=/";
        localStorage.removeItem('token');
        localStorage.removeItem('bbname');
        localStorage.removeItem('bbuseremail');
        localStorage.removeItem('bbusername');
        $location.path('/login/bloodbank');
    };
    vm.about = function () {
        $location.path('/about');
    };
    vm.setting = function () {
        $location.path('/bloodbank/settings')
    };
    vm.logoutchange = function () {
        document.getElementById('logout_rect').style.fill = "rgba(228,228,228,1)";
    };
    vm.logoutori = function () {
        document.getElementById('logout_rect').style.fill = "rgba(255,255,255,1)";
    };
    vm.aboutchange = function () {
        document.getElementById('about_rect').style.fill = "rgba(228,228,228,1)";
    };
    vm.aboutori = function () {
        document.getElementById('about_rect').style.fill = "rgba(255,255,255,1)";
    };
    vm.settingchange = function () {
        document.getElementById('setting_rect').style.fill = "rgba(228,228,228,1)";
    };
    vm.settingori = function () {
        document.getElementById('setting_rect').style.fill = "rgba(255,255,255,1)";
    };

}