/**
 * Called after results are collected
 * @callback comletionCallback
 * @param {Object} error
 * @param {Object} data
 */

/**
 * Requests tureng.com and parses results
 * @param {string} word
 * @param {completionCallback} callback
 */
module.exports = function (word, callback) {
    var request = require('request');
    var cheerio = require('cheerio');
    var options = {
        url: 'http://tureng.com/en/turkish-english/' + encodeURIComponent(word),
        headers: {
            // 'User-Agent': 'request',
            // 'Content-Encoding': 'gzip'
        }
    };
    request.get(options, function (err, res, body) {
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
            table.find('tr').each(function () {
                var tr = $(this);
                var attrClass = tr.attr('class');
                if (attrClass === undefined && tr.attr('style') === undefined && categoryResults !== undefined) {
                    var eng = tr.find('td[lang="en"]').find('a').text().trim();
                    var type = tr.find('td[lang="en"]').find('i').text().trim();
                    var tur = tr.find('td[lang="tr"]').text().trim();
                    categoryResults.push({type: type, english: eng, turkish: tur});
                } else if (attrClass === 'visible-xs mobile-category-row') {
                    if (categoryName) { // push current category results
                        categories.push({name: categoryName, results: categoryResults});
                    }
                    categoryResults = []; // refresh for new category
                    categoryName = tr.text().trim();
                }
            });
            if (categoryName) {// match found for any category
                categories.push({name: categoryName, results: categoryResults}); // push last category
                callback(null, {categories: categories});
            } else {
                callback({message: 'No match found'});
            }

        }
    });
};

