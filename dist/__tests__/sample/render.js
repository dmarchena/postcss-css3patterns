'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _ = require('../../../');

var _2 = _interopRequireDefault(_);

var _data__ = require('../../data/__data__.js');

var _data__2 = _interopRequireDefault(_data__);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dir = _path2.default.join(process.cwd(), 'docs/test/');
var postcssFile = _path2.default.join(dir, '_index.css');
var cssFile = _path2.default.join(dir, 'index.css');
var htmlFile = _path2.default.join(dir, 'index.html');

function renderCss() {
  var content = _data__2.default.map(function (pattern, index) {
    return '\n.pattern-' + index + ' {\n  background-pattern: "' + pattern.name + '";\n}\n';
  }).join('');

  _fs2.default.writeFile(postcssFile, content);

  (0, _postcss2.default)([_2.default]).process(content, { from: postcssFile, to: cssFile }).then(function (result) {
    _fs2.default.writeFileSync(cssFile, result.css);
    if (result.map) _fs2.default.writeFileSync('app.css.map', result.map);
    console.log('css file saved!');
  });
}

function renderHtml() {
  var content = _pug2.default.renderFile(_path2.default.join(__dirname, './template.pug'), {
    patterns: _data__2.default
  });

  _fs2.default.writeFile(htmlFile, content, function (err) {
    if (err) throw err;
    console.log('html file saved!');
  });
}

function main() {
  (0, _mkdirp2.default)(dir, function (err) {
    if (!err) {
      renderCss();
      renderHtml();
    } else {
      console.error(err);
    }
  });
}

main();