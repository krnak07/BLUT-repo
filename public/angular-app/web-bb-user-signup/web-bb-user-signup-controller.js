angular.module('bbApp')
    .controller('webbbusersignupcontroller',webbbusersignupcontroller);

function webbbusersignupcontroller($location,$http){
    var vm = this;
    document.getElementById('web_bb_user_signup').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        document.getElementById('web_bb_user_signup').style.visibility = 'visible';
    });
    if(sessionStorage.getItem('gender') == 'M'){
        vm.is_M = true;
        vm.is_F = false;
    }
    else if(sessionStorage.getItem('gender') == 'F'){
        vm.is_M = false;
        vm.is_F = true;
    }
    else{
        $location.path('/signup/bloodbank/user');
    }

    vm.isloading = false;
    vm.snr = false;
    vm.bnf = false;
    vm.exists = false;
    vm.not_associated = false;
    function hideerror(){
        vm.snr = false;
        vm.bnf = false;
        vm.exists = false;
        vm.not_associated = false;
    }

    vm.signupcheck = function(){
        vm.isloading = true;
        var postdata = {
            bbemail : vm.bbemail_inp,
            userfname : vm.userfname_inp,
            userlname : vm.userlname_inp,
            userphone : vm.userphone_inp
        };
        if (vm.signupcheckForm.$valid){
            $http.post('/api/bloodbank/usercheck',postdata)
                .then(function(response){
                    vm.isloading=false;
                    sessionStorage.setItem('bbemail',postdata.bbemail);
                    sessionStorage.setItem('bbname',response.data.bbname);
                    sessionStorage.setItem('userfname',postdata.userfname);
                    sessionStorage.setItem('userlname',postdata.userlname);
                    sessionStorage.setItem('userphone',postdata.userphone);
                    $location.path('/signup/bloodbank/user/details');
                })
                .catch(function(err){
                    vm.isloading=false;
                    if(err.data.msg == 'bnf'){
                        vm.bnf = true;
                        window.setTimeout(hideerror,1000);
                    }
                    else if(err.data.msg == 'exists'){
                        vm.exists = true;
                        window.setTimeout(hideerror,1000);
                    }
                    else if(err.data.msg == 'snr'){
                        vm.snr = true;
                        window.setTimeout(hideerror,1000);
                    }
                    else if(err.data.msg == 'not associated'){
                        vm.not_associated = true;
                        window.setTimeout(hideerror,1000);
                    }
                })
        }
    }
}