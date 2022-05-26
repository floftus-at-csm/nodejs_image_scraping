/*
This script will select random words from the text_poems.txt file 
it will then concatenate them together
then it will search google for images of those words
e.g. Toujours tismée atterri
check for google search and youtube filters
*/
// =========================================
// Includes

var fs = require('fs'),
    request = require('request');

const google = require('googlethis');

// const download = require('download');

// =========================================
// Functions

async function start(poem_string) {
 // Image Search
 const images = await google.image(poem_string, { safe: false });
//  console.log(poem_string)
//  console.log(images);
//  console.log(images[0].url)
console.log("the width of the image is:", parseInt(images[0].width));

console.log("the type of the width is:", parseInt(typeof(images[0].width)));

 var url_array = [];
 for(let i=0; i<images.length; i++){
     var width_of_image = images[i].width;
     width_of_image = width_of_image.replace(/\s/g, '');
     width_of_image = parseInt(width_of_image);
     console.log("type of width of image is: ", typeof(width_of_image))
     if(width_of_image>400){
        url_array.push(images[i].url)
     }
    
 }

 console.log(url_array)
 console.log("the poem string is " + poem_string)
 var without_punctuation = poem_string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
 var no_line_breaks = without_punctuation.replace(/(\r\n|\n|\r)/gm, "");
 var file_title = "url_lists/" + no_line_breaks + ".txt";

 console.log(url_array[0])
 counter=0
 for(url in url_array){
    // counter=counter+1
    var text_to_add = url_array[counter] + ", ";
    var url_string = url_array[counter];
    
    console.log("the url string is: ", url_string);
    // get the file name from the url
    try {

        // ===========================
        // downloading images
        var exec = require('child_process').exec;
        var filename = url_string.substring(url_string.lastIndexOf('/')+1);
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
                fs.appendFile(file_title, text_to_add, function (err) {
                    if (err) return console.log(err);
                    // console.log('Hello World > helloworld.txt');
                    
                });    
            } catch (error) {
            console.log(error);   
            }
            counter=counter+1
            
        }

  
 // Reverse Image Search
//  const reverse = await google.search('https://i.pinimg.com/236x/92/16/d9/9216d9a222ef65eb6eabfff1970180d1.jpg', { ris: true });
//  console.log(reverse.results);

return file_title; 

}

function get_string(text_array){
    var random_from_array = Math.floor(Math.random() * text_array.length); 
    console.log(text_array[random_from_array])
    // var array = fs.readFileSync('file.txt').toString().split("\n");
    var p_string = text_array[random_from_array];
    random_from_array = Math.floor(Math.random() * text_array.length);
    p_string = p_string + " " +  text_array[random_from_array];

    random_from_array = Math.floor(Math.random() * text_array.length);
    p_string = p_string + " " +  text_array[random_from_array];

    console.log(p_string)
    return p_string;
}

// ===============================================
// download function

// var download = function(uri, filename, callback){
//     request.head(uri, function(err, res, body){
//     //   console.log('content-type:', res.headers['content-type']);
//     //   console.log('content-length:', res.headers['content-length']);
  
//       request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//     });
//   };


// ===============================================
// actual program

var text = fs.readFileSync('text-english.txt');
var text_array1 = text.toString().split(" ");

console.log(text_array1.length)
search_string = get_string(text_array1)

var generated_file = start(search_string); // creates  a text file
console.log("the generated file is: ", generated_file)
console.log(generated_file[0])
