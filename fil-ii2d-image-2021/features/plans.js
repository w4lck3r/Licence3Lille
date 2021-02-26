DetectionPlans =function(opt_options) {
  this.old_red = 0;
  this.old_green = 0;
  this.old_blue = 0;
  this.seuil = opt_options.seuil;
}

DetectionPlans.prototype.process=function(imageData) {
  var pixels = imageData.data;
  var moyR = 0;
  var moyG = 0;
  var moyB = 0;
  var w = 0;
  for(var i=0; i<imageData.width; i++){
    for(var j=0; j<imageData.height; j++){
      moyR += pixels[w++];
      moyG += pixels[w++];
      moyB += pixels[w++];
      w++;
    }
  }
  w /= 4;
  moyR /= w;
  moyG /= w;
  moyB /= w;
  moyR = Math.round(moyR);
  moyG = Math.round(moyG);
  moyB = Math.round(moyB);
  var dist = Math.sqrt(Math.pow(moyR-this.old_red,2)+Math.pow(moyG-this.old_green,2)+Math.pow(moyB-this.old_blue,2));
  if (dist>this.seuil){
    var vid = document.getElementsByTagName("video")[0];
    vid.pause();
    alert("Changement de plan");
    vid.play();
  }
  this.old_red = Math.round(moyR);
  this.old_green = Math.round(moyG);
  this.old_blue = Math.round(moyB);
}
