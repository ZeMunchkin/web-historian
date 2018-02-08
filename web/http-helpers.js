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
  'GET': function(parsedUrl, res, path, req, contentType) {
    console.log('get');
    
    exports.serveAssets(res, parsedUrl, path, (data) => {
      exports.headers = contentType || 'text/html';
      res.writeHead(200, exports.headers);
      res.end(data);
    });

  },
  
  
  
  'POST': function(parsedUrl, res, path, req) {
    console.log('post');
    let data = [];
    req.on('data', function(chunk) {
      data.push(chunk);
    }).on('end', (chunk) => {
      if (chunk) {
        data.push(chunk);
      }
      data = data.concat().toString();
      
      var website = data.slice(4);
      console.log('website:', website);
      
      
      //is url archived?
      archive.isUrlArchived(website, (err, bool) => {
        if (err) {
          exports.respond(res, 404);
          
        // if yes
        } else if (bool) {
          exports.respond(res, 302, website);
          
        // if no
        } else {
          //is url already on the list?
          archive.isUrlInList(website, (err, bool) => {
            if (err) {
              exports.respond(res, 404);
              
            //if yes, write 303 response to make them 
            //load working on it page
            } else if (bool) {
              exports.respond(res, 302, 'loading.html');
              
            //if not on the list
            } else {
              //add url to list
              archive.addUrlToList(website, (err) => {
                if (err) {
                  exports.respond(res, 404);
                //write response
                } else {
                  exports.respond(res, 302, 'loading.html');
                }
              });
            }
          });
        }
      });
    });
  },
  
  
  
  
  
  
  
  'OPTIONS': function(parsedUrl, res, path) {

  }
};

exports.respond = function (res, statusCode, data, contentType) {
  exports.headers['Content-Type'] = contentType || 'text/html';
  res.writeHead(statusCode, exports.headers);
  if (data) {
    res.end(data);
  } else {
    res.end();
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
      console.error(err);
    } else {
      callback(data);
    }
    
  });
  
};



// As you progress, keep thinking about what helper functions you can put here!
