'use strict';

var through2 = require('through2');
var gutil = require('gulp-util');

var PLUGIN_NAME = 'gulp-replace-task';

// plugin

module.exports = function (opts) {

  return through2.obj(function (file, enc, cb) {

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME,
        'Streaming not supported'));
      return cb();
    }

    var options = opts || {};
    var contents = file.contents.toString();

    for (const [key, value] of Object.entries(opts)) {
        key = key.replace('[','\\[');
        key = key.replace(']','\\]');
        var re = new RegExp(key, 'g');
        contents = contents.replace(re, value);
    }

    var result = contents;
    if (result !== false) {
      file.contents = new Buffer.from(result);
    } else {
      // preserve original file
    }

    this.push(file);
    cb();

  });

};
