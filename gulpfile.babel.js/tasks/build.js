/**
 * Automatic Deploy
 *
 * @description: Deploy Task for an automated Build Process
 */

import { series } from 'gulp'

import { copy } from './copy'

export const build = series(
    copy
);
