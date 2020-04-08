angular.module('bbApp')
    .controller('hospdonationcontroller',hospdonationcontroller);

function hospdonationcontroller($http,$routeParams,$location,$route){
    var vm = this;
    vm.el='';
    vm.da=[];
    var hosp_id = sessionStorage.getItem('hosp_id');
    vm.hosp_name = sessionStorage.getItem('hosp_name');

    $http.get('/api/hospitals/'+hosp_id+'/donors')
        .then(function (response) {
            vm.dat=response.data.donationhistory;
            var i = 0;
            for( i =0;i<response.data.donationhistory.length;i++){
                var d = new Date(vm.dat[i].dateofdonation);
                vm.da[i] = d.toLocaleDateString('en-US');
            }
        });
    vm.donate_check = function(){
        if(vm.phoneNo == null){
            alert('Phone Number : Empty Field');
        }
        else{
            var url = '/api/donor/check?ph=' + vm.phoneNo;
            $http.get(url)
                .then(function(response){
                    if (response.status ==  200) {
                        if(response.data == null){
                            alert('User Not Found');
                        }
                        else{
                            vm.dname = response.data.firstname;
                            vm.bg = response.data.bloodgroup;
                            vm.el = 'YES';
                        }

                    }
                    else if(response.status == 206){
                        vm.dname = response.data.firstname;
                        vm.bg = response.data.bloodgroup;
                        vm.el = 'NO';
                    }

                })
                .catch(function(err){
                    console.log(err);
                });
        }

    };

    vm.donate_okay = function(){
        if(vm.el == ''){
            alert('Verify Phone Number !');
        }
        else if(vm.el == 'NO'){
            alert('Cannot Donate');
        }
        else if(vm.dunits == null){
            alert('Enter Units');
        }
        else{
            var postdata = {
                phoneNo : vm.phoneNo,
                units : vm.dunits
            };
            $http.post('/api/hospitals/'+hosp_id+'/donate',postdata)
                .then(function(response){
                    if(response.status == 200){
                        dt = vm.phoneNo+" : Donated "+vm.dunits+" units of Blood";
                        alert(dt);
                        vm.phoneNo = '';
                        vm.dunits = '';
                        vm.dname='';
                        vm.bg = '';
                        vm.el='';
                        $route.reload();
                    }
                })
                .catch(function(err){
                    alert("error in donation")
                });
        }
    };

    vm.donation = function () {
        $location.path('/hospital/donation');
    };
    vm.BB = function () {
        $location.path('/hospital/bloodbanks');
    };
    vm.donor = function () {
        $location.path('/hospital/donor');
    };
    vm.request = function(){
        $locatino.path('/hospital/request');
    };

    vm.goHome = function () {
        $location.path('/hospital/home');
    };
    vm.refres = function () {
        console.log('refresh');
    };

}