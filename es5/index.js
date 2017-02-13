#!/usr/bin/env node


'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _clear = require('clear');

var _clear2 = _interopRequireDefault(_clear);

var _clui = require('clui');

var _clui2 = _interopRequireDefault(_clui);

var _figlet = require('figlet');

var _figlet2 = _interopRequireDefault(_figlet);

var _files = require('./lib/files');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = _clui2.default.Spinner;
var status = new Spinner('Downloading, please wait...');

(0, _clear2.default)();
console.log(_chalk2.default.red.bold(_figlet2.default.textSync('40BANNER', { font: 'colossal' })));

console.log(_chalk2.default.yellow('Making banners and changing the world!' + '\n\n'));

(0, _files.getCreativeInfo)(function () {
    var banner = arguments[0];
    (0, _files.createProjectDirectory)(banner);
    status.stop();
});
//# sourceMappingURL=index.js.map