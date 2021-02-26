GetPixelRGBATask=function(opt_options) {
  this.x=opt_options.x;
  this.y=opt_options.y;
  this.output=opt_options.output;
}

GetPixelRGBATask.prototype.process=function(imageData) {
  var pos=(this.y*imageData.width+this.x)<<2;
  var r=imageData.data[pos];
  var g=imageData.data[pos+1];
  var b=imageData.data[pos+2];
  var a=imageData.data[pos+3];

  this.output.innerHTML=this.x+"x"+this.y+" : ";
  this.output.innerHTML+="<font color='red'>"+r+"</font> | ";
  this.output.innerHTML+="<font color='green'>"+g+"</font> | ";
  this.output.innerHTML+="<font color='blue'>"+b+"</font> | ";
  this.output.innerHTML+="<font color='gray'>"+a+"</font>";

}

GetRandomRGBAPixel = function(opt_options){ //q11
  this.x = opt_options.x;
  this.y = opt_options.y;
  this.output = opt_options.output;
}

GetRandomRGBAPixel.prototype.process = function(imageData){ //q11
  // choose a random pixel
  var randX = getRandomInt(this.width);
  var randY = getRandomInt(this.height);
  var randPos = (randY * imageData.width + randX) << 2;
  // pixel to switch
  var pos = (this.y * imageData.width + this.x) << 2;
  // switch values
  for (var i = 0; i < 4; ++i) {
    var dIm = imageData.data[pos+i];
    imageData.data[pos+i] = imageData.data[randPos+i];
    imageData.data[randPos+i] = dIm;
  }
  var r = imageData.data[pos];
  var g = imageData.data[pos + 1];
  var b = imageData.data[pos + 2];
  var a = imageData.data[pos + 3];

  this.output.innerHTML = "after we change it :<br>";
  this.output.innerHTML += this.x + "x" + this.y + " : ";
  this.output.innerHTML += "<font color='red'>" + r + "</font> | ";
  this.output.innerHTML += "<font color='green'>" + g + "</font> | ";
  this.output.innerHTML += "<font color='blue'>" + b + "</font> | ";
  this.output.innerHTML += "<font color='gray'>" + a + "</font>";
}

GetMeanPixel = function(opt_options){ //q12
  this.output = opt_options.output;
}

GetMeanPixel.prototype.process = function(imageData){ //Q12
  //initialize mean tab and pos
  var mean = [0, 0, 0, 0];
  var pos = 0;
  //foreach position of an image(or video) we give mean a value
  for (var x = 0; x < imageData.width; ++x)
    for (var y = 0; y < imageData.height; ++y) {
      for (var i = 0; i < 4; ++i)
        mean[i] += imageData.data[pos + i];
      pos += 4;
    }

  for (var i = 0; i < 4; ++i) {
    mean[i] /= (imageData.width * imageData.height);
    mean[i] = Math.round(mean[i]);
  }

  pos = 0;
  for (var x = 0; x < imageData.width; ++x)
    for (var y = 0; y < imageData.height; ++y) {
      for (var i = 0; i < 4; ++i)
        imageData.data[pos+i] = mean[i];
      pos += 4;
    }

  this.output.innerHTML = "les valeurs moyennes (r, g, b, a) arrondies :<br>";
  this.output.innerHTML += "<font color='red'>" + mean[0] + "</font> | ";
  this.output.innerHTML += "<font color='green'>" + mean[1] + "</font> | ";
  this.output.innerHTML += "<font color='blue'>" + mean[2] + "</font> | ";
  this.output.innerHTML += "<font style='color: rgba(0, 0, 0, 0.5);'>" + mean[3] + "</font> | ";
}

function getRandomInt(m) {
  return Math.floor(Math.random() * Math.floor(m));
}
