angular.module('bbApp')
    .controller('hospreqnewcontroller',hospreqnewcontroller);

function hospreqnewcontroller($location,$http){
    var vm = this;
    var hosp_id = sessionStorage.getItem('hosp_id');
    vm.hosp_name = sessionStorage.getItem('hosp_name');
    $http.get('/api/hospitals/'+hosp_id+'/get_nearbyBB')
        .then(function (response) {
            vm.bbdata=response.data;
        });

    vm.req = function(){
        var e = document.getElementById("sele");
        var bb = e.options[e.selectedIndex].text;
        var e = document.getElementById("bg");
        var bg = e.options[e.selectedIndex].text;
        console.log(typeof(vm.units));
        if ( Number.isInteger(vm.units) ){
            var postdata = {
                fromname : vm.hosp_name,
                toname: bb,
                bg : bg,
                unit : vm.units,
            };
            $http.post('/api/hospitals/'+hosp_id+'/request',postdata)
                .then(function(res){
                    $location.path('/hospital/request')
                })
                .catch(function(err){
                    console.log(err);
                });
        }
        else{
            alert('Enter a number !');
        }

    };
    vm.bac = function(){
        $location.path('/hospital/request')
    }


}