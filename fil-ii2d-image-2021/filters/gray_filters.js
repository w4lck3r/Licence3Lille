ToGrayTask = function (opt_options) {};

ToGrayTask.prototype.process = function (imageData) {
  let pixels = imageData.data;
  let w = 0;
  for (let i = 0; i < imageData.height; i++)
    for (let j = 0; j < imageData.width; j++) {
      let mean = (pixels[w + 1] + pixels[w + 2] + pixels[w + 3]) / 3;
      pixels[w] = mean;
      pixels[w + 1] = mean;
      pixels[w + 2] = mean;
      w += 4;
    }
};

PartialGrayTask = function (opt_options) {
  this.reg_x = opt_options.reg_x;
  this.reg_y = opt_options.reg_y;
  this.reg_w = opt_options.reg_w;
  this.reg_h = opt_options.reg_h;
};

PartialGrayTask.prototype.process = function (imageData) {
  let pixels = imageData.data;
  for (let i = this.reg_y; i < this.reg_y + this.reg_h; i++)
    for (let j = this.reg_x; j < this.reg_x + this.reg_w; j++) {
      let pos = (i * imageData.width + j) << 2;
      let mean = (pixels[pos + 1] + pixels[pos + 2] + pixels[pos + 3]) / 3;
      pixels[pos] = mean;
      pixels[pos + 1] = mean;
      pixels[pos + 2] = mean;
    }
};

RandomPartialGrayTask = function (opt_options) {
  this.reg_x = opt_options.reg_x;
  this.reg_y = opt_options.reg_y;
  this.reg_w = opt_options.reg_w;
  this.reg_h = opt_options.reg_h;
  this.cvs_w = opt_options.cvs_w;
  this.cvs_h = opt_options.csv_h;
};

RandomPartialGrayTask.prototype.process = function (imageData) {
  let pixels = imageData.data;
  for (let i = this.reg_y; i < this.reg_y + this.reg_h; i++)
    for (let j = this.reg_x; j < this.reg_x + this.reg_w; j++) {
      let pos = (i * imageData.width + j) << 2;
      let mean = (pixels[pos + 1] + pixels[pos + 2] + pixels[pos + 3]) / 3;
      pixels[pos] = mean;
      pixels[pos + 1] = mean;
      pixels[pos + 2] = mean;
    }
};

RandomPartialGrayTask.prototype.random_focus = function () {
  this.reg_y = Math.trunc(Math.random() * (this.cvs_h - this.reg_h));
  this.reg_x = Math.trunc(Math.random() * (this.cvs_w - this.reg_w));
};

ToGrayIfRInfGorBTask = function (opt_options) {};

ToGrayIfRInfGorBTask.prototype.process = function (imageData) {
  let pixels = imageData.data;
  let w = 0;
  for (let i = 0; i < imageData.height; i++)
    for (let j = 0; j < imageData.width; j++) {
      if (pixels[w] < pixels[w + 1] || pixels[w] < pixels[w + 2]) {
        let mean = (pixels[w] + pixels[w + 1] + pixels[w + 2]) / 3;
        pixels[w] = mean;
        pixels[w + 1] = mean;
        pixels[w + 2] = mean;
      }
      w += 4;
    }
};

ToGrayDiffWTask = function (opt_options) {};

ToGrayDiffWTask.prototype.process = function (imageData) {
  let pixels = imageData.data;
  let w = 0;
  for (let i = 0; i < imageData.height; i++)
    for (let j = 0; j < imageData.width; j++) {
      let mean =
        pixels[w] * (0.2 + Math.random() * 0.25) +
        pixels[w + 1] * (0.2 + Math.random() * 0.25) +
        (pixels[w + 2] * 1 -
          (0.2 + Math.random() * 0.25) -
          (0.2 + Math.random() * 0.25));
      pixels[w] = mean;
      pixels[w + 1] = mean;
      pixels[w + 2] = mean;
      w += 4;
    }
};

InverseRB = function (opt_options) {};

InverseRB.prototype.process = function (imageData) {
  let pixels = imageData.data;
  let w = 0;
  let aux;
  for (let i = 0; i < imageData.height; i++) {
    for (let j = 0; j < imageData.width; j++) {
      aux = pixels[w];
      pixels[w] = pixels[w + 2];
      pixels[w + 2] = aux;
      w += 4;
    }
  }
};

ToGrayDifferentPoid = function (opt_options) {
  this.poid_rouge = 0.2 + Math.random() * 0.25;
  this.poid_vert = 0.2 + Math.random() * 0.25;
  this.poid_bleu = 1 - this.poid_rouge - this.poid_vert;
};

ToGrayDifferentPoid.prototype.process = function (imageData) {
  let pixels = imageData.data;
  let w = 0;
  for (let i = 0; i < imageData.height; i++)
    for (let j = 0; j < imageData.width; j++) {
      let mean =
        pixels[w] * this.poid_rouge +
        pixels[w + 1] * this.poid_vert +
        pixels[w + 2] * this.poid_bleu;
      pixels[w] = mean;
      pixels[w + 1] = mean;
      pixels[w + 2] = mean;
      w += 4;
    }
};
ToGrayExceptDisPointXY = function (opt_options) {
  this.dist = opt_options.dist;
};

ToGrayExceptDisPointXY.prototype.process = function (imageData) {
  this.x = Math.round(Math.random() * imageData.width);
  this.y = Math.round(Math.random() * imageData.height);
  console.log(this.x, this.y, this.dist);
  let pixels = imageData.data;
  let DistPoint;
  let w;
  for (let i = 0; i < imageData.height; i++) {
    for (let j = 0; j < imageData.width; j++) {
      DistPoint = Math.sqrt(Math.pow(this.x - j, 2) + Math.pow(this.y - i, 2));
      if (DistPoint < this.dist) {
        let mean = (pixels[w + 1] + pixels[w + 2] + pixels[w + 3]) / 3;
        pixels[w] = mean;
        pixels[w + 1] = mean;
        pixels[w + 2] = mean;
      }
      w += 4;
    }
  }
};


ToGrayExceptDistancePointXYMoveTask = function (opt_options) {
  this.dist = opt_options.dist;
  this.x =  this.dist + Math.random() * (opt_options.image.width - 2 * this.dist)+ this.dist;
  this.y = this.dist + Math.random() * (opt_options.image.height - 2 * this.dist);
  this.moveX = Math.random() + 1;
  this.moveY = Math.random() + 1;
 
};

ToGrayExceptDistancePointXYMoveTask.prototype.process = function (imageData) {
  var pixels = imageData.data;
  var w = 0;
  var distanceToPoint;
  for (var i = 0; i < imageData.height; i++) {
    for (var j = 0; j < imageData.width; j++) {
      distanceToPoint = Math.sqrt(
        Math.pow(this.x - j, 2) + Math.pow(this.y - i, 2)
      );
      if (distanceToPoint > this.dist) {
        var mean = (pixels[w + 1] + pixels[w + 2] + pixels[w + 3]) / 3;
        pixels[w] = mean;
        pixels[w + 1] = mean;
        pixels[w + 2] = mean;
      }
      w += 4;
    }
  }
  this.x += this.moveX;
  this.y += this.moveY;
  if (this.x < this.dist || this.x > imageData.width - this.dist) {
    this.x -= this.moveX;//old position
    this.moveX = -1 * this.moveX;
    this.x += this.moveX;//new position
  }
  if (this.y < this.dist || this.y > imageData.height - this.dist) {
    this.y -= this.moveY;
    this.moveY = -1 * this.moveY;
    this.y += this.moveY;
  }
}

<<<<<<< HEAD
MagnificationToMoveTask = function (opt_options) {
  this.dist = opt_options.dist;
  this.x =this.dist + Math.min(Math.max(0 ,  Math.round(Math.random()*image.width-2) - 5),opt_options.image.width - 10);
  this.y = this.dist + Math.min(Math.max(0  , Math.round(Math.random()*image.height-2) - 5), opt_options.image.height - 10);
  this.moveX = Math.random() + 1;
  this.moveY = Math.random() + 1;

};

MagnificationToMoveTask.prototype.process = function (imageData) {
  var pixels = imageData.data;
  var w = 0;
  var distanceToPoint;
  for (var i = 0; i < imageData.height; i++) {
    for (var j = 0; j < imageData.width; j++) {
      distanceToPoint = Math.sqrt(
        Math.pow(this.x - j, 2) + Math.pow(this.y - i, 2)
      );
      if (distanceToPoint > this.dist) {
        var mean = (pixels[w + 1] + pixels[w + 2] + pixels[w + 3]) / 3;
        pixels[w] = mean;
        pixels[w + 1] = mean;
        pixels[w + 2] = mean;
      }
      w += 4;
    }
  }
  this.x += this.moveX;
  this.y += this.moveY;
  if (this.x < this.dist || this.x > imageData.width - this.dist) {
    this.x -= this.moveX;
    this.moveX = -1 * this.moveX;
    this.x += this.moveX;
  }
  if (this.y < this.dist || this.y > imageData.height - this.dist) {
    this.y -= this.moveY;
    this.moveY = -1 * this.moveY;
    this.y += this.moveY;
  }
};
=======
RandomPartialGrayTask.prototype.random_focus=function() {
    this.reg_y=Math.trunc(Math.random()*(this.cvs_h-this.reg_h));
    this.reg_x=Math.trunc(Math.random()*(this.cvs_w-this.reg_w));
}

ToGrayIfRInfGorBTask=function(opt_options) {}

ToGrayIfRInfGorBTask.prototype.process=function(imageData) {
  var pixels=imageData.data;
  var w=0;
  for (var i = 0; i < imageData.height; i++)
      for (var j = 0; j < imageData.width; j++) {
        if(pixels[w]<pixels[w+1] || pixels[w]<pixels[w+2]){
          var mean=(pixels[w]+pixels[w+1]+pixels[w+2])/3;
          pixels[w]=mean; pixels[w+1]=mean; pixels[w+2]=mean;
        }
        w+=4;
      }
}

ToGrayDiffWTask=function(opt_options) {
}

ToGrayDiffWTask.prototype.process=function(imageData) {
  var pixels=imageData.data;
  var w=0;
  for (var i = 0; i < imageData.height; i++)
      for (var j = 0; j < imageData.width; j++) {
        var mean=(pixels[w]*((0.2+Math.random()*0.25))+(pixels[w+1]*(0.2+Math.random()*0.25))+(pixels[w+2]*1 - (0.2+Math.random()*0.25) - (0.2+Math.random()*0.25)));
        pixels[w]=mean; pixels[w+1]=mean; pixels[w+2]=mean;
        w+=4;
      }
}
>>>>>>> b906e9129f4ea49935f7d6e029c876382e8fc9c7
