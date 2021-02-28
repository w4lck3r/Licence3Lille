var pixel_metrics={};

/*
    pixel_metrics.rgb_edist - computes euclidian distance between two rgb pixels
*/
pixel_metrics.rgb_edist=function(pixel_rgb1, pixel_rgb2) {
  var dist_fun=function(x,y){return x-y};
  return generic_metrics.euclidian_distance_btw_feature_vectors(pixel_rgb1,pixel_rgb2,dist_fun);
}

/*
    pixel_metrics.grid_rgb_edist - computes euclidian distance between two grids
    containing in each cell an rgb pixel
*/
pixel_metrics.grid_rgb_edist=function(pixels_rgb_grid1, pixels_rgb_grid2) {
  var dist_fun=pixel_metrics.rgb_edist;
  return generic_metrics.euclidian_distance_btw_feature_vectors(pixels_rgb_grid1.cells,pixels_rgb_grid2.cells,dist_fun);
}

/*
    pixel_metrics.pixel_edist - computes euclidian distance between two pixels
    regardless of color encoding
*/
pixel_metrics.pixel_edist=function(pixel_rgb1, pixel_rgb2) {
  var dist_fun=function(x,y){return x-y};
  return generic_metrics.euclidian_distance_btw_feature_vectors(pixel_rgb1,pixel_rgb2,dist_fun);
}

/*
    pixel_metrics.gray_edist - computes euclidian distance between two pixels
    considering the intensity value
*/
pixel_metrics.gray_edist=function(pixel_rgb1, pixel_rgb2) {
  var pixel_gray_1=Math.round((pixel_rgb1[0]+pixel_rgb1[1]+pixel_rgb1[2])/3);
  var pixel_gray_2=Math.round((pixel_rgb2[0]+pixel_rgb2[1]+pixel_rgb2[2])/3);

  return Math.abs(pixel_gray_1-pixel_gray_2);
}

/*
    pixel_metrics.visible_edist - computes euclidian distance between two pixels
    considering the fact that pixels are both visible/invisible
    returns 0 or 1
*/
pixel_metrics.visible_edist=function(pixel_rgb1, pixel_rgb2) {
  var pixel_gray_1=Math.round((pixel_rgb1[0]+pixel_rgb1[1]+pixel_rgb1[2])/3);
  var pixel_gray_2=Math.round((pixel_rgb2[0]+pixel_rgb2[1]+pixel_rgb2[2])/3);
  return (pixel_gray_1>0 && pixel_gray_2>0) || (pixel_gray_1==0 && pixel_gray_2==0);

}
