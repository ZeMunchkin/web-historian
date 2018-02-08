var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //console.log(req);
  const { method, headers, body } = req;
  const parsedUrl = url.parse(req.url);
  /*
  
  Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: '/' }
  */
  
  const pathName = parsedUrl.pathname;
  let action = httpHelpers.actions[method];
  //routes
  //if action ==> do action
  if (action && req.url === '/') {
    action('/index.html', res, 'siteAssets');
    
  } else if (action && req.url === '/styles.css') {
    action(pathName, res, 'siteAssets');
    
  }
  //catchall else if for if action & valid url
  
  //else if none of those work
  //send 404 back
  
  
  
  //post
  
    
    
  
  // else if (action && url === '/') {
  //   action('/public/index.html', req, res);
  // }
  //else do something else
  // console.log('VALUES!!!!', method, url, headers, body);
  // res.end(archive.paths.list);
};
