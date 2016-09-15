'use strict';

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function run(t, input, output) {
    var opts = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    return (0, _postcss2.default)([(0, _2.default)(opts)]).process(input).then(function (result) {
        t.deepEqual(result.css, output);
        t.deepEqual(result.warnings().length, 0);
    });
}

(0, _ava2.default)('apply the pattern "Microbial Mat"', function (t) {
    return run(t, 'a{ background-pattern: "Microbial Mat"; }', 'a{ background: radial-gradient(circle at 0% 50%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px) 0px 10px, radial-gradient(at 100% 100%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px), #8a3; background-size: 20px 20px; }');
});

(0, _ava2.default)('apply the pattern "Microbial Mat" with single quotes', function (t) {
    return run(t, 'a{ background-pattern: \'Microbial Mat\'; }', 'a{ background: radial-gradient(circle at 0% 50%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px) 0px 10px, radial-gradient(at 100% 100%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px), #8a3; background-size: 20px 20px; }');
});

(0, _ava2.default)('apply the pattern "Microbial Mat" without quotes', function (t) {
    return run(t, 'a{ background-pattern: Microbial Mat; }', 'a{ background: radial-gradient(circle at 0% 50%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px) 0px 10px, radial-gradient(at 100% 100%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px), #8a3; background-size: 20px 20px; }');
});

(0, _ava2.default)('apply the pattern "Arrows"', function (t) {
    return run(t, 'a{ background-pattern: "Arrows"; }', 'a{ background: linear-gradient(45deg, #92baac 45px, transparent 45px)64px 64px, linear-gradient(45deg, #92baac 45px, transparent 45px, transparent 91px, #e1ebbd 91px, #e1ebbd 135px, transparent 135px), linear-gradient(-45deg, #92baac 23px, transparent 23px, transparent 68px, #92baac 68px, #92baac 113px, transparent 113px, transparent 158px, #92baac 158px); background-color: #e1ebbd; background-size: 128px 128px; }');
});