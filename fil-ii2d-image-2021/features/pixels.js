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

var pixels_features={};

/*
  pixels_features.mean_rgb_afactor_per_circle
  - computes RGB mean of all pixels considering A as a weight of RGB channels
  within opt_options.x0 .y0 .dx .dy
  - if opt_options missing partially,
      replace partially with defaults 0, 0, imageData.width, imageData.height
  - returns undefined if none available
*/
pixels_features.mean_rgb_afactor_per_circle=function(imageData,opt_options) {
  x0=opt_options&&opt_options.x0?opt_options.x0:0;
  y0=opt_options&&opt_options.y0?opt_options.y0:0;
  dx=opt_options&&opt_options.dx?opt_options.dx:imageData.width;
  dy=opt_options&&opt_options.dy?opt_options.dy:imageData.height;


  var mean=[];
  mean[0]=0; mean[1]=0; mean[2]=0;
  var pos=0; var count=0;
  var rayon;
  if (dy>dx){
    rayon = dx/2;
  }
  else{
    rayon = dy/2;
  }
  var centre_x = (dx/2)+x0;
  var centre_y = (dy/2)+y0;
  for (var y=y0;y<y0+dy;y++)
    for (var x=x0;x<x0+dx;x++) {
      if(Math.sqrt(Math.pow((x-centre_x),2)+Math.pow((y-centre_y),2))<=rayon){
        pos=(y*imageData.width+x)<<2;
        for (var i=0;i<3;i++) {
          mean[i]+=(imageData.data[pos+i]*imageData.data[pos+3]);
        }
        count++;
      }
    }
  if (count>0) {
    for (var i=0;i<3;i++) {
      mean[i]=Math.round(mean[i]/count);
    }
    return mean;
  }
  return undefined;
}
