/*
 * @title gulpfile.babel.js
 * @description A directory file loader to include all the gulp tasks
 *
 */

// Dependencies
import gulp from 'gulp';

import { boilerplate } from './tasks/boilerplate';
import { watch } from './tasks/watch';
import { build } from './tasks/build';
import { copy } from './tasks/copy';
import { copyRelease } from './tasks/copy-release';
import { cleaner } from './tasks/clean';
import { copyPackageFiles } from './tasks/copy-packagefiles';
import { buildArchives } from './tasks/archives';
import { release } from './tasks/release';
import { updateXML } from './tasks/updatexml';

exports.updateXML = updateXML;
exports.boilerplate = boilerplate;
exports.watch = watch;
exports.build = build;
exports.copyFiles = copy;
exports.copyRelease = copyRelease;
exports.cleaner = cleaner;
exports.copyPackageFiles = copyPackageFiles;
exports.archiver = buildArchives;
exports.release = release;
