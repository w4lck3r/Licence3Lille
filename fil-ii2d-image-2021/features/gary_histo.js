var pixels_features={};

/*
  pixels_features.mean_hist_gray
  - computes HistGray mean of all pixels having A>0 within imageData
*/
pixels_features.mean_hist_gray=function(imageData,opt_options) {
  return pixels_features.mean_hist_gray_per_region(imageData,{x0:0,y0:0,dx:imageData.width,dy:imageData.height});
}

/*
  pixels_features.mean_hist_gray_per_region
  - computes HistGray mean of all pixels having A>0 within opt_options.x0 .y0 .dx .dy
  - if opt_options missing partially,
      replace partially with defaults 0, 0, imageData.width, imageData.height
  - returns undefined if none available
*/
pixels_features.mean_hist_gray_per_region=function(imageData,opt_options) {
  x0=opt_options&&opt_options.x0?opt_options.x0:0;
  y0=opt_options&&opt_options.y0?opt_options.y0:0;
  dx=opt_options&&opt_options.dx?opt_options.dx:imageData.width;
  dy=opt_options&&opt_options.dy?opt_options.dy:imageData.height;
  
  var nb_bins = 8;
  var etendue = 256/nb_bins;
  var hist_Gray=[];
  for (var i=0; i<nb_bins; i++){
    hist_Gray[i]=0;
  }
  var gray;
  var no_bin;
  var pos=0; var count=0;
  for (var y=y0;y<y0+dy;y++)
    for (var x=x0;x<x0+dx;x++) {
      pos=(y*imageData.width+x)<<2;
      if (imageData.data[pos+3]>0) {
        gray = Math.round((imageData.data[pos]+imageData.data[pos+1]+imageData.data[pos+2])/3);
        no_bin =Math.trunc(gray/etendue);
        hist_Gray[no_bin]++;
        count++;
      }
    }
  if (count>0) {
    return hist_Gray;
  }
  return undefined;
}

/*
  pixels_features.grid_mean_hist_gray
  - computes HistGray mean of all pixels having A>0 in all grid cells
  - grid params are defined as opt_options.nb_lines*opt_options.nb_columns
  - returns a generic_features.grid_descriptor (grid.cells - array)
*/
pixels_features.grid_mean_hist_gray=function(imageData,opt_options) {
  return generic_features.grid_descriptor(imageData,pixels_features.mean_hist_gray_per_region,opt_options);
}
