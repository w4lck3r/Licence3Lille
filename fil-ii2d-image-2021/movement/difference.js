var diff={}

diff.DifferenceImageRGB=function(opt_options) {
  this.difference = document.createElement("canvas");
  this.previous = document.createElement("canvas");

  this.width=opt_options.width;
  this.height=opt_options.height;

  this.difference.width=this.width; this.difference.height=this.height;
  this.previous.width=this.width; this.previous.height=this.height;

  this.difference_ctxt = this.difference.getContext("2d");
  this.previous_ctxt = this.previous.getContext("2d");
}

diff.DifferenceImageRGB.prototype.set_first_frame_imgData=function(imgData) {
  this.previous_ctxt.putImageData(imgData,0,0);
}

diff.DifferenceImageRGB.prototype.set_first_frame_from_eltId=function(eltId) {
  var elt=document.getElementById(eltId);
  var cvs=document.createElement("canvas");
  cvs.width=elt.width; cvs.height=elt.height;
  var ctxt=cvs.getContext("2d");
  ctxt.drawImage(elt,0,0);
  this.set_first_frame_imgData(ctxt.getImageData(0,0,cvs.width,cvs.height));
}

diff.DifferenceImageRGB.prototype.process=function(in_imgData, out_imgData) {

  //BLOC1
  //Récupère les données de l'image précédente pour comparer à la suivante
  var previous_imgData = this.previous_ctxt.
                            getImageData(0, 0, this.width, this.height);

  //BLOC2
  //calcule la différence en RGB entre les deux images et renvoie une image avec en rouge la zone avec la différence calculée et en noir la zone sans différence constatée.
  var w=0;
  for (var x=0; x<this.width ; x++)
    for (var y=0; y<this.height ; y++) {
        for (var i=0; i<3; i++) {
          out_imgData.data[w+i] =
          Math.abs(in_imgData.data[w+i] - previous_imgData.data[w+i]);
        }
        out_imgData.data[w+3] = 255;
        w+=4;
    }
  this.previous_ctxt.putImageData(in_imgData,0,0);
}


diff.DifferenceImageGray=function(opt_options) {
  this.difference = document.createElement("canvas");
  this.previous = document.createElement("canvas");

  this.width=opt_options.width;
  this.height=opt_options.height;

  this.difference.width=this.width; this.difference.height=this.height;
  this.previous.width=this.width; this.previous.height=this.height;

  this.difference_ctxt = this.difference.getContext("2d");
  this.previous_ctxt = this.previous.getContext("2d");
}

diff.DifferenceImageGray.prototype.set_first_frame_imgData=function(imgData) {
  this.previous_ctxt.putImageData(imgData,0,0);
}

diff.DifferenceImageGray.prototype.set_first_frame_from_eltId=function(eltId) {
  var elt=document.getElementById(eltId);
  var cvs=document.createElement("canvas");
  cvs.width=elt.width; cvs.height=elt.height;
  var ctxt=cvs.getContext("2d");
  ctxt.drawImage(elt,0,0);
  this.set_first_frame_imgData(ctxt.getImageData(0,0,cvs.width,cvs.height));
}
diff.DifferenceImageGray.prototype.process=function(in_imgData, out_imgData) {

  //BLOC1
  //Récupère les données de l'image précédente pour comparer à la suivante
  var previous_imgData = this.previous_ctxt.
                            getImageData(0, 0, this.width, this.height);

  //BLOC2
  //calcule la différence en gris entre les deux images et renvoie une image avec en gris la zone avec la différence calculée et en noir la zone sans différence constatée.
  var w=0;
  for (var x=0; x<this.width ; x++)
    for (var y=0; y<this.height ; y++) {
        var grayIn = 0;
        var grayPrevious = 0;
        for (var i=0; i<3; i++) {
            grayIn += in_imgData.data[w+i];
            grayPrevious += previous_imgData.data[w+i];
        }
        grayIn = grayIn/3;
        grayPrevious = grayPrevious/3;
        //console.log(grayIn - grayPrevious);
        for (var i=0; i<3; i++) {
          out_imgData.data[w+i] =
          Math.abs(grayIn - grayPrevious);
        }
        out_imgData.data[w+3] = 255;
        w+=4;
    }
  this.previous_ctxt.putImageData(in_imgData,0,0);
}


diff.NormalizedDifferenceImageGray=function(opt_options) {
  this.diffImageGray=new diff.DifferenceImageGray(opt_options);
}

diff.NormalizedDifferenceImageGray.prototype.set_first_frame_imgData=function(imgData) {
  this.diffImageGray.set_first_frame_from_imgData(imgData);
}

diff.NormalizedDifferenceImageGray.prototype.set_first_frame_from_eltId=function(eltId) {
  this.diffImageGray.set_first_frame_from_eltId(eltId);
}

diff.NormalizedDifferenceImageGray.prototype.process=function(in_imgData, out_imgData) {
  //BLOC3
  //lance le calcul de différence définit auparavant
  this.diffImageGray.process(in_imgData,out_imgData);

  //BLOC4
  //calcule le niveau de gris minimum et maximum de l'image pour chaque couleur 
  var w=0;
  var min=[255,255,255], max=[0,0,0];
  for (var x=0; x<this.diffImageGray.width ; x++)
    for (var y=0; y<this.diffImageGray.height ; y++) {
        for (var i=0; i<3; i++) {
          if (min[i]>out_imgData.data[w+i]) min[i]=out_imgData.data[w+i];
          if (max[i]<out_imgData.data[w+i]) max[i]=out_imgData.data[w+i];
        }
        w+=4;
    }

  //BLOC5
  //normalise la couleur du cercle de différence en prenant en compte le maximum et le minimum calculé auparavant. 
  w=0;
  for (var x=0; x<this.diffImageGray.width ; x++)
    for (var y=0; y<this.diffImageGray.height ; y++) {
        if(out_imgData.data[w] != 0 && out_imgData.data[w+1] != 0 && out_imgData.data[w+2] != 0) {
            for (var i=0; i<3; i++) {
          //out_imgData.data[w+i] = (out_imgData.data[w+i]-min[i])*255/(max[i]-min[i]);
                out_imgData.data[w+i] = 255;
            }
        }
        out_imgData.data[w+3] = 255;
        w+=4;
    }
  this.diffImageGray.previous_ctxt.putImageData(in_imgData,0,0);
}


diff.NormalizedDifferenceImageRGB=function(opt_options) {
  this.diffImageRGB=new diff.DifferenceImageRGB(opt_options);
}

diff.NormalizedDifferenceImageRGB.prototype.set_first_frame_imgData=function(imgData) {
  this.diffImageRGB.set_first_frame_from_imgData(imgData);
}

diff.NormalizedDifferenceImageRGB.prototype.set_first_frame_from_eltId=function(eltId) {
  this.diffImageRGB.set_first_frame_from_eltId(eltId);
}

diff.NormalizedDifferenceImageRGB.prototype.process=function(in_imgData, out_imgData) {
  //BLOC3
  //lance le calcul de différence définit auparavant
  this.diffImageRGB.process(in_imgData,out_imgData);

  //BLOC4
  //calcule le niveau RGB minimum et maximum de l'image pour chaque couleur 
  var w=0;
  var min=[255,255,255], max=[0,0,0];
  for (var x=0; x<this.diffImageRGB.width ; x++)
    for (var y=0; y<this.diffImageRGB.height ; y++) {
        for (var i=0; i<3; i++) {
          if (min[i]>out_imgData.data[w+i]) min[i]=out_imgData.data[w+i];
          if (max[i]<out_imgData.data[w+i]) max[i]=out_imgData.data[w+i];
        }
        w+=4;
    }

  //BLOC5
  //normalise la couleur du cercle de différence en prenant en compte le maximum et le minimum calculé auparavant. 
  w=0;
  for (var x=0; x<this.diffImageRGB.width ; x++)
    for (var y=0; y<this.diffImageRGB.height ; y++) {
        for (var i=0; i<3; i++) {
          out_imgData.data[w+i] = (out_imgData.data[w+i]-min[i])*255/(max[i]-min[i]);
        }
        out_imgData.data[w+3] = 255;
        w+=4;
    }
  this.diffImageRGB.previous_ctxt.putImageData(in_imgData,0,0);
}

diff.ThresholdedDifferenceImage=function(opt_options) {
  this.difference = document.createElement("canvas");
  this.previous = document.createElement("canvas");

  this.width=opt_options.width;
  this.height=opt_options.height;

  this.difference.width=this.width; this.difference.height=this.height;
  this.previous.width=this.width; this.previous.height=this.height;

  this.difference_ctxt = this.difference.getContext("2d");
  this.previous_ctxt = this.previous.getContext("2d");
}

diff.ThresholdedDifferenceImage.prototype.set_first_frame_imgData=function(imgData) {
  this.previous_ctxt.putImageData(imgData,0,0);
}

diff.ThresholdedDifferenceImage.prototype.set_first_frame_from_eltId=function(eltId) {
  var elt=document.getElementById(eltId);
  var cvs=document.createElement("canvas");
  cvs.width=elt.width; cvs.height=elt.height;
  var ctxt=cvs.getContext("2d");
  ctxt.drawImage(elt,0,0);
  this.set_first_frame_imgData(ctxt.getImageData(0,0,cvs.width,cvs.height));
}
diff.ThresholdedDifferenceImage.prototype.process=function(in_imgData, out_imgData) {

  //BLOC1
  //Récupère les données de l'image précédente pour comparer à la suivante
  var previous_imgData = this.previous_ctxt.
                            getImageData(0, 0, this.width, this.height);

  //BLOC2
  //calcule la différence en gris entre les deux images et renvoie une image avec en gris la zone avec la différence calculée et en noir la zone sans différence constatée.
  var w=0;
  for (var x=0; x<this.width ; x++)
    for (var y=0; y<this.height ; y++) {
        var grayIn = 0;
        var grayPrevious = 0;
        for (var i=0; i<3; i++) {
            grayIn += in_imgData.data[w+i];
            grayPrevious += previous_imgData.data[w+i];
        }
        grayIn = grayIn/3;
        grayPrevious = grayPrevious/3;
        if(grayIn - grayPrevious >= 30) {
            for (var i=0; i<3; i++) {
                out_imgData.data[w+i] =
                Math.abs(grayIn - grayPrevious);
            }
        }
        else {
           for (var i=0; i<3; i++) {
                out_imgData.data[w+i] =
                Math.abs(0);
            } 
        }
        out_imgData.data[w+3] = 255;
        w+=4;
    }
  this.previous_ctxt.putImageData(in_imgData,0,0);
}


