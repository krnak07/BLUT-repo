angular.module('bbApp')
    .controller('bbdonationcontroller',bbdonationcontroller);

function bbdonationcontroller($http,$routeParams,$location,$route) {
    var vm = this;
    vm.el = '';
    vm.bank_name = sessionStorage.getItem('bank_name');
    var id = sessionStorage.getItem('id');
    vm.da = [];

    $http.get('/api/bloodbank/'+id)
        .then(function(response) {
            var i = 0;
            vm.dat = response.data.donordonationhistory;
            for( i =0;i<vm.dat.length;i++){
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
            $http.post('/api/bloodbank/'+id+'/donor_donate',postdata)
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

    vm.ba = function () {
        $location.path('/bloodbank/blood_availability');

    };

    vm.goHome = function () {
        $location.path('/bloodbank/home');

    };

    vm.camp = function () {
        $location.path('/bloodbank/camp');
    }
}