/**
 * Automatic Release
 *
 * @description: Deploy Task for an automated Build Process
 */

import { series } from 'gulp'

import { copyBoilerplate } from './copy-boilerplate'
import { cleanBoilerplate } from './clean-boilerplate';

export const boilerplate = series(
  cleanBoilerplate,
  copyBoilerplate
);
