import chokidar from 'chokidar';
import fs from "fs-extra";
import glob from "glob";
import {config} from '../../config.js';
import {renameDest} from './util.js';
import {copyFile} from "./copy-file.js";
const log = console.log.bind(console);

export const watch = () => {
  const copyconfig = config.paths.copy[0];
  log(copyconfig.glob)
  chokidar.watch(copyconfig.src, {
    persistent: true,
    ignoreInitial: true
  }).on('all', async (event, file) => {
    const copy = ['change', 'add'];
    const replaceDataFiles = await glob.sync(copyconfig.replaceGlob, {dot: true});
    const dest = await renameDest(file, copyconfig);

    if (copy.includes(event)) {
      const stat = await fs.promises.lstat(file);

      if (stat.isFile()) {
        await copyFile(file, dest, replaceDataFiles.includes(file));
        log(`File ${dest} has been change`)
      }
    }

    if (event === 'unlink') {
      fs.promises.unlink(dest)
        .then(
          b => log(`File ${dest} has been removed`)
        )
        .catch((err) => {
          return console.log(err);
        });
    }

    if (event === 'unlinkDir') {
      fs.rmSync(dest, { recursive: true, force: true });
      log(`Path ${dest} has been removed`)
    }
  });
}

watch();
