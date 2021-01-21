var rgb_pixels_features={};

/*
  rgb_pixels_features.mean_per_region
  - computes RGB mean of all pixels having A>0 within opt_options.x0 .y0 .dx .dy
  - if opt_options missing partially,
      replace partially with defaults 0, 0, imageData.width, imageData.height
  - returns undefined if none available
*/
rgb_pixels_features.mean_per_region=function(imageData,opt_options) {
  x0=opt_options&&opt_options.x0?opt_options.x0:0;
  y0=opt_options&&opt_options.y0?opt_options.y0:0;
  dx=opt_options&&opt_options.dx?opt_options.dx:imageData.width;
  dy=opt_options&&opt_options.dy?opt_options.dy:imageData.height;


  //BLOC1
  //on parcours les pixels visibles et on retroune leurs moyenne 
  var mean=[];
  mean[0]=0; mean[1]=0; mean[2]=0;
  var pos=0; var count=0;
  for (var y=y0;y<y0+dy;y++)
    for (var x=x0;x<x0+dx;x++) {
      pos=(y*imageData.width+x)<<2;// décalage binaire de 2 ( * 2 )
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

/*
  rgb_pixels_features.mean
  - computes RGB mean of all pixels having A>0 within imageData
*/
rgb_pixels_features.mean=function(imageData,opt_options) {
  return rgb_pixels_features.mean_per_region(imageData,{x0:0,y0:0,dx:imageData.width,dy:imageData.height});
}

/*
  rgb_pixels_features.grid_mean
  - computes RGB mean of all pixels having A>0 in all grid cells
  - grid params are defined as opt_options.nb_lines x opt_options.nb_columns
  - returns a generic_features.grid_descriptor (grid.cells - array)
*/
rgb_pixels_features.grid_mean=function(imageData, opt_options) {

  console.log("construct grid mean rgb");
  console.log(opt_options);

  return generic_features.grid_descriptor(imageData,
    rgb_pixels_features.mean_per_region,
    opt_options);
}
