angular.module('bbApp')
    .controller('webhospdashboardcontroller',webhospdashboardcontroller);
function webhospdashboardcontroller($location) {
    var vm= this;
    vm.waitingg=true;
    document.getElementById('web_hosp_dashboard').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        window.setTimeout(showall(),3000);
    });

    function showall(){
        vm.waitingg = false;
        document.getElementById('web_hosp_dashboard').style.visibility = 'visible';
    }



    vm.userShow = false;
    vm.hospname = sessionStorage.getItem('hospname');
    vm.username = sessionStorage.getItem('username');
    var IDstorageref = firebase.storage().ref('/hospital/'+vm.hospname+'/USER-PHOTO/'+vm.username+'.jpg');
    IDstorageref.getDownloadURL()
        .then(function(url) {
            document.getElementById("user_info_disp").innerHTML+= '<img id="pro_pic" src="'+url+'">';
            //window.setTimeout(welcomehide(),2000);
        })
        .catch(function(error) {
            console.log('error');
        });




    //button-animation
    vm.showuser = function(){
        vm.userShow = true;
    };
    vm.hideuser = function(){
        vm.userShow = false;
    };
    vm.logout = function(){
        var now = new Date();
        now.setMonth( now.getFullYear() + 24 );
        document.cookie ="hosploggedout=1"+";expires=" + now.toUTCString() + ";";
        $location.path('/login/hospital');
    };
    vm.about = function(){
        $location.path('/about');
    };
    vm.setting = function(){
        $location.path('/hospital/settings')
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
}
