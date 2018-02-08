var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //console.log(req);
  const { method, url, headers, body } = req;

  let action = httpHelpers.actions[method];
  //if action ==> do action
  //else do something
  console.log('VALUES!!!!', method, url, headers, body);
  res.end(archive.paths.list);
};
