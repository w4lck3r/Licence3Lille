<<<<<<< HEAD
ToBlackAndWhiteTask = function (opt_options) {
  this.seuil = opt_options.seuil;// au dela d'un seuil de gris
 
}
=======
ToBlackAndWhiteTask = function (opt_options) { }
>>>>>>> b906e9129f4ea49935f7d6e029c876382e8fc9c7

ToBlackAndWhiteTask.prototype.process = function(imageData){
  var pixels=imageData.data;
  var w=0;
  for (var i = 0; i < imageData.height; i++)
      for (var j = 0; j < imageData.width; j++) {
        var mean=(pixels[w+1]+pixels[w+2]+pixels[w+3])/3;
<<<<<<< HEAD
        if(mean<this.seuil){ //Jouhri Toufik update Q14 TP1
=======
        if(mean<200){
>>>>>>> b906e9129f4ea49935f7d6e029c876382e8fc9c7
          mean = 0;
        }else{
          mean = 255;
        }
        pixels[w]=mean; pixels[w+1]=mean; pixels[w+2]=mean;
        w+=4;
      }
    }
<<<<<<< HEAD

=======
>>>>>>> b906e9129f4ea49935f7d6e029c876382e8fc9c7
