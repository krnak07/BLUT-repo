angular.module('bbApp')
    .controller('webbblogincontroller',webbblogincontroller);

function webbblogincontroller($location,$http){
    var vm = this;
    document.getElementById('web_bb_login').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        document.getElementById('web_bb_login').style.visibility = 'visible';
    });
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
        $http.post('/api/login/bloodbank/user',postdata)
            .then(function(response){
                vm.isloading=false;
                sessionStorage.setItem('username',response.data.username);
                sessionStorage.setItem('useremail',response.data.useremail);
                sessionStorage.setItem('bbmail',response.data.bbmail);
                sessionStorage.setItem('bbname',response.data.bbname);
                $location.path('/bloodbank/dashboard');
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
    var bc=-1,be=-1,bp=-1,bl=-1;
    if(document.cookie != "" ){
        cookieArray = document.cookie.split(';');
        ca.push([cookieArray[0].split('=')[0],cookieArray[0].split('=')[1]]);
        for(var i=1;i<cookieArray.length;i++){
            ca.push([cookieArray[i].split('=')[0].split(' ')[1],cookieArray[i].split('=')[1]]);
        }
        for (var i=0;i<ca.length;i++){
            if(ca[i][0] == "bbusercookieUse")
                bc=i;
            if(ca[i][0] == "bbuseremail")
                be=i;
            if(ca[i][0] == "bbuserpass")
                bp=i;
            if(ca[i][0] == "bbuserloggedout")
                bl=i;
        }
        if(bc==-1 || be==-1 || bp ==-1 || bl==-1){

        }
        else if(ca[bl][1]=="1"){

        }
        else if(ca[bc][1] == "true"){
            var postdata = {
                email : ca[be][1],
                password : ca[bp][1]
            };
            login(postdata);
        }
        else if(ca[be][1] != null){
            var postdata = {
                email : ca[be][1],
                password : ca[bp][1]
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
                document.cookie ="bbusercookieUse=true"+";expires=" + now.toUTCString() + ";";
                document.cookie ="bbuseremail=" + vm.email_input +";expires=" + now.toUTCString() + ";";
                document.cookie ="bbuserpass=" + vm.pass_input +";expires=" + now.toUTCString() + ";";
                document.cookie ="bbuserloggedout=0;expires=" + now.toUTCString() + ";";
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
