angular.module('bbApp')
    .controller('webbbdashboardcontroller',webbbdashboardcontroller);
function webbbdashboardcontroller($location){
    var vm = this;
    vm.welcomeShow = true;
    vm.bbid = sessionStorage.getItem("bb_id");
    vm.bbname = sessionStorage.getItem("bb_name");
    vm.userShow = false;
    var storage = firebase.storage();
    var pathReference = storage.ref('bb-profile-pic/'+vm.bbname+'-profile-pic.jpg');

    pathReference.getDownloadURL()
        .then(function(url) {
            document.getElementById("user_info_disp").innerHTML+= '<img id="pro_pic" src="'+url+'">';
            window.setTimeout(welcomehide(),2000);
        })
        .catch(function(error) {
            console.log('error');
        });



    function welcomehide(){
        vm.welcomeShow = false;
    };


    vm.showuser = function(){
        vm.userShow = true;
    };
    vm.hideuser = function(){
        vm.userShow = false;
    };
    vm.logout = function(){
        var now = new Date();
        now.setMonth( now.getFullYear() + 24 );
        document.cookie ="bb_loggedout=1"+";expires=" + now.toUTCString() + ";";
        $location.path('/login/bloodbank');
    };
    vm.about = function(){
        $location.path('/about');
    };
    vm.setting = function(){
        $location.path('/bloodbank/settings')
    };
    vm.logoutchange = function(){
        document.getElementById('logout_rect').style.fill = "rgba(228,228,228,1)";
    };
    vm.logoutori = function(){
        document.getElementById('logout_rect').style.fill = "rgba(255,255,255,1)";
    };
    vm.aboutchange = function(){
        document.getElementById('about_rect').style.fill = "rgba(228,228,228,1)";
    };
    vm.aboutori = function(){
        document.getElementById('about_rect').style.fill = "rgba(255,255,255,1)";
    };
    vm.settingchange = function(){
        document.getElementById('setting_rect').style.fill = "rgba(228,228,228,1)";
    };
    vm.settingori = function(){
        document.getElementById('setting_rect').style.fill = "rgba(255,255,255,1)";
    };
    vm.bachange = function(){
        document.getElementById('Rectangle_46').style.fill = "rgba(49,49,49,1)";
        document.getElementById('Blood_c').style.color = "rgba(255,255,255,1)";
        document.getElementById('Availablity').style.color = "rgba(255,255,255,1)";
    };
    vm.baori = function(){
        document.getElementById('Rectangle_46').style.fill = "rgba(225,83,83,1)";
        document.getElementById('Blood_c').style.color = "rgba(49,49,49,1)";
        document.getElementById('Availablity').style.color = "rgba(49,49,49,1)";
    };
    vm.reqchange = function(){
        document.getElementById('Rectangle_47').style.fill = "rgba(49,49,49,1)";
        document.getElementById('Requests').style.color = "rgba(255,255,255,1)";
    };
    vm.reqori = function(){
        document.getElementById('Rectangle_47').style.fill = "rgba(225,83,83,1)";
        document.getElementById('Requests').style.color = "rgba(49,49,49,1)";
    };
    vm.donationchange = function(){
        document.getElementById('Rectangle_53').style.fill = "rgba(49,49,49,1)";
        document.getElementById('Donations').style.color = "rgba(255,255,255,1)";
    };
    vm.donationori = function(){
        document.getElementById('Rectangle_53').style.fill = "rgba(225,83,83,1)";
        document.getElementById('Donations').style.color = "rgba(49,49,49,1)";
    };
    vm.campchange = function(){
        document.getElementById('Rectangle_49').style.fill = "rgba(49,49,49,1)";
        document.getElementById('Camps').style.color = "rgba(255,255,255,1)";
    };
    vm.campori = function(){
        document.getElementById('Rectangle_49').style.fill = "rgba(225,83,83,1)";
        document.getElementById('Camps').style.color = "rgba(49,49,49,1)";
    };


}