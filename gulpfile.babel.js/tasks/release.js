/**
 * Automatic Release
 *
 * @description: Deploy Task for an automated Build Process
 */

import { series, parallel } from 'gulp'

import { copyRelease } from './copy-release'
import { copyPackageFiles } from './copy-packagefiles'
import { buildArchives } from './archives'
import { cleaner, deleteReleasefilesFolder } from './clean';

// Config
import { config } from '../config';

export const release = series(
  cleaner,
  copyRelease,
  copyPackageFiles,
  buildArchives
);
