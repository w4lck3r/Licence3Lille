ToBlackAndWhiteTask = function (opt_options) {
  this.seuil = opt_options.seuil;// au dela d'un seuil de gris
 
}

ToBlackAndWhiteTask.prototype.process = function(imageData){
  var pixels=imageData.data;
  var w=0;
  for (var i = 0; i < imageData.height; i++)
      for (var j = 0; j < imageData.width; j++) {
        var mean=(pixels[w+1]+pixels[w+2]+pixels[w+3])/3;
        if(mean<this.seuil){ //Jouhri Toufik update Q14 TP1
          mean = 0;
        }else{
          mean = 255;
        }
        pixels[w]=mean; pixels[w+1]=mean; pixels[w+2]=mean;
        w+=4;
      }
    }

