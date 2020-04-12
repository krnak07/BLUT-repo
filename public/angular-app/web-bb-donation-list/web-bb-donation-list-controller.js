angular.module('bbApp')
    .controller('webbbdonationlistcontroller',webbbdonationlistcontroller);
function webbbdonationlistcontroller($location,$http){
    var vm = this;
    var d;
    var ld;
    document.getElementById('web_bb_donation_list').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        window.setTimeout(showall, 1000);
    });
    function showall() {
        if (document.readyState == 'complete') {
            document.getElementById('web_bb_donation_list').style.visibility = 'visible';
        }
    }
    vm.userShow = false;
    vm.dashShow = false;
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

    if(sessionStorage.getItem('len')==null || parseInt(sessionStorage.getItem('len'))== 0){
        document.getElementById("return_btn").disabled = true;
        ld=0
    }
    else{
        ld=parseInt(sessionStorage.getItem('len'));
    }
    var table = document.getElementById('donationtable');
    //table.rows[2].getElementsByTagName('td')[3].getElementsByTagName('span')[0].innerText='Sanjay Bhardwaj'
    $http.get('/api/bloodbank/getDL')
        .then(function(response){
            var l = response.data.length-1-ld;
            for(var i=0;i<14;i++){
                if(i+1+ld>response.data.length){
                    document.getElementById("next_btn").disabled = true;
                    break;
                }
                table.rows[i+1].getElementsByTagName('td')[0].getElementsByTagName('span')[0].innerText=response.data[l-i].donor_name;
                table.rows[i+1].getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerText=response.data[l-i].phoneNo;
                table.rows[i+1].getElementsByTagName('td')[2].getElementsByTagName('span')[0].innerText=response.data[l-i].bloodgroup;
                table.rows[i+1].getElementsByTagName('td')[3].getElementsByTagName('span')[0].innerText=response.data[l-i].unitsofblood;
                d = new Date(response.data[l-i].dateofdonation);
                table.rows[i+1].getElementsByTagName('td')[4].getElementsByTagName('span')[0].innerText=d.toLocaleDateString()+' - '+d.toLocaleTimeString();
            }
        })
        .catch(function (err) {
            console.log(err);
        })

    vm.goNext = function () {
        if(sessionStorage.getItem('len')==null){
            sessionStorage.setItem('len','14');
            window.location.reload()
        }
        else{
            ld+=14;
            sessionStorage.setItem('len',ld.toString());
            window.location.reload()
        }
    }
    vm.goPre = function () {
        if(sessionStorage.getItem('len')==null){
            window.location.reload()
        }
        else{
            ld-=14;
            sessionStorage.setItem('len',ld.toString());
            window.location.reload()
        }
    }


    //user-panel
    vm.bb_ba = function(){
        $location.path('/bloodbank/bloodavailability');
    }
    vm.bb_donations = function () {
        $location.path('/bloodbank/donation');
    };
    vm.bb_requests = function () {
        $location.path('/bloodbank/requests');
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
        vm.bagShow=true;
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