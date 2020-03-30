angular.module('bbApp')
    .controller('webbbsignupcontroller',webbbsignupcontroller);

function webbbsignupcontroller($location,$http) {
    var vm = this;
    document.getElementById('web_bb_signup').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        document.getElementById('web_bb_signup').style.visibility = 'visible';
    });

    vm.isloading = false;
    vm.is_snr = false;
    vm.is_ue = false;
    vm.is_es = false;

    function hideerror(){
        vm.is_snr = false;
        vm.is_ue = false;
        vm.is_es = false;
    }

    vm.signup = function(){
        vm.isloading = true;
        if (vm.signupForm.$valid){
            if(vm.pass_inp == vm.cpass_inp){
                if(vm.addr1_inp == null)
                    vm.addr1_inp = '';
                else
                    vm.addr1_inp=','+vm.addr1_inp;

                var postdata = {
                    name : vm.name_inp,
                    email : vm.email_inp,
                    phoneNo : vm.phone_inp,
                    password : vm.pass_inp,
                    addr : vm.addr_inp + vm.addr1_inp,
                    city : vm.city_inp,
                    state : vm.state_inp,
                    pincode : vm.pincode_inp,
                };
                $http.post('/api/bloodbank/signup',postdata)
                    .then(function(response){
                        sessionStorage.setItem('email',vm.email_inp);
                        sessionStorage.setItem('name',vm.name_inp);
                        sessionStorage.setItem('type','bloodbank');
                        vm.isloading = false;
                        $location.path('/signup/liscenseupload')
                    })
                    .catch(function(error){
                        vm.isloading = false;
                        vm.addr1_inp='';
                        if(error.data.msg == 'wp'){
                            alert("Weak PASWWORD !")
                        }
                        else if(error.data.msg == 'ue'){
                            vm.is_ue = true;
                            window.setTimeout(hideerror,1000);
                        }
                        else if(error.data.msg == 'es'){
                            vm.ie_es = true;
                            window.setTimeout(hideerror,1000);
                        }

                    })
            }
            else{
                vm.isloading = false;
                vm.addr1_inp='';
                vm.pass_inp=vm.cpass_inp='';
                alert('Password Do Not Match !');
            }
        }
        else{
            vm.isloading=false;
            alert("check pincode and phone number")
        }
    }

}