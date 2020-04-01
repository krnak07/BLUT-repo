angular.module('bbApp')
    .controller('webhospusersignupcontroller',webhospusersignupcontroller);

function webhospusersignupcontroller($location,$http){
    var vm = this;
    document.getElementById('web_hosp_user_signup').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        document.getElementById('web_hosp_user_signup').style.visibility = 'visible';
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
        $location.path('/signup/hospital/user');
    }

    vm.isloading = false;
    vm.is_snr = false;
    vm.is_hnf = false;
    vm.is_ue = false;
    vm.is_unf = false;
    function hideerror(){
        vm.is_snr = false;
        vm.is_hnf = false;
        vm.is_ue = false;
        vm.is_unf = false;
    }

    vm.signupcheck = function(){
        vm.isloading = true;
        var postdata = {
            hospemail : vm.hospemail_inp,
            userfname : vm.userfname_inp,
            userlname : vm.userlname_inp,
            userphone : vm.userphone_inp
        };
        if (vm.signupcheckForm.$valid){
            $http.post('/api/hospital/usercheck',postdata)
                .then(function(response){
                    vm.isloading=false;
                    sessionStorage.setItem('typeemail',postdata.hospemail);
                    sessionStorage.setItem('typename',response.data.hospname);
                    sessionStorage.setItem('userfname',postdata.userfname);
                    sessionStorage.setItem('userlname',postdata.userlname);
                    sessionStorage.setItem('userphone',postdata.userphone);
                    $location.path('/signup/user/details');
                })
                .catch(function(err){
                    vm.isloading=false;
                    console.log(err);
                    if(err.data.msg == 'hnf'){
                        vm.is_hnf = true;
                        window.setTimeout(hideerror,1000);
                    }
                    else if(err.data.msg == 'exists'){
                        vm.is_ue = true;
                        window.setTimeout(hideerror,1000);
                    }
                    else if(err.data.msg == 'snr'){
                        vm.is_snr = true;
                        window.setTimeout(hideerror,1000);
                    }
                    else if(err.data.msg == 'not associated'){
                        vm.is_unf = true;
                        window.setTimeout(hideerror,1000);
                    }
                })
        }
        else{
            vm.isloading=false;
            alert('Phone Number can contain a maximum of 10 digits');
        }
    }
}