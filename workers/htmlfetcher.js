var helpers = require('../helpers/archive-helpers');
var fs = require('fs');



//checks if anything on the sites archive list
helpers.readListOfUrls(function(err, list) {
  if (err) {
    console.error(err);
  } else {
    //check list for empty strings or +s
    var filteredList = list.filter( function (li) {
      //remove those strings
      if (li !== '') {
        return li;
      }
    });
    
    
    //if list.length > 0
    if (list.length > 0) {
      helpers.downloadUrls(filteredList);
    }
    
    fs.writeFile(helpers.paths.list, '', (err) => {
      if (err) {
        console.error(err);
      }
    });
  } 
});


