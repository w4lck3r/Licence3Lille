var pixels_similarity={}

pixels_similarity.MeanGraySimilarityTask=function(dataset,opt_options) {
  this.__proto__.__proto__=new generic_similarity.SimilarityTask(
    dataset,
    pixels_features.mean_gray,
    pixel_metrics.gray_edist,
    opt_options
  );
}

pixels_similarity.GridMeanGraySimilarityTask=function(dataset,opt_options){
  this.__proto__.__proto__=new generic_similarity.SimilarityTask(
    dataset,
    pixels_features.grid_mean_gray,
    pixel_metrics.grid_gray_edist,
    opt_options
  );
}