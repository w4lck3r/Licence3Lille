var rgb_pixels_similarity={}

/*
rgb_pixels_similarity.MeanSimilarityTask

Task that allows similarity measures between a source image and a collection of
images contained in a Dataset object. The similartiy is measured considering the pixels_features.mean_rgb descriptor and the pixel_metrics.rgb_edist metric.

This task inherits from generic_similarity.SimilarityTask and, upon processing
an imgData object using
rgb_pixels_similarity.MeanSimilarityTask.prototype.process(imgData),
it provides the list of most similar images to imgData within the dataset.
*/

rgb_pixels_similarity.MeanSimilarityTask=function(dataset,opt_options) {
  this.generic_sim=new generic_similarity.SimilarityTask(
    dataset,
    rgb_pixels_features.mean,
    rgb_pixels_metrics.edist,
    opt_options
  );
  this.dataset=dataset;
}

rgb_pixels_similarity.MeanSimilarityTask.prototype.process=function(in_imageData) {
  return this.generic_sim.process(in_imageData);
}

rgb_pixels_similarity.MeanSimilarityTask.prototype.process_descriptor=function(in_descriptor) {
  return this.generic_sim.process_descriptor(in_descriptor);
}

/*
rgb_pixels_similarity.GridMeanSimilarityTask

Task that allows similarity measures between a source image and a collection of
images contained in a Dataset object. The similartiy is measured considering
the rgb_pixels_features.grid_mean descriptor and
the  rgb_pixels_metrics.grid_edist metric
in each cell of a rectangular Grid.

This task inherits from generic_similarity.SimilarityTask and, upon processing
an imgData object using
rgb_pixels_similarity.GridMeanSimilarityTask.prototype.process(imgData),
it provides the list of most similar images to imgData within the dataset.
*/

rgb_pixels_similarity.GridMeanSimilarityTask=function(dataset,opt_options){
  this.generic_sim=new generic_similarity.SimilarityTask(
      dataset,
      rgb_pixels_features.grid_mean,
      rgb_pixels_metrics.grid_edist,
      opt_options
    );
  this.dataset=dataset;
}

rgb_pixels_similarity.GridMeanSimilarityTask.prototype.process_descriptor=
function(in_descriptor) {
  return this.generic_sim.process_descriptor(in_descriptor);
}

rgb_pixels_similarity.GridMeanSimilarityTask.prototype.process=
function(in_imageData) {
  return this.generic_sim.process(in_imageData);
}
