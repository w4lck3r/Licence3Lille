var pixels_features={};

/*
  pixels_features.mean_gray
  - calculer la moyenne grise des pixels  A>0 dans imageData
*/
pixels_features.mean_gray=function(imageData,opt_options) {
  return pixels_features.mean_gray_per_region(imageData,{x0:0,y0:0,dx:imageData.width,dy:imageData.height});
}

/*
  pixels_features.mean_gray_per_region
  - calcule la moyenne du Gris de tous les pixels ayant A> 0 dans opt_options.x0 .y0 .dx .dy
  - si opt_options manque partiellement,
      remplacer partiellement par les valeurs par défaut 0, 0, imageData.width, imageData.height
  - retourne undefined si aucun disponible


*/
pixels_features.mean_gray_per_region=function(imageData,opt_options) {
  x0=opt_options&&opt_options.x0?opt_options.x0:0;
  y0=opt_options&&opt_options.y0?opt_options.y0:0;
  dx=opt_options&&opt_options.dx?opt_options.dx:imageData.width;
  dy=opt_options&&opt_options.dy?opt_options.dy:imageData.height;


  var mean=[];
  mean[0]=0;
  var pos=0; var count=0;
  for (var y=y0;y<y0+dy;y++)
    for (var x=x0;x<x0+dx;x++) {
      pos=(y*imageData.width+x)<<2;
      if (imageData.data[pos+3]>0) {
        mean[0]+=Math.round((imageData.data[pos]+imageData.data[pos+1]+imageData.data[pos+2])/3);
        count++;
      }
    }
  if (count>0) {
    mean[0]=Math.round(mean[0]/count);
    return mean;
  }
  return undefined;
}

/*
  pixels_features.grid_mean_gray
  - calcule la moyenne des gris de tous les pixels ayant A> 0 dans toutes les cellules de la grille
  - les paramètres de grille sont définis comme opt_options.nb_lines * opt_options.nb_columns
  - renvoie un generic_features.grid_descriptor (grid.cells - array)
*/
pixels_features.grid_mean_gray=function(imageData,opt_options) {
  return generic_features.grid_descriptor(imageData,pixels_features.mean_gray_per_region,opt_options);
}