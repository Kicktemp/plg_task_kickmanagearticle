/*
 * @title Package Files
 * @description A task to copy images
 */

// Dependencies
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import mergeStream from 'merge-stream'
import errorHandler from '../util/errorHandler.js';

// Config
import {config, isProd} from '../config';
import gulpif from "gulp-if";

// Task
export function copyPackageFiles() {
  return mergeStream(config.packagefiles.map(function(item) {
    return src([item.src])
      .pipe(plumber({errorHandler}))
      .pipe(gulpif(!isProd, changed(item.dest)))
      .pipe(dest(item.dest))
  }))
}
