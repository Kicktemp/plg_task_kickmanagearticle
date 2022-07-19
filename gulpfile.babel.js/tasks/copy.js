/*
 * @title Copy
 * @description A task to copy files to the output directory
 */

// Dependencies
import {src, dest, series} from 'gulp';
import changed from 'gulp-changed';
import replacestrings from '../util/replaceStrings.js';
import gulpif from 'gulp-if';

// Config
import {config, isProd, stringsreplace} from '../config';

function cleancopy() {
  return src(config.paths.copy.src)
    .pipe(gulpif(!isProd, changed(config.paths.copy.dest)))
    .pipe(dest(config.paths.copy.dest));
}

function replacecopy() {
  return src(config.paths.copy.replacesrc)
    .pipe(replacestrings(stringsreplace))
    .pipe(gulpif(!isProd, changed(config.paths.copy.dest)))
    .pipe(dest(config.paths.copy.dest));
}

export const copy = series(
  cleancopy,
  replacecopy
);


