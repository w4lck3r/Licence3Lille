GetPixelRGBATask=function(opt_options) {
  this.x=opt_options.x;
  this.y=opt_options.y;
  this.output=opt_options.output;
}
/** Création et initialisation les balises de couleur HTML selon la convention RGBA*/
GetPixelRGBATask.prototype.process=function(imageData) {
  // on affecte à la variable pos la position du pixel à modifié selon x et y en faisant abstraction des deux premiers octets. 
  var pos=(this.y*imageData.width+this.x)<<2;
  // Récupèration les données de chaque pixel.
  var r=imageData.data[pos];
  var g=imageData.data[pos+1];
  var b=imageData.data[pos+2];
  var a=imageData.data[pos+3];
  // Création des balises HTML interprétant les valeures RGBA. 
  this.output.innerHTML=this.x+"x"+this.y+" : ";
  this.output.innerHTML+="<font color='red'>"+r+"</font> | ";
  this.output.innerHTML+="<font color='green'>"+g+"</font> | ";
  this.output.innerHTML+="<font color='blue'>"+b+"</font> | ";
  this.output.innerHTML+="<font color='gray'>"+a+"</font>";
}
GetRandomRGBAPixelTask=function(output) {
  this.output=output;
}
GetRandomRGBAPixelTask.prototype.process=function(imageData) {
  // on affecte à la variable pos la position du pixel à modifié selon x et y en faisant abstraction des deux premiers octets. 
  var w = Math.floor(Math.random() * imageData.width);
  var h = Math.floor(Math.random() * imageData.height);
  var pos=(w*imageData.width+h)<<2;
  // Récupèration les données de chaque pixel.
  var r=imageData.data[pos];
  var g=imageData.data[pos+1];
  var b=imageData.data[pos+2];
  var a=imageData.data[pos+3];
  // Création des balises HTML interprétant les valeures RGBA. 
  this.output.innerHTML= w+" x "+ h + "y : ";
  this.output.innerHTML+="<font color='red'>"+r+"</font> | ";
  this.output.innerHTML+="<font color='green'>"+g+"</font> | ";
  this.output.innerHTML+="<font color='blue'>"+b+"</font> | ";
  this.output.innerHTML+="<font color='gray'>"+a+"</font>";
}

GetMeanPixelTask=function(output) {
  this.output=output;
  this.moyenner =0;
  this.moyenneg =0;
  this.moyenneb =0;
  this.moyennea =0;
}
GetMeanPixelTask.prototype.process=function(imgData) {
  // on affecte à la variable pos la position du pixel à modifier selon x et y en faisant abstraction des deux premiers octets. 
  var sommer=0;
  var sommeg=0;
  var sommeb=0;
  var sommea=0;
  for (var x = 0; x <imgData.width ; x++){
          for (var y = 0; y<imgData.height; y++) {
            var pos = (y * imgData.width + x)<<2;
            sommer += imgData.data[pos + 0];
            sommeg += imgData.data[pos + 1]
            sommeb += imgData.data[pos + 2];
            sommea += imgData.data[pos + 3];
          }
        }
  if (this.moyenner+this.moyenneg+this.moyenneb+this.moyennea != 0){
  this.moyenner = (this.moyenner + sommer/(imgData.height*imgData.width))/2
  this.moyenneg = (this.moyenneg + sommeg/(imgData.height*imgData.width))/2
  this.moyenneb = (this.moyenneb + sommeb/(imgData.height*imgData.width))/2
  this.moyennea = (this.moyennea + sommea/(imgData.height*imgData.width))/2
  }
  else {
    this.moyenner = sommer/(imgData.height*imgData.width)
    this.moyenneg = sommeg/(imgData.height*imgData.width)
    this.moyenneb = sommeb/(imgData.height*imgData.width)
    this.moyennea = sommea/(imgData.height*imgData.width)
  }
  
}

var pixels_features={};

/*
  pixels_features.mean_rgb
  - computes RGB mean of all pixels having A>0 within imageData
*/
pixels_features.mean_rgb=function(imageData,opt_options) {
  return pixels_features.mean_rgb_per_region(imageData,{x0:0,y0:0,dx:imageData.width,dy:imageData.height});
}

/*
  pixels_features.mean_rgb_per_region
  - computes RGB mean of all pixels having A>0 within opt_options.x0 .y0 .dx .dy
  - if opt_options missing partially,
      replace partially with defaults 0, 0, imageData.width, imageData.height
  - returns undefined if none available
*/
pixels_features.mean_rgb_per_region=function(imageData,opt_options) {
  x0=opt_options&&opt_options.x0?opt_options.x0:0;
  y0=opt_options&&opt_options.y0?opt_options.y0:0;
  dx=opt_options&&opt_options.dx?opt_options.dx:imageData.width;
  dy=opt_options&&opt_options.dy?opt_options.dy:imageData.height;


  //BLOC1
  // calcule la moyenne RGB des pixels d'une région de l'image délimitée par x0,y0,dx,dy
  // On ajoute la valeur de chaque couleur respectives pour chaque pixel visible (dont le a est supérieur à 0) à notre tableau et on incrémente le total des pixels.
  // Enfin on calcule la valeur moyenne des pixels de notre tableau.   
  var mean=[];
  mean[0]=0; mean[1]=0; mean[2]=0;
  var pos=0; var count=0;
  for (var y=y0;y<y0+dy;y++)
    for (var x=x0;x<x0+dx;x++) {
      pos=(y*imageData.width+x)<<2;
      if (imageData.data[pos+3]>0) {
        for (var i=0;i<3;i++) {
          mean[i]+=imageData.data[pos+i];
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



/*-------------------------Question 1.1 Tp2--------------------*/

pixels_features.mean_gray=function(imageData,opt_options) {
  return pixels_features.mean_gray_per_region(imageData,{x0:0,y0:0,dx:imageData.width,dy:imageData.height});
}

/*
  pixels_features.grid_mean_rgb
  - computes RGB mean of all pixels having A>0 in all grid cells
  - grid params are defined as opt_options.nb_lines x opt_options.nb_columns
  - returns a generic_features.grid_descriptor (grid.cells - array)
*/
pixels_features.grid_mean_rgb=function(imageData, opt_options) {

  //console.log("construct grid mean rgb");
  //console.log(opt_options);

  return generic_features.grid_descriptor(imageData,
    pixels_features.mean_rgb_per_region,
    opt_options);
}

pixels_features.mean_gray_per_region=function(imageData,opt_options) {

  x0=opt_options&&opt_options.x0?opt_options.x0:0;
  y0=opt_options&&opt_options.y0?opt_options.y0:0;
  dx=opt_options&&opt_options.dx?opt_options.dx:imageData.width;
  dy=opt_options&&opt_options.dy?opt_options.dy:imageData.height;
 
  var sommeRGB=0;
  var mean =0;
  var pos=0; var count=0;
  for (var y=y0;y<y0+dy;y++)
    for (var x=x0;x<x0+dx;x++) {
      pos=(y*imageData.width+x)<<2;
      if (imageData.data[pos+3]>0) {
        for (var i=0;i<3;i++) {
          sommeRGB+=imageData.data[pos+i];
        }
        count++;
      }
    }
  if (count>0) { 
    mean=Math.round(sommeRGB/count);
    return mean;
  }
  return undefined;
}
pixels_features.grid_mean_gray=function(imageData, opt_options) {

  //console.log("construct grid mean gray");
  //console.log(opt_options);

  return generic_features.grid_descriptor(imageData,
    pixels_features.mean_gray_per_region,
    opt_options);
}

/* ------------------------ Question 2.1 Tp2------------------*/
pixels_features.mean_gray_hist=function(imageData,opt_options) {
    return pixels_features.mean_gray_hist_per_region(imageData,{x0:0,y0:0,dx:imageData.width,dy:imageData.height});
}

pixels_features.mean_gray_hist_per_region=function(imageData,opt_options) {
    x0=opt_options&&opt_options.x0?opt_options.x0:0;
    y0=opt_options&&opt_options.y0?opt_options.y0:0;
    dx=opt_options&&opt_options.dx?opt_options.dx:imageData.width;
    dy=opt_options&&opt_options.dy?opt_options.dy:imageData.height;


  
  // calcule la moyenne en niveau de gris des pixels d'une région de l'image délimitée par x0,y0,dx,dy
  // On ajoute la valeur de chaque couleur respectives pour chaque pixel visible (dont le a est supérieur à 0) à notre tableau et on incrémente le total des pixels.
  // Enfin on calcule la valeur moyenne des pixels de notre tableau.   
  var mean=[];
    for(var d = 0; d < imageData.width*imageData.height; d++) {
        mean[d] = 0;
    }
    var hist = [0,0,0,0,0,0,0,0];

  var pos=0; var count=0;
  for (var y=y0;y<y0+dy;y++)
    for (var x=x0;x<x0+dx;x++) {
      pos=(y*imageData.width+x)<<2;
        if (imageData.data[pos+3]>0) {
        for (var i=0;i<3;i++) {
          mean[(y*imageData.width+x)]+=imageData.data[pos+i];
        }
          mean[(y*imageData.width+x)] = mean[(y*imageData.width+x)]/3;
        count++;
      }
    }
  if (count>0) {
      //console.log(mean);
    for (var i=0;i<mean.length;i++) {
        hist[Math.trunc(mean[i]/32)]++;
    }
      //console.log(hist);
    return hist;
  }
  return undefined;
}

pixels_features.grid_mean_gray_hist=function(imageData,opt_options) {
    //console.log("construct grid mean rgb");
  //console.log(opt_options);

  return generic_features.grid_descriptor(imageData,
    pixels_features.mean_gray_hist_per_region, opt_options);
  }

  /** ------------------------------------------Question 3.1 TP2------------ */

pixels_features.mean_RGB_hist=function(imageData,opt_options) {
  return pixels_features.mean_RGB_hist_per_region(imageData,{x0:0,y0:0,dx:imageData.width,dy:imageData.height});
}

pixels_features.mean_RGB_hist_per_region=function(imageData,opt_options) {
  x0=opt_options&&opt_options.x0?opt_options.x0:0;
  y0=opt_options&&opt_options.y0?opt_options.y0:0;
  dx=opt_options&&opt_options.dx?opt_options.dx:imageData.width;
  dy=opt_options&&opt_options.dy?opt_options.dy:imageData.height;


var sommeR=[];
var sommeG=[];
var sommeB=[];
var mean = [sommeR, sommeG, sommeB];
  for(var d = 0; d < imageData.width*imageData.height; d++) {
      sommeR[d] = 0;
      sommeG[d] = 0;
      sommeB[d] = 0;
  }
  var hist = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
  var pos=0; var count=0;
  for (var y=y0;y<y0+dy;y++)
    for (var x=x0;x<x0+dx;x++) {
      pos=(y*imageData.width+x)<<2;
      if (imageData.data[pos+3]>0) {
        sommeR[(y*imageData.width+x)]=imageData.data[pos];
        sommeG[(y*imageData.width+x)+1]=imageData.data[pos+1];
        sommeB[(y*imageData.width+x)+2]=imageData.data[pos+2];
        count++;
      }
    }
  if (count>0) {
    //console.log(hist);
    for (var rgb =0 ; rgb< 3 ; rgb++){
      for (var i=0;i<sommeR.length;i++) {
        hist[rgb][Math.trunc(mean[rgb][i]/32)]++;
      }
    }
    return hist;
  }
  return undefined;
}

pixels_features.grid_mean_RGB_hist=function(imageData,opt_options) {
  //console.log("construct grid mean rgb");
  //console.log(opt_options);

return generic_features.grid_descriptor(imageData,
  pixels_features.mean_RGB_hist_per_region, opt_options);
}



/*
  pixels_features.mean_rgb_afactor_per_region
  - computes RGB mean of all pixels considering A as a weight of RGB channels
  within opt_options.x0 .y0 .dx .dy
  - if opt_options missing partially,
      replace partially with defaults 0, 0, imageData.width, imageData.height
  - returns undefined if none available
*/
pixels_features.mean_rgb_afactor_per_region=function(imageData,opt_options) {
  x0=opt_options&&opt_options.x0?opt_options.x0:0;
  y0=opt_options&&opt_options.y0?opt_options.y0:0;
  dx=opt_options&&opt_options.dx?opt_options.dx:imageData.width;
  dy=opt_options&&opt_options.dy?opt_options.dy:imageData.height;


  var mean=[];
  mean[0]=0; mean[1]=0; mean[2]=0;
  var pos=0; var count=0;
  for (var y=y0;y<y0+dy;y++)
    for (var x=x0;x<x0+dx;x++) {
      pos=(y*imageData.width+x)<<2;
      for (var i=0;i<3;i++) {
        mean[i]+=(imageData.data[pos+i]*imageData.data[pos+3]);
      }
      count++;
    }
  if (count>0) {
      
    for (var i=0;i<3;i++) {
      mean[i]=Math.round(mean[i]/count);
      console.log(mean[i]);
    }
    return mean;
  }
  return undefined;
}


pixels_features.mean_rgb_afactor_per_region_circle=function(imageData,opt_options) {
  x0=opt_options&&opt_options.x0?opt_options.x0:0;
  y0=opt_options&&opt_options.y0?opt_options.y0:0;
  dx=opt_options&&opt_options.dx?opt_options.dx:imageData.width;
  dy=opt_options&&opt_options.dy?opt_options.dy:imageData.height;
  r=opt_options&&opt_options.r?opt_options.r:20;
 
  var Mx = (dx+x0);
  var My = (dy+y0);
  var mean=[];
  mean[0]=0; mean[1]=0; mean[2]=0;
  var pos=0; var count=0;
  for (var y=y0;y<y0+dy;y++)
    for (var x=x0;x<x0+dx;x++) {
      pos=(y*imageData.width+x)<<2;

      //On regarde si le point appartient au cercle
      if(Math.sqrt(Math.pow(x-Mx,2) + Math.pow(y-My,2))<=r) {
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

