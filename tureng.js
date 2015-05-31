/**
 * Called after results are collected
 * @callback comletionCallback
 * @param {Object} data
 */

/**
 * Requests tureng.com and parses results
 * @param {string} word
 * @param {completionCallback} callback
 */
module.exports = function(word, callback) {
  var request = require('request');
  var cheerio = require('cheerio');
  var options = {
    url: 'http://tureng.com/search/' + word,
    headers: {
      'User-Agent': 'request' // Server returns erro if not set.
    }
  };
  request.get(options, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var categories = [];
      var categoryResults;
      var categoryName;
      // building dom
      var $ = cheerio.load(body, {
        normalizeWhitespace: true
      });
      
      // parsing
      var table = $($('#englishResultsTable').first()); // only first result table
      table.find('tr').each(function() {
        var tr = $(this);
        var attrClass = tr.attr('class');
        if(attrClass === undefined && tr.attr('style') === undefined && categoryResults !== undefined) {
          var en = tr.find('td[lang="en"]').text().split(' '); // format: '<type> <word>'
          var tur = tr.find('td[lang="tr"]').text();
          categoryResults.push({type: en[0], english: en[1], turkish: tur});
        } else if (attrClass === 'visible-xs mobile-category-row') {
          if(categoryName) { // push current category results
            categories.push({name: categoryName, results: categoryResults});
          }
          categoryResults = []; // refresh for new category
          categoryName = tr.text().trim();
        }
      });
      categories.push({name: categoryName, results: categoryResults}); // push last category
      callback({categories: categories});
    }
  });
};

