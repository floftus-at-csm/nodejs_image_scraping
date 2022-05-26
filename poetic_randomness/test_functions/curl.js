
// var fs = require('fs'),
// request = require('request');
// const { exec } = require('child_process');
// var url_string = "https://i.pcmag.com/imagery/articles/02EqHP9mi40I2oSEfs5uohB-22..v1633958706.png";
// var filename = url_string.substring(url_string.lastIndexOf('/')+1);
// // var path_to_dest  = "/google_images/" + no_line_breaks + "/" + filename;
// var path_to_dest  = "google_images/"  + filename;
// var command_ = "curl " + url_string + " -O " + path_to_dest;
// // var command_ = "curl -o " + path_to_dest + " "+url_string;
// console.log(command_);
// var yourscript = exec(command_,
//         (error, stdout, stderr) => {
//             console.log(stdout);
//             console.log(stderr);
//             if (error !== null) {
//                 console.log(`exec error: ${error}`);
//             }
//         });

// ideas - 1. cd into directory and then run command
// var exec = require('child_process').exec;
// var url_string = "https://i.pcmag.com/imagery/articles/02EqHP9mi40I2oSEfs5uohB-22..v1633958706.png";
// var filename = url_string.substring(url_string.lastIndexOf('/')+1);
// // var path_to_dest  = "/google_images/" + no_line_breaks + "/" + filename;
// // var path_to_dest  = "google_images/"  + filename;
// var command_ = "cd google_images && curl " + url_string + " -O " + filename;
// exec(command_,
//     function (error, stdout, stderr) {
//         console.log('stdout: ' + stdout);
//         console.log('stderr: ' + stderr);
//         if (error !== null) {
//              console.log('exec error: ' + error);
//         }
//     });


var exec = require('child_process').exec;
var url_string = "https://i.pcmag.com/imagery/articles/02EqHP9mi40I2oSEfs5uohB-22..v1633958706.png";
var filename = url_string.substring(url_string.lastIndexOf('/')+1);
var no_line_breaks = "be to I";
var no_spaces = no_line_breaks.split(' ').join('_')
var command1_ = "cd google_images && mkdir " + no_spaces;
exec(command1_,
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
var path_to_dest =  "google_images/"+no_spaces;
var command2_ = "cd " + path_to_dest + " &&  curl " + url_string + " -O " + filename;
exec(command2_,
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
                console.log('exec error: ' + error);
        }
    });