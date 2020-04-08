angular.module('bbApp')
    .controller('webbbdonatecontroller',webbbdonatecontroller);
function webbbdonatecontroller($location,$scope,$http) {
    var vm = this;
    vm.isloading = false;
    vm.is_snr=false;
    vm.is_unf=false;
    vm.is_es=false;
    vm.is_ds=false;
    vm.is_cd=false;
    function hideerror(){
        vm.is_snr=false;
        vm.is_unf=false;
        vm.is_es=false;
        vm.is_ds=false;
        vm.is_cd=false;
    }
    if (sessionStorage.getItem('donate') == null) {
        $location.path('/login/bloodbank');
    }
    document.getElementById('web_bb_donate').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        window.setTimeout(showall, 250);
    });
    function showall() {
        if (document.readyState == 'complete') {
            document.getElementById('web_bb_donate').style.visibility = 'visible';
        }
    }
    if(sessionStorage.getItem('donate') == 'n'){
        vm.superdonation=false;
    }
    else if(sessionStorage.getItem('donate') == 's'){
        vm.superdonation=true;
    }

    vm.userShow = false;
    vm.bbname = localStorage.getItem('bbname');
    vm.bbusername = localStorage.getItem('bbusername');
    vm.el=vm.dname=vm.bg=' ';
    if(sessionStorage.getItem('donation')=='s'){
        vm.is_ds=true;
    }
    var IDstorageref = firebase.storage().ref('/bloodbank/' + vm.bbname + '/USER-PHOTO/' + vm.bbusername + '.jpg');
    IDstorageref.getDownloadURL()
        .then(function (url) {
            document.getElementById("user_info_disp").innerHTML += '<img id="pro_pic" src="' + url + '">';
            window.setTimeout(hideerror,2000);
        })
        .catch(function (error) {
            console.log('error');
        });
    //document.getElementById("donor_details").innerHTML += '<img id="donor_pic" src="' + url + '">';

    vm.check = function(){
        vm.isloading=true;
        if ( vm.phone_inp == null){
            vm.isloading=false;
            alert(" Field Empty")
        }
        else if (vm.phone_inp.toString().length !== 10){
            vm.isloading=false;
            alert(" Invalid Number")
        }
        else {
            var url = '/api/donor/check?ph=' + vm.phone_inp;
            $http.get(url)
                .then(function(response){
                    vm.isloading=false;
                    if (response.status ==  200) {
                        vm.dname = response.data.fname;
                        vm.demail = response.data.email;
                        vm.bg = response.data.bg;
                        vm.el = 'YES';
                    }
                    else if(response.status == 206){
                        vm.dname = response.data.fname;
                        vm.demail = response.data.email;
                        vm.bg = response.data.bg;
                        vm.el = 'NO';
                        vm.is_cd = true;
                        window.setTimeout(hideerror, 2000);
                    }
                    var IDstorageref = firebase.storage().ref('/donors/' + vm.bg + '/'+vm.demail+'-'+vm.dname+ '.jpg');
                    IDstorageref.getDownloadURL()
                        .then(function (url) {
                            document.getElementById("donor_details").innerHTML += '<img id="donor_pic" src="' + url + '">';
                        })
                        .catch(function (error) {
                            console.log('error');
                        });


                })
                .catch(function(err){
                    vm.isloading=false;
                    if(err.data.msg == 'snr'){
                        vm.is_snr = true;
                        window.setTimeout(hideerror,1000);
                    }
                    else if(err.data.msg == 'unf'){
                        vm.is_unf = true;
                        window.setTimeout(hideerror,1000);
                    }
                });
        }
    }
    vm.donate = function(){
        vm.isloading=true;
        if(vm.el == ' '){
            vm.isloading=false;
            alert('Check DONOR !!')
        }
        else if(vm.el == 'NO' && sessionStorage.getItem('donate') == 'n'){
            vm.isloading=false;
            vm.is_cd = true;
        }
        else if ( vm.unit_inp == null){
            vm.isloading=false;
            alert(" Field Empty")
        }
        else{
            var postdata = {
                phoneNo : vm.phone_inp,
                useremail : localStorage.getItem('bbuseremail'),
                units : vm.unit_inp,
                superdonation : sessionStorage.getItem('donate')
            }
            $http.post('api/bloodbank/donordonate',postdata)
                .then(function(response){
                    sessionStorage.setItem('donation','s');
                    window.location.reload()
                })
                .catch(function(err){
                    vm.isloading=false;
                })
        }
    }

    vm.cancel = function(){
        sessionStorage.setItem('donation','n');
        window.location.reload();
    }

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
        window.location.reload()
    };
    vm.bb_sdonation = function(){
        sessionStorage.setItem('donate','s');
        sessionStorage.setItem('donation','n');
        window.location.reload()
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
        document.cookie = "hospuserloggedout=1" + ";expires=" + now.toUTCString() + ";";
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