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

var circle_tracking={}

/*
circle_tracking.MeanShift - définit un prototype pour suivre le déplacement de l'objet contenu dans la boîte englobante ("bbox").
A chaque invocation de process, des regions rectangulaires sont générées autour de la bbox pour identifier un éventuel déplacement de l'objet contenu initialement dans la "bbox".
Afin d'assurer le suivi, des descripteurs pour décrire le contenu de la boîte englobante et des regions candidates pour la suite de suivi sont extraits avec la fonction "per_region_feature_func".
La similarité entre descripteurs est mesurée par  "metric_func"
*/
circle_tracking.MeanShift=function(bbox,per_region_feature_func,metric_func,opt_options){

  this.bbox=bbox;

  this.window_width=opt_options&&opt_options.window_width?opt_options.window_width:3*bbox.dx;
  this.window_height=opt_options&&opt_options.window_height?opt_options.window_height:3*bbox.dy;

  this.step_x=opt_options&&opt_options.step_x?opt_options.step_x:bbox.dx/3;
  this.step_y=opt_options&&opt_options.step_y?opt_options.step_y:bbox.dy/3;
  this.per_region_feature_func=per_region_feature_func;
  this.metric_func=metric_func;

  this.threshold=opt_options&&opt_options.threshold?opt_options.threshold:Number.MAX_SAFE_INTEGER;

  this.count=0;

  this.update_model=opt_options&&opt_options.update_model?opt_options.update_model:false;
}

circle_tracking.MeanShift.prototype.process=function(in_imgData,out_imgData) {
  var in_width=in_imgData.width, in_height=in_imgData.height;

  //BLOC 1
  // Si aucun descripteur n'est initialisé pour la région candidate, on les récupère avec la fonction per_region_feature_func 
  if (!this.bbox_feature) {
    var _opt_options=this.bbox;
    this.bbox_feature=this.per_region_feature_func(in_imgData,_opt_options);
  }


  //BLOC 2
  // Calcul de la taille de la région candidate
  this.pan_x=Math.round(this.window_width/2-this.bbox.dx/2);
  this.pan_y=Math.round(this.window_height/2-this.bbox.dy/2);


  //BLOC 3
  //Calcul du mouvement de la région.
  // on récupère la valeur de départ X_start et Y_start auquel on ajoute le mouvement de l'objet.
  // 
  var x_start=(this.bbox.x0-this.pan_x)>0?(this.bbox.x0-this.pan_x):0;
  var y_start=(this.bbox.y0-this.pan_y)>0?(this.bbox.y0-this.pan_y):0;
  var x_end=(this.bbox.x0+this.bbox.dx+this.pan_x) < in_width?
            (this.bbox.x0+this.pan_x)
            :(in_width-this.bbox.dx);
  var y_end=(this.bbox.y0+this.bbox.dy+this.pan_y)<in_height?
            this.bbox.y0+this.pan_y
            :(in_height-this.bbox.dy);

  var min=Number.MAX_SAFE_INTEGER;
  var min_bbox,min_bbox_feature;
  var count_y=in_imgData.height;

  //BLOC 4
  // redessine le premier conteneur sur le deuxième conteneur afin de pouvoir redessiner les carrés plus tard.
  if (out_imgData) {
    Tools.copy_partial_imageData_into_imageData(in_imgData,
                0,0,in_imgData.width,in_imgData.height,
                out_imgData,0,0);
    Tools.strokeBBox_on_imageData(out_imgData,{x0:x_start,y0:y_start,dx:x_end-x_start,dy:y_end-y_start},[64,64,64,255]);
  }

  //BLOC 5
  // dessine l'ensemble des carrés détecteurs de la région candidate sur le deuxième conteneur.
  for (var y=y_start;y<y_end;y+=this.step_y) {
    var count_x=0;
    for (var x=x_start;x<x_end;x+=this.step_x) {
      var local_bbox={
                    x0:(x+this.bbox.dx<in_width)?x:in_width-this.bbox.dx,
                    y0:(y+this.bbox.dy<in_height)?y:in_height-this.bbox.dy,
                    dx:this.bbox.dx,
                    dy:this.bbox.dy
                  }
      if (out_imgData) {
        Tools.copy_partial_imageData_into_imageData(in_imgData,
                    local_bbox.x0,local_bbox.y0,local_bbox.dx,local_bbox.dy,
                    out_imgData,count_x,count_y);
        Tools.strokeBBox_on_imageData(out_imgData,local_bbox,[0,64,64,255]);
     }

      //BLOC 6
      // Calcule la similarité de chaque carré avec le descripteur correspondant qui est déterminé par la fonction per_region_feature_func 
      // Récupère celle dont la différence est au minimum.
      var local_bbox_feature=this.per_region_feature_func(in_imgData,local_bbox);
      if (!local_bbox_feature) continue;
      var diff=this.metric_func(this.bbox_feature,local_bbox_feature);
      if (diff < min) {
        min=diff;
        min_bbox=local_bbox;
        min_bbox_feature=local_bbox_feature;
      }
      count_x+=this.bbox.dx;
    }
    count_y+=this.bbox.dy;
  }

  //BLOC 7
  // récupère l'image la plus similaire dont le taux de similarité ne dépasse le seuil et dessine le périmètre de l'image identifiée avec un carré rose.
  if (min < this.threshold && this.bbox!=min_bbox) {
      this.count++;
      this.bbox=min_bbox;
      if (this.update_model)
        this.bbox_feature=min_bbox_feature;
  }

  if (out_imgData) {
    Tools.strokeBBox_on_imageData(out_imgData,this.bbox,[255,0,255,255]);
  }
  return this.bbox;
}
