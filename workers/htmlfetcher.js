var helpers = require('../helpers/archive-helpers');

//checks if anything on the sites archive list
helpers.readListOfUrls(function(err, list) {
  if (err) {
    console.error(err);
  } else {
    helpers.downloadUrls(list);
  }
});

fs.writeFile(helpers.paths.list, '', function(err) {
  if (err) {
    console.error(err);
  }
});
// if so, download all html files
// empty the list