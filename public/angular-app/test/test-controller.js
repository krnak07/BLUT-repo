angular.module('bbApp')
    .controller('testc',testc);

function testc(){
    var vm = this;
    vm.userShow=false;
    var storage = firebase.storage();
    var pathReference = storage.ref('bb-profile-pic/2.JPG');

    pathReference.getDownloadURL().then(function(url) {
        document.getElementById("user_info_disp").innerHTML+= '<img id="pro_pic" src="'+url+'">';
    })
        .catch(function(error) {
            console.log('error');
        });


    //user animation
    vm.showuser = function(){
        vm.userShow = true;
    };
    vm.hideuser = function(){
        vm.userShow = false;
    };
    vm.setting = function () {
        console.log('settings');
    };
    vm.about = function () {
        console.log('about');
    };
    vm.setchange = function(){
        document.getElementById("setting_rect").style.fill='rgba(225,83,83,1)';
    };
    vm.setori = function(){
        document.getElementById("setting_rect").style.fill='rgba(255,255,255,1)';
    };


};