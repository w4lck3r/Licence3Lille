var pixel_metrics={};

/*
    pixel_metrics.rgb_edist - computes euclidian distance between two rgb pixels
*/
pixel_metrics.rgb_edist=function(pixel_rgb1, pixel_rgb2) {
  var dist_fun=function(x,y){return x-y};

    //console.log(pixel_rgb2);
  //BLOC1
  // Utilise la fonction de comparaison pour comparer les pixels et renvoie la distance euclidienne entre deux pixels différents. 
  return generic_metrics.euclidian_distance_btw_feature_vectors(pixel_rgb1,pixel_rgb2,dist_fun);
}

/*
    pixel_metrics.rgb_edist - computes euclidian distance between two grids
    containing in each cell an rgb pixel
*/
pixel_metrics.grid_rgb_edist=function(pixels_rgb_grid1, pixels_rgb_grid2) {
  var dist_fun=pixel_metrics.rgb_edist;

  //BLOC2
  // Utilise la fonction de comparaison pour comparer les tableaux de pixels et renvoie la distance euclidienne entre deux tableaux de pixels différents. 

  return generic_metrics.euclidian_distance_btw_feature_vectors(pixels_rgb_grid1.cells,pixels_rgb_grid2.cells,dist_fun);
    
}




/*----------------------------------Question 1.2 TP2 -------------------------*/

/*
    pixel_metrics.gray_edist - computes euclidian distance between two gray pixels
*/
pixel_metrics.gray_edist=function(pixel_gray1, pixel_gray2) {
  var dist_fun=function(x,y){return x-y};
  var tableau1 =[];
  tableau1.push(pixel_gray1);
  var tableau2 =[];
  tableau2.push(pixel_gray2); 
  var resultat =generic_metrics.euclidian_distance_btw_feature_vectors(tableau1,tableau2,dist_fun) 
  return resultat;
}

/*
    pixel_metrics.gray_edist - computes euclidian distance between two grids
    containing in each cell an rgb pixel
*/
pixel_metrics.grid_gray_edist=function(pixels_gray_grid1, pixels_gray_grid2) {
  var dist_fun=pixel_metrics.gray_edist;

  
  return generic_metrics.euclidian_distance_btw_feature_vectors(pixels_gray_grid1.cells,pixels_gray_grid2.cells,dist_fun);
}
/* --------------------------------------Question 2.2 TP2 -------------------------------*/
pixel_metrics.gray_hist_edist=function(pixel_gray_hist1,pixel_gray_hist2) {
  var dist_fun=function(x,y) {
      return x-y;
  }
  var multiplier = 0;
  for(var i = 0; i < pixel_gray_hist2.length; i++) {
      multiplier+= pixel_gray_hist2[i];
  }
    var divider = 0;
  for(var i = 0; i < pixel_gray_hist1.length; i++) {
      divider+= pixel_gray_hist1[i];
  }
    multiplier = multiplier/divider;
  var mult = function(x) {return x * multiplier;}
  
  var pixel_gray_histM = pixel_gray_hist1.map(mult);
  return generic_metrics.euclidian_distance_btw_feature_vectors(pixel_gray_histM,pixel_gray_hist2,dist_fun);
}


pixel_metrics.grid_gray_hist_edist=function(pixel_gray_hist1, pixel_gray_hist2) {
var dist_fun=pixel_metrics.gray_hist_edist;


return generic_metrics.euclidian_distance_btw_feature_vectors(pixel_gray_hist1.cells,pixel_gray_hist2.cells,dist_fun);
  
}
/*----------------------------------------Question 3.2 TP2------------------------------------*/
pixel_metrics.rgb_hist_edist=function(pixel_rgb_hist1,pixel_rgb_hist2) {
  var dist_fun=function(x,y) {
      return x-y;
      //return Math.max(x) - Math.max(y);
  }
  var multiplier = 0;
  for(var i = 0; i < pixel_rgb_hist2[0].length; i++) {
      multiplier+= pixel_rgb_hist2[0][i];
  }
    var divider = 0;
  for(var i = 0; i < pixel_rgb_hist1[0].length; i++) {
      divider+= pixel_rgb_hist1[0][i];
  }
    multiplier = multiplier/divider;
  var multArray = function(x) {
      x.map(mult);
  }
    var mult = function(x) {return x * multiplier;}
  console.log(pixel_rgb_hist1);
  var pixel_rgb_histM = pixel_rgb_hist1.map(multArray);
  var metricsR =  generic_metrics.euclidian_distance_btw_feature_vectors(pixel_rgb_histM[0],pixel_rgb_hist2[0],dist_fun);
  var metricsG =  generic_metrics.euclidian_distance_btw_feature_vectors(pixel_rgb_histM[1],pixel_rgb_hist2[1],dist_fun);
  
  var metricsB =  generic_metrics.euclidian_distance_btw_feature_vectors(pixel_rgb_histM[2],pixel_rgb_hist2[2],dist_fun);
  
  return (metricsR + metricsG + metricsB)/3
}

pixel_metrics.grid_rgb_hist_edist=function(pixel_rgb_hist1, pixel_rgb_hist2) {
var dist_fun=pixel_metrics.rgb_hist_edist;
return generic_metrics.euclidian_distance_btw_feature_vectors(pixel_rgb_hist1.cells,pixel_rgb_hist2.cells,dist_fun);
}

/*
    pixel_metrics.gray_rgb_edist - computes euclidian distance between two rgb pixels considering them as gray pixels.
*/
pixel_metrics.gray_rgb_edist=function(pixel_rgb1, pixel_rgb2) {

  return Math.abs(pixel_rgb1[0] - pixel_rgb2[0]+
                  pixel_rgb1[1] - pixel_rgb2[1]+
                  pixel_rgb1[2] - pixel_rgb2[2])/3;
}

/*
    pixel_metrics.gray_rgb_edist - computes euclidian distance between two rgb pixels considering them as gray pixels.
*/
pixel_metrics.gray_rgb_edist=function(pixel_rgb1, pixel_rgb2) {

  return Math.abs(pixel_rgb1[0] - pixel_rgb2[0]+
                  pixel_rgb1[1] - pixel_rgb2[1]+
                  pixel_rgb1[2] - pixel_rgb2[2])/3;
}

/*
    pixel_metrics.visible_edist - computes similarity between two rgb pixels considering them as B&W pixels. if both B or both W than distance=0 otherwise 255
*/
pixel_metrics.visible_edist=function(pixel_rgb1, pixel_rgb2) {
  var mean1=(pixel_rgb1[0]+pixel_rgb1[1]+pixel_rgb1[2]);
  var mean2=(pixel_rgb2[0]+pixel_rgb2[1]+pixel_rgb2[2]);

  return ((mean1==0 && mean2==0) || (mean1>0 && mean2>0))?0:255;
}
