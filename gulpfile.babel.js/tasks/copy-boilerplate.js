/*
 * @title Package Files
 * @description A task to copy images
 */

// Dependencies
import {src, dest, series} from 'gulp';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import rename from 'gulp-rename';
import mergeStream from 'merge-stream'
import errorHandler from '../util/errorHandler.js';
import replaceStrings from '../util/replaceStrings.js';


// Config
import { isProd, pjson } from '../config';
import gulpif from "gulp-if";

// Task
function cleancopy() {
  return mergeStream(pjson.boilerplate.files.map(function(item) {
    return src(item.src)
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace(/joomlaboilerplate/g, pjson.casesensitive.joomlaboilerplate);
        path.basename = path.basename.replace(/joomlaboilerplate/g, pjson.casesensitive.joomlaboilerplate);
      }))
      .pipe(plumber({errorHandler}))
      .pipe(gulpif(!isProd, changed(item.dest)))
      .pipe(dest(item.dest.replace(/joomlaboilerplate/g, pjson.casesensitive.joomlaboilerplate)))
  }))
}

function replacecopy() {
  return mergeStream(pjson.boilerplate.files.map(function(item) {
    return src(item.replacesrc)
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace(/joomlaboilerplate/g, pjson.casesensitive.joomlaboilerplate);
        path.basename = path.basename.replace(/joomlaboilerplate/g, pjson.casesensitive.joomlaboilerplate);
      }))
      .pipe(replaceStrings(pjson.casesensitive))
      .pipe(plumber({errorHandler}))
      .pipe(gulpif(!isProd, changed(item.dest)))
      .pipe(dest(item.dest.replace(/joomlaboilerplate/g, pjson.casesensitive.joomlaboilerplate)))
  }))
}


export const copyBoilerplate = series(
  cleancopy,
  replacecopy
);
