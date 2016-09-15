'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _data__ = require('./data/__data__.js');

var _data__2 = _interopRequireDefault(_data__);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pluginName = 'postcss-css3patterns';

var plugin = _postcss2.default.plugin(pluginName, function () {
    return function (css) {
        css.walkDecls('background-pattern', function (decl) {
            var patternName = decl.value.replace(/[\"\']/g, '');
            var pattern = _data__2.default[patternName];
            if (typeof pattern !== 'undefined') {
                var origRule = decl.parent;
                origRule.append(pattern.css);
            }
            decl.remove();
        });
    };
});

exports.default = plugin;
module.exports = exports['default'];