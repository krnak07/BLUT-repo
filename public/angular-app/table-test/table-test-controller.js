angular.module('bbApp')
    .controller('tablec',tablec);

function tablec() {
    var vm = this;
    var table = document.getElementById('donationtable');
    console.log(table.rows[1].getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerText='Sanjay Bhardwaj');
}