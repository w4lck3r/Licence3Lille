var rgb_pixels_metrics={};

/*
    rgb_pixels_metrics.edist - computes euclidian distance between two rgb pixels
*/
rgb_pixels_metrics.edist=function(pixel_rgb1, pixel_rgb2) {
  var dist_fun=function(x,y){return x-y};

  //BLOC1
  //  Calcul des distances entre les descripteurs

  return generic_metrics.euclidian_distance_btw_feature_vectors(pixel_rgb1,pixel_rgb2,dist_fun);
}

/*
    rgb_pixels_metrics.grids_edist - computes euclidian distance between two grids
    containing in each cell an rgb pixel
*/
rgb_pixels_metrics.grid_edist=function(pixels_rgb_grid1, pixels_rgb_grid2) {
  var dist_fun=rgb_pixels_metrics.edist;

  //BLOC2
  // Calcul distance entre les descripteurs ( Grid )

  return generic_metrics.euclidian_distance_btw_feature_vectors(pixels_rgb_grid1.cells,
    pixels_rgb_grid2.cells,
    dist_fun);
}

/*
    rgb_pixel_metrics.edist_as_gray - computes euclidian distance between two rgb pixels considering them as gray pixels.
*/
rgb_pixels_metrics.edist_as_gray=function(pixel_rgb1, pixel_rgb2) {

  return Math.abs(pixel_rgb1[0] - pixel_rgb2[0]+
                  pixel_rgb1[1] - pixel_rgb2[1]+
                  pixel_rgb1[2] - pixel_rgb2[2])/3;
}

/*
    rgb_pixel_metrics.edist_as_bw - computes similarity between two rgb pixels considering them as B&W pixels. if both B or both W than distance=0 otherwise 255
*/
rgb_pixels_metrics.edist_as_bw=function(pixel_rgb1, pixel_rgb2) {
  var mean1=(pixel_rgb1[0]+pixel_rgb1[1]+pixel_rgb1[2]);
  var mean2=(pixel_rgb2[0]+pixel_rgb2[1]+pixel_rgb2[2]);

  return ((mean1==0 && mean2==0) || (mean1>0 && mean2>0))?0:255;
}
