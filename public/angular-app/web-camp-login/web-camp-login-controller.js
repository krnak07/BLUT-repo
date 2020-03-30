angular.module('bbApp')
    .controller('webcamplogincontroller',webcamplogincontroller);

function webcamplogincontroller($location,$http){

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
        $http.post('/api/bloodbank/login',postdata)
            .then(function(response){
                vm.isloading=false;
                sessionStorage.setItem('bb_id',response.data.id);
                sessionStorage.setItem('bb_name',response.data.name);
                $location.path('/camp/selection');
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
    var cc=-1,ce=-1,cp=-1;
    if(document.cookie != ""){
        cookieArray = document.cookie.split(';');
        ca.push([cookieArray[0].split('=')[0],cookieArray[0].split('=')[1]]);
        for(var i=1;i<cookieArray.length;i++){
            ca.push([cookieArray[i].split('=')[0].split(' ')[1],cookieArray[i].split('=')[1]]);
        }
        for (var i=0;i<ca.length;i++){
            if(ca[i][0] == "campcookieUse")
                cc=i;
            if(ca[i][0] == "camp_email")
                ce=i;
            if(ca[i][0] == "camp_pass")
                cp=i;
        }
        if(cc==-1 || ce==-1 || cp ==-1){

        }
        else if(ca[cc][1] == "true"){
            var postdata = {
                email : ca[ce][1],
                password : ca[cp][1]
            };
            login(postdata);
        }
        else if(ca[ce][1] != null){
            var postdata = {
                email : ca[ce][1],
                password : ca[cp][1]
            };
            login(postdata);
        }
    }
    else{
        console.log('no cookies');
    }
    vm.login = function(){
        var postdata = {
            email : vm.email_input,
            password : vm.pass_input
        };
        if (vm.loginForm.$valid){
            if(vm.coption){  //setCookies
                var now = new Date();
                now.setMonth( now.getFullYear() + 24 );
                document.cookie = "campcookieUse=true"+";expires=" + now.toUTCString() + ";";
                document.cookie = "camp_email=" + vm.email_input +";expires=" + now.toUTCString() + ";";
                document.cookie = "camp_pass=" + vm.pass_input +";expires=" + now.toUTCString() + ";";
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
