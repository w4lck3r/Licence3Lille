GetPixelRGBATask=function(opt_options) {
  this.x=opt_options.x;
  this.y=opt_options.y;
  this.output=opt_options.output;
}

GetPixelRGBATask.prototype.process=function(imageData) {
  var pos=(this.y*imageData.width+this.x)<<2;
  var r=imageData.data[pos];
  var g=imageData.data[pos+1];
  var b=imageData.data[pos+2];
  var a=imageData.data[pos+3];

  this.output.innerHTML=this.x+"x"+this.y+" : ";
  this.output.innerHTML+="<font color='red'>"+r+"</font> | ";
  this.output.innerHTML+="<font color='green'>"+g+"</font> | ";
  this.output.innerHTML+="<font color='blue'>"+b+"</font> | ";
  this.output.innerHTML+="<font color='gray'>"+a+"</font>";
  
  return [r,g,b,a];
}

etMeanPixelRGBATask=function(opt_options) {
  if (opt_options && opt_option.output_id)
    this.output=document.getElementById(opt_options.output_id);
}

GetMeanPixelRGBATask.prototype.process=function(imageData) {
    if (imageData.width==0)
      return;

    var mean=pixels_features.computeRGBMeanPixel(imageData);
    if (this.output) {
      this.output.style="background-color:rgb("+mean[0]+","+mean[1]+","+mean[2]+")";
      this.output.innerHTML="{r:"+mean[0]+";";
      this.output.innerHTML+="g:"+mean[1]+";";
      this.output.innerHTML+="b:"+mean[2]+"}";
    }
    return mean;
}
