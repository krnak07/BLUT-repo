var Barc = require('node-barc-c')
    ,barc = new Barc
    ,fs = require('fs');
//const {Canvas} = require("canvas");

//create a 300x200 px image with the barcode 1234
module.exports.wr=function(req,res){
    var buf = barc.code128( 'B+-Kiran', 1600, 225);
    var filename = 'barcode/B+-Kiran' + '.png';
    fs.writeFile(filename, buf, function(){
        console.log('wrote it');
    });
};
/*
module.exports.wr=function(req,res) {
    const JsBarcode = require('jsbarcode');
    const {Canvas} = require("canvas");

    const canvas = new Canvas();
    var asd = JsBarcode(canvas, "Hello");
    var fs = require('fs');
    fs.writeFile(__dirname + '/example.png', asd, function () {
        console.log('wrote it');
    });
};*/



