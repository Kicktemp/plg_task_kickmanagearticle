/*
 * @title Copy
 * @description A task to copy files to the output directory
 */

// Dependencies
import { src } from 'gulp';
import mergeStream from 'merge-stream';
import plumber from "gulp-plumber";
import errorHandler from "../util/errorHandler";
import clean from "gulp-clean";

// Config
import { pjson } from '../config';

// Task
export function cleanBoilerplate() {
  return mergeStream(pjson.boilerplate.files.map(function(item) {
    return src(item.dest, {allowEmpty: true})
      .pipe(plumber({errorHandler}))
      .pipe(clean({force: true}))
  }))
}
