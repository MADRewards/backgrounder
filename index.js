/*jshint multistr: true, node: true */
'use strict';

var backgrounder = require('backgrounder');
var express = require('express');
var fs = require('fs');
var q = require('q');

var app = module.exports = express();
var port = process.env.PORT || 8002;
var staticServer = './images';

app.use(express.static(staticServer));

app.get('/', function (req, res) {

  var showLogoOnCanvas = function (filename) {
    var deferred = q.defer();
    backgrounder({
      image: __dirname + '/images/' + filename,
      callback: function (color) {
        var rgb = 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
        deferred.resolve('\
          <div style="\
            background-color: ' + rgb + '; \
            float: left; \
            height: 200px;\
            position: relative;\
            width: 200px;\
            ">\
            <div style="\
              background-image: url(' + filename + '); \
              background-position: center; \
              background-repeat: no-repeat; \
              background-size: contain; \
              bottom: 0; \
              height: 60px; \
              left: 0; \
              margin: auto; \
              position: absolute; \
              right: 0; \
              top: 0; \
              width: 120px;\
              ">\
            </div>\
          </div>\
        ');
      }
    });
    return deferred.promise;
  };

  var promises = [];
  fs.readdir(staticServer,
    function (err, files) {
      for (var i = files.length - 1; i >= 0; i--) {
        promises.push(showLogoOnCanvas(files[i]));
      }
      q.all(promises).then(function (suggestions) {
        var html = '';
        for (var i = suggestions.length - 1; i >= 0; i--) {
          html += suggestions[i];
        }
        res.send(html);
      });
    });

});

app.listen(port, function () {
  return console.log('Listening on port ' + port);
});
