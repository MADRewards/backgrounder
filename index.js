/* global console, module, require */

module.exports = function (params) {
  'use strict';
  var gm = require('gm');
  var defaults = {
    image: './path/to/image/foo.gif', // supports gif, png, jpg
    x: 2, // x, y: Coordintes from the top left corner for color sample
    y: 2,
    width: 2, // width, height: Span of the area to sample and average
    height: 2,
    callback: function (rgb) {
      console.log('Done! rgb:' + rgb);
    }
  };

  for (var property in defaults) {
    if (!params.hasOwnProperty(property)) {
      params[property] = defaults[property];
    }
  }

  var getSize = function (callback) {
    gm(params.image)
      .size(function (err, value) {
        console.log(value);
        callback(value);
      });
  }
  getSize(function () {});

  var trimEdges = function () {
    gm(params.image)
      .crop(params.width, params.height, params.x, params.y)
  }

  var cropToOnePixel =
    function (callback) {
      gm(params.image)
        .crop(params.width, params.height, params.x, params.y)
        .colorspace('RGB')
        .toBuffer('JPG', function (err, buffer) {
          callback(buffer);
        });
    };

  var getAverageCanvasColor = function (buffer, callback) {
    gm(buffer, 'image.jpg')
      .identify(function (err, data) {
        var rgb = [];
        if (data.hasOwnProperty('Channel Statistics')) {
          var stats = data['Channel Statistics'];
          if (
            stats.hasOwnProperty('Gray') &&
            !stats.hasOwnProperty('Red')
          ) {
            rgb = ['Gray', 'Gray', 'Gray'];
          } else {
            rgb = ['Red', 'Green', 'Blue'];
          }
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = Math.round(
              stats[rgb[i]].Mean.split(' ')[0]
            );
          }
        } else {
          rgb = [255, 255, 255];
        }
        callback(rgb);
      });
  };

  cropToOnePixel(function (buffer) {
    getAverageCanvasColor(buffer, function (rgb) {
      params.callback(rgb);
    });
  });
};
