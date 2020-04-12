angular.module('bbApp')
    .controller('webbbdashboardcontroller',webbbdashboardcontroller);
function webbbdashboardcontroller($location,$scope,$window) {
    var vm = this;
    vm.iswaiting = true;
    if (localStorage.getItem('bbusername') == null) {
        $location.path('/login/bloodbank');
    }
    document.getElementById('web_bb_dashboard').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        window.setTimeout(showall, 1000);
    });

    function showall() {
        if (document.readyState == 'complete') {
            document.getElementById('web_bb_dashboard').style.visibility = 'visible';
            vm.iswaiting = false;
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


    vm.bb_donations = function () {
        $location.path('/bloodbank/donation');
    };
    vm.bb_requests = function () {
        $location.path('/bloodbank/requests');
    };
    vm.bb_ba = function () {
        $location.path('/bloodbank/bloodavailability');
    };

    //button-animation
    vm.donationchange = function () {
        document.getElementById('Rectangle_53').style.fill = "rgba(225,83,83,1)";
    };
    vm.donationori = function () {
        document.getElementById('Rectangle_53').style.fill = "rgba(255,255,255,1)";
    };
    vm.requestschange = function () {
        document.getElementById('Rectangle_47').style.fill = "rgba(225,83,83,1)";
    };
    vm.requestsori = function () {
        document.getElementById('Rectangle_47').style.fill = "rgba(255,255,255,1)";
    };
    vm.bachange = function () {
        document.getElementById('Rectangle_46').style.fill = "rgba(225,83,83,1)";
    };
    vm.baori = function () {
        document.getElementById('Rectangle_46').style.fill = "rgba(255,255,255,1)";
    };
    //user panel
    vm.showuser = function () {
        vm.userShow = true;
    };
    vm.hideuser = function () {
        vm.userShow = false;
    };
    vm.logout = function () {
        var now = new Date();
        now.setMonth(now.getFullYear() + 24);
        document.cookie = "bbuserloggedout=1" + ";expires=" + now.toUTCString() + "; path=/";
        localStorage.removeItem('bbemail');
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