var canvas = document.getElementById("canvas1");
var shots  = [];
var grabLimit = 700;  // Number of screenshots to take
var grabRate  = 16.3; // Miliseconds. 500 = half a second

var count     = 0;

function showResults() {
    //console.log(shots);
    for (var i=0; i<shots.length; i++) {
      document.write('<img src="' + shots[i] + '"/>\n');
    }
}

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}

var grabber = setInterval(function(){
  count++;

  if (count>grabLimit) {
    clearInterval(grabber);
    showResults();
  }

  
  var img = canvas.toDataURL("image/png");
 // shots.push(img);
  downloadURI(canvas.toDataURL("image/png"), count + '_download.png')
}, grabRate);
