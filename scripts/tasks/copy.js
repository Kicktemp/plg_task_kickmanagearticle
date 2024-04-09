import glob from 'glob';
import {config} from '../../config.js';
import {renameDest} from './util.js'
import {copyFile} from "./copy-file.js";
import fs from "fs-extra";

export const copyFiles = async (task = process.env.KICK_CONFIG) => {
  config.paths[task].map(async (setting) => {
    setting.glob = setting.glob !== undefined ? setting.glob : setting.src + '**/**';
    var files = glob.sync(setting.glob, {dot: true});
    if (typeof setting.replaceGlob !== 'undefined') {
      var replaceDataFiles = glob.sync(setting.replaceGlob, {dot: true});
    } else {
      var replaceDataFiles = [];
    }

    files.map(async (file) => {
      const dest = await renameDest(file, setting);
      const stat = await fs.promises.lstat(file);

      if (stat.isFile()) {
        await copyFile(file, dest, replaceDataFiles.includes(file));
      }
    });
  });
}

copyFiles();
