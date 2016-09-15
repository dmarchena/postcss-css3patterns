'use strict';

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsFile = _path2.default.join(__dirname, './__data__.js');
var jsonFile = _path2.default.join(__dirname, './__data__.json');

function parseHtml(html) {
  var $ = _cheerio2.default.load(html);
  var patterns = {};
  $('#patterns > li').each(function (i, element) {
    var name = $(this).attr('title');
    var author = $(this).data('author');
    var authorUrl = $(this).data('author-url');
    var css = $(this).attr('style');
    patterns[name] = {
      css: cleanStyle(css),
      author: author,
      url: authorUrl
    };
  });
  return patterns;
}

function writeFiles(patterns) {
  var json = JSON.stringify(patterns);
  _fs2.default.writeFileSync(jsFile, 'export default ' + json + ';');
  //fs.writeFileSync(jsonFile, json);
}

function cleanStyle(css) {
  var cleaned = css.replace(/\n/g, '');
  cleaned = cleaned.replace(/[\s]{2,}/g, ' ');
  cleaned = cleaned.replace(/,([^\s])/g, ', $1');
  cleaned = cleaned.replace(/:([^\s])/g, ': $1');
  return cleaned;
}

(0, _request2.default)('https://raw.githubusercontent.com/LeaVerou/css3patterns/master/index.html', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    writeFiles(parseHtml(html));
  }
});