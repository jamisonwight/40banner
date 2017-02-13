'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCreativeInfo = getCreativeInfo;
exports.getDirectoryBase = getDirectoryBase;
exports.directoryExists = directoryExists;
exports.createProjectDirectory = createProjectDirectory;
exports.multipleVersions = multipleVersions;
exports.bannerSizes = bannerSizes;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _clui = require('clui');

var _clui2 = _interopRequireDefault(_clui);

var _simpleGit = require('simple-git');

var _simpleGit2 = _interopRequireDefault(_simpleGit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = _clui2.default.Spinner;
var status = new Spinner('Downloading, please wait...');

function getCreativeInfo(callback) {
  var info = [{
    name: 'clientName',
    type: 'input',
    message: 'Enter the name of the client:',
    validate: function validate(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter the name of the client';
      }
    }
  }, {
    name: 'campaignName',
    type: 'input',
    message: 'Enter the name of the campaign:',
    validate: function validate(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter the campaign name';
      }
    }
  }, {
    name: 'versions',
    type: 'list',
    message: 'How many versions do these banners have?',
    choices: ['One', 'Two', 'Three', 'Four', 'Custom'],
    validate: function validate(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter the campaign name';
      }
    }
  }, {
    name: 'selectSizes',
    type: 'list',
    message: 'Select the banner sizes:',
    choices: ['Standard', 'Desktop & Mobile', 'Full', 'Custom'],
    validate: function validate(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter the campaign name';
      }
    }
  }];
  _inquirer2.default.prompt(info).then(callback);
}

function getDirectoryBase() {
  return _path2.default.basename(process.cwd());
}

function directoryExists(filepath) {
  try {
    return _fs2.default.statSync(filepath).isDirectory();
  } catch (err) {
    return false;
  }
}

function createProjectDirectory(banner) {
  status.start();
  getDirectoryBase();
  var rootPath = banner.clientName + '/' + banner.campaignName + '/production';
  (0, _mkdirp2.default)(rootPath, function (err) {
    if (err) {
      status.stop();
      console.log(_chalk2.default.red('AHH! Sorry, there was an error creating the directory: \n') + err);
    } else {
      return multipleVersions(banner);
    }
  });
}

function multipleVersions(banner) {
  var rootPath = banner.clientName + '/' + banner.campaignName + '/production';
  if (banner.versions === 'One') {
    var newPath = rootPath;
    return bannerSizes(banner, newPath);
  }
  if (banner.versions === 'Two') {
    var v2 = ['v1', 'v2'];
    var createTwoVersions = v2.map(function (version) {
      var newPath = rootPath + '/' + version;
      (0, _mkdirp2.default)(newPath, function (err) {
        if (err) {
          status.stop();
          console.log(_chalk2.default.red('Oh No! Sorry, there was an error creating the directory: \n') + err);
        } else {
          return bannerSizes(banner, newPath);
        }
      });
    });
  }
  if (banner.versions === 'Three') {
    var v3 = ['v1', 'v2', 'v3'];
    var _createTwoVersions = v3.map(function (version) {
      var newPath = rootPath + '/' + version;
      (0, _mkdirp2.default)(newPath, function (err) {
        if (err) {
          status.stop();
          console.log(_chalk2.default.red('Oh No! Sorry, there was an error creating the "GWD" directory: \n') + err);
        } else {
          return bannerSizes(banner, newPath);
        }
      });
    });
  }
  if (banner.versions === 'Four') {
    var v4 = ['v1', 'v2', 'v3', 'v4'];
    var _createTwoVersions2 = v4.map(function (version) {
      var newPath = rootPath + '/' + version;
      (0, _mkdirp2.default)(newPath, function (err) {
        if (err) {
          status.stop();
          console.log(_chalk2.default.red('Oh No! Sorry, there was an error creating the directory: \n') + err);
        } else {
          return bannerSizes(banner, newPath);
        }
      });
    });
  }
}

function bannerSizes(banner, newPath) {
  if (banner.selectSizes === 'Standard') {
    (0, _simpleGit2.default)().clone('https://github.com/jamisonwight/Standard.git', newPath, function (err) {
      if (err) {
        return console.log('There was a problem with downloading the directory:' + err);
      } else {
        status.stop();
        console.log(_chalk2.default.green('\n\n' + 'Woo! The directory ') + _chalk2.default.yellow(newPath) + _chalk2.default.green(' has been created!'));
      }
    });
  }
  if (banner.selectSizes === 'Desktop & Mobile') {
    (0, _simpleGit2.default)().clone('https://github.com/jamisonwight/Desktop-Mobile.git', newPath, function (err) {
      if (err) {
        return console.log('There was a problem with downloading the directory:' + err);
      } else {
        status.stop();
        console.log(_chalk2.default.green('\n\n' + 'Woo! The directory ') + _chalk2.default.yellow(newPath) + _chalk2.default.green(' has been created!'));
      }
    });
  }
  if (banner.selectSizes === 'Full') {
    (0, _simpleGit2.default)().clone('https://github.com/jamisonwight/Full.git', newPath, function (err) {
      if (err) {
        return console.log('There was a problem with downloading the directory:' + err);
      } else {
        status.stop();
        console.log(_chalk2.default.green('\n\n' + 'Woo! The directory ') + _chalk2.default.yellow(newPath) + _chalk2.default.green(' has been created!'));
      }
    });
    // } else {
    //   console.log(chalk.red('Failed to create banner files :('))
    // }
  }
}
//# sourceMappingURL=files.js.map