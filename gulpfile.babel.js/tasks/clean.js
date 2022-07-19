/*
 * @title Scripts
 * @description A task to concatenate and compress js files via webpack
 */

// Dependencies
import { src, series } from 'gulp';
import plumber from 'gulp-plumber';
import clean from 'gulp-clean';
import errorHandler from '../util/errorHandler.js';

// Config
import { config } from '../config';

// Task
export function deleteReleasefilesFolder() {
  return src(config.paths.cleaner.releasefiles, {allowEmpty: true})
    .pipe(plumber({errorHandler}))
    .pipe(clean({force: true}))
}


export function deleteSourcefilesFolder() {
  return src(config.paths.cleaner.sourcefiles, {allowEmpty: true})
    .pipe(plumber({errorHandler}))
    .pipe(clean({force: true}))
}

export function deleteArchivesFolder() {
  return src(config.paths.cleaner.archives, {allowEmpty: true})
    .pipe(plumber({errorHandler}))
    .pipe(clean({force: true}))
}

export function deletePackageFolder() {
  return src(config.paths.cleaner.packages, {allowEmpty: true})
    .pipe(plumber({errorHandler}))
    .pipe(clean({force: true}))
}

export const cleaner = series(deleteReleasefilesFolder, deleteSourcefilesFolder, deleteArchivesFolder, deletePackageFolder);
