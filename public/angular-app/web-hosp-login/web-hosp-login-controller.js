angular.module('bbApp')
    .controller('webhosplogincontroller',webhosplogincontroller);

function webhosplogincontroller($location,$http){
    if(localStorage.getItem('username')!==null){
        $location.path('/hospital/dashboard');
    }
    document.getElementById('web_hosp_login').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        document.getElementById('web_hosp_login').style.visibility = 'visible';
    });

    var vm = this;
    vm.isloading = false;
    vm.is_ip = false;
    vm.is_ie = false;
    vm.is_ce = false;
    vm.is_snr = false;
    vm.is_unf = false;
    vm.is_unv = false;
    function hideerror(){
        vm.is_ip = false;
        vm.is_ie = false;
        vm.is_ce = false;
        vm.is_snr = false;
        vm.is_unf = false;
        vm.is_unv = false;
    };

    var login = function(postdata){
        vm.isloading = true;
        $http.post('/api/login/hospital/user',postdata)
            .then(function(response){
                vm.isloading=false;
                localStorage.setItem('hospemail',response.data.hospemail);
                localStorage.setItem('hospname',response.data.hospname);
                localStorage.setItem('hospuseremail',response.data.useremail);
                localStorage.setItem('hospusername',response.data.username);
                $location.path('/hospital/dashboard');
            })
            .catch(function(err){
                vm.isloading = false;
                if(err.data.msg == "wp"){
                    vm.is_ip = true;
                    window.setTimeout(hideerror,1000);
                }
                else if(err.data.msg == "ie"){
                    vm.is_ie = true;
                    window.setTimeout(hideerror,1000);
                }
                else if(err.data.msg == "tmr"){
                    vm.is_snr = true;
                    window.setTimeout(hideerror,1000);
                }
                else if(err.data.msg == "nv"){
                    vm.is_unv = true;
                    window.setTimeout(hideerror,1000);
                }
                else if(err.data.msg == "unf"){
                    vm.is_unf = true;
                    window.setTimeout(hideerror,1000);
                }
                else if(err.data.msg == "snr"){
                    vm.is_snr = true;
                    window.setTimeout(hideerror,1000);
                }

            });
    };
    var cookieArray;
    var ca= [];
    var hc=-1,he=-1,hp=-1,hl=-1;
    if(document.cookie != ""){
        cookieArray = document.cookie.split(';');
        ca.push([cookieArray[0].split('=')[0],cookieArray[0].split('=')[1]]);
        for(var i=1;i<cookieArray.length;i++){
            ca.push([cookieArray[i].split('=')[0].split(' ')[1],cookieArray[i].split('=')[1]]);
        }
        for (var i=0;i<ca.length;i++){
            if(ca[i][0] == "hospusercookieUse")
                hc=i;
            if(ca[i][0] == "hospuseremail")
                he=i;
            if(ca[i][0] == "hospuserpass")
                hp=i;
            if(ca[i][0] == "hospuserloggedout")
                hl=i;
        }
        if(hc==-1 || he==-1 || hp ==-1 || hl==-1 ){

        }
        else if(ca[hl][1]=="1"){

        }
        else if(ca[hc][1] == "true"){
            var postdata = {
                email : ca[he][1],
                password : ca[hp][1]
            };
            login(postdata);
        }
        else if(ca[he][1] != null){
            var postdata = {
                email : ca[he][1],
                password : ca[hp][1]
            };
            login(postdata);
        }
    }
    else{
        console.log('no cookies');
    }

    vm.login = function(){
        var postdata = {
            email : vm.email_inp,
            password : vm.pass_inp
        };
        if (vm.loginForm.$valid){
            if(vm.coption){  //setCookies
                var now = new Date();
                now.setMonth( now.getFullYear() + 24 );
                document.cookie ="hospusercookieUse=true"+";expires=" + now.toUTCString() + "; path=/";
                document.cookie ="hospuseremail=" + vm.email_inp +";expires=" + now.toUTCString() + "; path=/";
                document.cookie ="hospuserpass=" + vm.pass_inp +";expires=" + now.toUTCString() + "; path=/";
                document.cookie ="hospuserloggedout=0;expires=" + now.toUTCString() + "; path=/";
            }
            login(postdata);
        }
        else {
            alert('Invalid Form');
        }

    };

    //button-animation
    vm.btnchange = function(){
        document.getElementById('Rectangle_40').style.fill = "rgba(53,49,49,1)";
    };
    vm.btnori = function(){
        document.getElementById('Rectangle_40').style.fill = "rgba(112,112,112,1)";
    };

}
