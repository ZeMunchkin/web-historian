var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var parseURL = require('url');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile( exports.paths.list, function (err, data) {
    data = data.toString();
    var splitData = data.split('\n');
    callback(err, splitData);
  });
};

exports.isUrlInList = function(url, callback) {
  
  exports.readListOfUrls( function (err, splitData) {
    var bool = splitData.includes(url);
    callback(err, bool);
  });
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function (err, bool) {
    if (!bool) {
      exports.readListOfUrls( function (err, dataArray ) {
        dataArray.push(url);
        var stringData = dataArray.join('\n');
        fs.writeFile(exports.paths.list, stringData, callback);
      });
    } 
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readFile( exports.paths.archivedSites + '/' + url, function (err, data) {
    var bool = true;
    if (err) {
      bool = false;
    }
    callback(null, bool);
  });
};

exports.downloadUrls = function(urls) {
  
  //iterate through array of urls
  urls.forEach( url => {
    // make a GET request to url
    request(`http://${url}`, function success (err, response, body) {
    // write an fs file in sites folder using html data
      
      if (err) {
        console.error(err);
      }
      fs.writeFile( `${exports.paths.archivedSites}/${url}`, body, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
    
  });
  
};


















