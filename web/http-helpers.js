var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.actions = {
  //get to home page
  'GET': function(parsedUrl, res, path) {
    console.log('get');
    
    exports.serveAssets(res, parsedUrl, path, (data) => {
      res.writeHead(200, exports.headers);
      res.end(data);
    });
    // fs.readFile(path, function(err, data) {
    //   if (err) { 
    //     console.error(err); 
    //     res.writeHead(404);
    //     res.end();
    //   } else {
    //     exports.serveAssets(res, path, function() {

    //     });
    //   }
  },
  'POST': function(parsedUrl, res, path) {
    console.log('post');
  },
  'OPTIONS': function(parsedUrl, res, path) {

  }
};

exports.serveAssets = function(res, asset, path, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  
  //find path of asset
  var path = archive.paths[path] + asset;
  
  fs.readFile(path, function (err, data) {
    if (err) {
      
    } else {
      callback(data);
    }
    
  });
  
};



// As you progress, keep thinking about what helper functions you can put here!
