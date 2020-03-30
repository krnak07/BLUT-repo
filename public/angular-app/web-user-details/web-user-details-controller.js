angular.module('bbApp')
    .controller('webuserdetailscontroller',webuserdetailscontroller);

function webuserdetailscontroller($location,$http) {
    var vm = this;
    document.getElementById('web_user_details').style.visibility = 'hidden';
    angular.element(document).ready(function () {
        document.getElementById('web_user_details').style.visibility = 'visible';
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

    if(sessionStorage.getItem('bbemail') == null){
        $location.path('/signup/bloodbank/user/male')
    }
    vm.signupdetails = function(){
        vm.isloading = true;
        if (vm.signupdetailsForm.$valid){
            if(vm.pass_inp == vm.cpass_inp){
                if(vm.addr1_inp == null)
                    vm.addr1_inp = '';
                else
                    vm.addr1_inp=','+vm.addr1_inp;

                var postdata = {
                    fname : sessionStorage.getItem('userfname'),
                    lname : sessionStorage.getItem('userlname'),
                    dob : vm.dob_inp,
                    bg : vm.bg_inp,
                    email : vm.email_inp,
                    password : vm.pass_inp,
                    phoneNo : sessionStorage.getItem('userphone'),
                    addr : vm.addr_inp + vm.addr1_inp,
                    city : vm.city_inp,
                    state : vm.state_inp,
                    pincode : vm.pincode_inp,
                    bbemail : sessionStorage.getItem('bbemail'),
                    bbname : sessionStorage.getItem('bbname'),
                    gender : sessionStorage.getItem('gender'),
                };
                $http.post('/api/signup/bbuser',postdata)
                    .then(function(response){
                        sessionStorage.removeItem('bbemail');
                        sessionStorage.removeItem('usergender');
                        sessionStorage.removeItem('userlname');
                        sessionStorage.removeItem('userphone');
                        vm.isloading = false;
                        $location.path('/signup/bloodbank/user/upload')
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
    }
}
