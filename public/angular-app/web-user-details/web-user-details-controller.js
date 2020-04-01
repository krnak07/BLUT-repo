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
    vm.is_pdm = false;
    vm.is_wep = false;
    function hideerror(){
        vm.is_snr = false;
        vm.is_ue = false;
        vm.is_es = false;
        vm.is_pdm = false;
        vm.is_wep = false;
    }
    var adr;

    if(sessionStorage.getItem('typeemail') == null){
        $location.path('/signup/'+sessionStorage.getItem('type')+'/user/male')
    }
    vm.signupdetails = function(){
        vm.isloading = true;
        if (vm.signupdetailsForm.$valid){
            if(vm.pass_inp == vm.cpass_inp){
                if(vm.addr1_inp == null)
                    adr = vm.addr_inp;
                else
                    adr = vm.addr_inp+','+vm.addr1_inp;

                var postdata = {
                    fname : sessionStorage.getItem('userfname'),
                    lname : sessionStorage.getItem('userlname'),
                    dob : vm.dob_inp,
                    bg : vm.bg_inp,
                    email : vm.email_inp,
                    password : vm.pass_inp,
                    phoneNo : sessionStorage.getItem('userphone'),
                    addr : adr,
                    city : vm.city_inp,
                    state : vm.state_inp,
                    pincode : vm.pincode_inp,
                    typeemail : sessionStorage.getItem('typeemail'),
                    typename : sessionStorage.getItem('typename'),
                    gender : sessionStorage.getItem('gender'),
                };
                $http.post('/api/signup/'+sessionStorage.getItem('type')+'/user',postdata)
                    .then(function(response){
                        sessionStorage.removeItem('typeemail');
                        sessionStorage.removeItem('usergender');
                        sessionStorage.removeItem('userlname');
                        sessionStorage.removeItem('userphone');
                        sessionStorage.setItem('email',vm.email_inp);
                        vm.isloading = false;
                        $location.path('/signup/user/upload')
                    })
                    .catch(function(error){
                        vm.isloading = false;
                        if(error.data.msg == 'wp'){
                            vm.is_wep = true;
                            vm.pass_inp=vm.cpass_inp='';
                            window.setTimeout(hideerror,1000);
                        }
                        else if(error.data.msg == 'ue'){
                            vm.is_ue = true;
                            window.setTimeout(hideerror,1000);
                        }
                        else if(error.data.msg == 'es'){
                            vm.is_es = true;
                            window.setTimeout(hideerror,1000);
                        }

                    })
            }
            else{
                vm.isloading = false;
                vm.pass_inp=vm.cpass_inp='';
                vm.is_pdm = true;
                window.setTimeout(hideerror,1000);
            }
        }
        else{
            vm.isloading=false;
            alert('Pincode Max size is 6');
        }
    }
}
