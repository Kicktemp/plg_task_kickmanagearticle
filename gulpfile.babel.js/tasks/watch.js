/*
 * @title Watch
 * @description A task to start the server and watch for changes.
 */

// Dependencies
import gulp from 'gulp';
import { series } from 'gulp';

// Tasks
import { reload, serve } from './server';
import { copy } from './copy';

// Config
import { config } from '../config';

function watchFiles() {
  gulp.watch(config.paths.copy.watch, series(copy, reload));
}

export const watch = series(
  serve,
  watchFiles
);
