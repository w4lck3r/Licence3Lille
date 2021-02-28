var morpho_effects={}

// récupération des dimensions de la fenêtre. 
morpho_effects.DilatationWindow = function(opt_options) {
  this.window_width=opt_options.window_width;
  this.window_height=opt_options.window_height;
}

// Application du filtre qui récupére le pixels avec la valeur RGBA la plus grande 
// Pour tout pixel de l'image on remplace la valeur initiale par celle du filtre.
morpho_effects.DilatationWindow.prototype.process=function(in_imgData,out_imgData) {
  return generic_effect.apply_region_filter(
      in_imgData,out_imgData,this.window_width,this.window_height,
      morpho_filters.max_from_region
    );
}
// récupération des dimensions de la fenêtre. 
morpho_effects.ErosionWindow = function(opt_options) {
  this.window_width=opt_options.window_width;
  this.window_height=opt_options.window_height;
}
// Application du filtre qui récupére le pixels avec la valeur RGBA la plus faible 
// Pour tout pixel de l'image on remplace la valeur initiale par celle du filtre.
morpho_effects.ErosionWindow.prototype.process=function(in_imgData,out_imgData) {
  generic_effect.apply_region_filter(
      in_imgData,out_imgData,this.window_width,this.window_height,
      morpho_filters.min_from_region);
}

// création d'un élément canvas dans la page html et récupérations des dimensions de l'image dilatée et érodée
morpho_effects.DilatationErosionWindow = function(opt_options) {
  this.dilatation_width=opt_options.dilatation_width;
  this.dilatation_height=opt_options.dilatation_height;
  this.erosion_width=opt_options.erosion_width;
  this.erosion_height=opt_options.erosion_height;
  this.aux_cvs=document.createElement("canvas");
}
// Une dilatation de l'image suivie d'une érosion. 
morpho_effects.DilatationErosionWindow.prototype.process=function(in_imgData,out_imgData) {
  aux_imgData ={data:[],width:out_imgData.width,height:out_imgData.height};
  // Application du filtre qui récupère le pixel avec la valeur RGBA la plus grande 
  // Pour tout pixel de l'image on remplace la valeur initiale par celle du filtre.
  generic_effect.apply_region_filter(
      in_imgData,aux_imgData,this.dilatation_width,this.dilatation_height,
      morpho_filters.max_from_region);
  // Application du filtre qui récupére le pixel avec la valeur RGBA la plus faible 
  // Pour tout pixel de l'image on remplace la valeur initiale par celle du filtre.
  generic_effect.apply_region_filter(
      aux_imgData,out_imgData,this.erosion_width,this.erosion_height,
      morpho_filters.min_from_region);
}

// récupération des dimensions de la fenêtre. 
morpho_effects.DilatationPlusWindow = function(opt_options) {
  this.window_width=opt_options.window_width;
  this.window_height=opt_options.window_height;
}

// Application du filtre qui récupére le pixel avec la valeur RGBA la plus grande 
// Pour tout pixel de l'image on remplace la valeur initiale par celle du filtre.
morpho_effects.DilatationPlusWindow.prototype.process=function(in_imgData,out_imgData) {
  return generic_effect.apply_region_filter(
      in_imgData,out_imgData,this.window_width,this.window_height,
      morpho_filters.max_from_region_plus
    );
}

morpho_effects.ErosionPlusWindow = function(opt_options) {
  this.window_width=opt_options.window_width;
  this.window_height=opt_options.window_height;
}
// Application du filtre qui récupére le pixel avec la valeur RGBA la plus faible 
// Pour tout pixel de l'image on remplace la valeur initiale par celle du filtre.
morpho_effects.ErosionPlusWindow.prototype.process=function(in_imgData,out_imgData) {
  generic_effect.apply_region_filter(
      in_imgData,out_imgData,this.window_width,this.window_height,
      morpho_filters.min_from_region_plus);
     
}
