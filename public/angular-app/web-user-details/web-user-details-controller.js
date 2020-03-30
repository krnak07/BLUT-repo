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

    if(sessionStorage.getItem('typeemail') == null){
        $location.path('/signup/'+sessionStorage.getItem('type')+'/user/male')
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
                        console.log(error);
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
            alert('Pincode Max size is 6');
        }
    }
}
