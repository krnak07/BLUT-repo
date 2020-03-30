angular.module('bbApp')
    .controller('campdonationcontroller',campdonationcontroller);

function campdonationcontroller($location,$http,$route) {
    var vm = this;
    vm.el = '';
    vm.da = []

    var camp_id = sessionStorage.getItem('camp_id');
    var bank_id = sessionStorage.getItem('bank_id');
    vm.camp_name = sessionStorage.getItem('camp_name');
    vm.bank_name = sessionStorage.getItem('bank_name');
    //bloodbank/bank_id/camps/camp_id/donation

    $http.get('/api/bloodbank/'+bank_id+'/camps/'+camp_id+'/donors')
        .then(function (response) {
            vm.dat = response.data;
            var i = 0;
            for( i =0;i<vm.dat.length;i++){
                var d = new Date(vm.dat[i].dateofdonation);
                vm.da[i] = d.toLocaleDateString('en-US');
            }

        })
        .catch(function (err) {
            console.log(err);

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
        else if(vm.phoneNo == null){
            alert('Phone Number : Empty Field');
        }
        else{
            var postdata = {
                phoneNo : vm.phoneNo,
                units : vm.dunits
            };
            $http.post('/api/bloodbank/'+bank_id+'/camps/'+camp_id+'/donation',postdata)
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
    vm.goHome = function () {
        $location.path('/camp/'+camp_id);

    };
    vm.refres = function () {
        console.log('refresh');

    };
    vm.BA = function () {
        $location.path('/camp/'+camp_id+'/blood_availability');

    };

}