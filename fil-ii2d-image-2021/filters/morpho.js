var morpho_filters={}

morpho_filters.max_from_region=function(imgData,x0,y0,reg_width,reg_height) {

  // Récupération des pixels de l'image sur une région donnée.
  // On initialise la valeur maximale avec la somme des valeurs RGB multipliées par le coeff d'opacité.
  var pixels=imgData.data;
  var w=((y0+Math.round(reg_height/2))*imgData.width
                                        +(x0+Math.round(reg_width/2)))<<2;
  var max_data=[pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
  var max=(pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
  // Pour tout x0 et y0 positif on récupère le pixel aux coordonées x y 
  // on ajoute ensuite les valeurs RGB et multiplions la somme de ses valeurs par le coefficient d'opacité.
  // on compare la nouvelle valeur au max précedent et si elle est supérieur on actualise le maximum avec cette valeur.
  // Enfin on retourne la valeur maximale.
  for (var y=Math.max(0,y0);y<Math.min(y0+reg_height,imgData.height);y++)
    for (var x=Math.max(0,x0);x<Math.min(x0+reg_width,imgData.width);x++) {
      w = (y*imgData.width+x)<<2;
      var val = (pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
      if (max < val) {
        if (pixels[w+3]<255) pixels[w+3]=255;
        max = val; max_data = [pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
      }
    }
  return max_data;
}

morpho_filters.max_red_from_region=function(imgData,x0,y0,reg_width,reg_height) {
  // Récupération des pixels de l'image sur une région donnée.
  // On initialise la valeur maximale soustrayant les valeurs GB à R et en multipliant le tout par le coeff d'opacité.
  var pixels=imgData.data;
  var w=((y0+Math.round(reg_height/2))*imgData.width+(x0+Math.round(reg_width/2)))<<2;
  var max_data=[pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
  var max=(pixels[w]-pixels[w+1]-pixels[w+2])*pixels[w+3];
  // Pour tout x0 et y0 appartenant à l'image on récupère le pixel aux coordonnées x y.
  // On soustrait ensuite les valeurs GB à R et multiplions le tout par le coefficient d'opacité.
  // On compare la nouvelle valeur au max précedent et si elle est supérieur on actualise le maximum avec cette valeur.
  // Enfin on retourne la valeur maximale.
  for (var y=y0;y<y0+reg_height;y++) {
    if (y<0 || y>imgData.height) continue;
    for (var x=x0;x<x0+reg_width;x++) {
      if (x<0 || x>imgData.width) continue;
      w = (y*imgData.width+x)<<2;
      var val = (pixels[w]-pixels[w+1]-pixels[w+2])*pixels[w+3];
      if (max < val) {
        max = val;
        max_data=[pixels[w], pixels[w+1],
                  pixels[w+2], pixels[w+3]];
      }
    }
  }
  return max_data;
}

morpho_filters.max_gray_from_region=function(imgData,x0,y0,reg_width,reg_height) {
  
  // Récupération des pixels de l'image sur une région donnée.
  // On initialise la valeur maximale avec la somme des valeurs RGB multipliées par le coeff d'opacité.
  // On initialise le tableau max_data avec les valeurs du premier pixel pour chaque canal RGB.
  var pixels=imgData.data;
  var w=((y0+Math.round(reg_height/2))*imgData.width+(x0+Math.round(reg_width/2)))<<2;
  var max_data=[pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
  var max=(pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
  // Pour tout x0 et y0 appartenant à l'image on récupère le pixel aux coordonnées x y.
  // On ajoute ensuite les valeurs RGB et multiplions le tout par le coefficient d'opacité et terminous en divisant cette .
  // On compare la nouvelle valeur au max précedent et si elle est supérieur on actualise le maximum avec cette valeur et on actualise le tableau max_data avec la moyenne de la valeur calculé ainsi que le coef d'opacité.
  // Enfin on retourne la valeur maximale.
  for (var y=y0;y<y0+reg_height;y++) {
    if (y<0 || y>imgData.height) continue;
    for (var x=x0;x<x0+reg_width;x++) {
      if (x<0 || x>imgData.width) continue;
      w = (y*imgData.width+x)<<2;
      var val = (pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
      if (max < val) {
        max = val;
        max_data=[val/3, val/3,
                  val/3, pixels[w+3]];
      }
    }
  }
  return max_data;
}

morpho_filters.min_from_region=function(imgData,x0,y0,reg_width,reg_height) {
  // Récupération des pixels de l'image sur une région donnée.
  // On initialise la valeur minimale avec la somme des valeurs RGB multipliées par le coeff d'opacité.
  // On initialise le tableau min_data avec les valeurs du premier pixel pour chaque canal RGB.
  var pixels=imgData.data;
  var w=((y0+Math.round(reg_height/2))*imgData.width+(x0+Math.round(reg_width/2)))<<2;
  var min_data=[pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
  var min=(pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
 // Pour tout x0 et y0 appartenant à l'image on récupère le pixel aux coordonnées x y.
  // On ajoute ensuite les valeurs RGB et multiplions le tout par le coefficient d'opacité et terminous en divisant cette .
  // On compare la nouvelle valeur au min précedent et si elle est supérieur on actualise le minimum avec cette valeur et on actualise le tableau min_data avec la moyenne de la valeur calculé ainsi que le coef d'opacité.
  // Enfin on retourne la valeur minimale.
  for (var y=y0;y<y0+reg_height;y++) {
    if (y<0 || y>imgData.height) continue;
    for (var x=x0;x<x0+reg_width;x++) {
      if (x<0 || x>imgData.width) continue;
      w = (y*imgData.width+x)<<2;
      var val = (pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
      if (min > val) {
        min = val;
        min_data=[pixels[w], pixels[w+1],
                  pixels[w+2], pixels[w+3]];
      }
    }
  }
  return min_data;
}

morpho_filters.max_from_region_plus=function(imgData,x0,y0,reg_width,reg_height) {
  var pixels_oldy=y0+Math.round(reg_height/2);
  var pixels_oldx=x0+Math.round(reg_width/2);
  // Récupération des pixels de l'image sur une région donnée.
  // On initialise la valeur maximale avec la somme des valeurs RGB multipliées par le coeff d'opacité.
  var pixels=imgData.data;
  var w=(pixels_oldy*imgData.width+pixels_oldx)<<2;
  var max_data=[pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
  var max=(pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
  // Pour tout x0 et y0 positif on récupère le pixel aux coordonées x y 
  // on ajoute ensuite les valeurs RGB et multiplions la somme de ses valeurs par le coefficient d'opacité.
  // on compare la nouvelle valeur au max précedent et si elle est supérieur on actualise le maximum avec cette valeur.
  // Enfin on retourne la valeur maximale.
  for (var y=Math.max(0,y0);y<Math.min(y0+reg_height,imgData.height);y++){
    w = (y*imgData.width+pixels_oldx)<<2;
    var val = (pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
    if (max < val) {
      if (pixels[w+3]<255) pixels[w+3]=255;
      max = val; max_data = [pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
    }
  }
  for (var x=Math.max(0,x0);(x<Math.min(x0+reg_width,imgData.width));x++) {
    w = (pixels_oldy*imgData.width+x)<<2;
    var val = (pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
    if (max < val) {
      if (pixels[w+3]<255) pixels[w+3]=255;
      max = val; max_data = [pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
    }
  }
  return max_data;
}


morpho_filters.min_from_region_plus=function(imgData,x0,y0,reg_width,reg_height) {
 // console.log (reg_height);
  // Récupération des pixels de l'image sur une région donnée.
  // On initialise la valeur minimale avec la somme des valeurs RGB multipliées par le coeff d'opacité.
  // On initialise le tableau min_data avec les valeurs du pixel situé au centre de la zone a comparer pour chaque canal RGB.
  var pixels=imgData.data;
  var pixels_oldx=(x0+Math.round(reg_width/2));
  var pixels_oldy=(y0+Math.round(reg_height/2));
  var w=(pixels_oldy*imgData.width+pixels_oldx)<<2;
  var min_data=[pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
  var min=(pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
 // Pour tout x0 et y0 appartenant à l'image on récupère le pixel aux coordonnées x y.
  // On ajoute ensuite les valeurs RGB et multiplions le tout par le coefficient d'opacité et terminous en divisant cette .
  // On compare la nouvelle valeur au min précedent et si elle est supérieur on actualise le minimum avec cette valeur et on actualise le tableau min_data avec la moyenne de la valeur calculé ainsi que le coef d'opacité.
  // Enfin on retourne la valeur minimale.
  for (var y=y0;y<y0+reg_height;y++) {
    if (y<0 || y>imgData.height) continue;
    w = (y*imgData.width+pixels_oldx)<<2;
    var val = (pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
      if (min > val) {
        min = val;
        min_data=[pixels[w], pixels[w+1],
                  pixels[w+2], pixels[w+3]];
      }
  }
  for (var x=x0;x<x0+reg_width;x++) {
    if (x<0 || x>imgData.width) continue;
      w = (pixels_oldy*imgData.width+x)<<2;
      var val = (pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
      if (min > val) {
        min = val;
        min_data=[pixels[w], pixels[w+1],
                  pixels[w+2], pixels[w+3]];
      }
  }
  return min_data;
}
