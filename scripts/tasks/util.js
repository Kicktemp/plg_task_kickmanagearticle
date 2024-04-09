import fs from 'fs-extra';
import { createHash } from 'crypto';
import {config, pjson} from '../../config.js';

export const createHashFromFile = (filePath, hashType = 'sha256') => new Promise(resolve => {
  const hash = createHash(hashType);
  fs.createReadStream(filePath).on('data', data => hash.update(data)).on('end', () => resolve(hash.digest('hex')));
});

export const getArchiveName = () => {
  var archiv = config.archiver.at(-1);

  let extensionname = archiv.destination + archiv.name + archiv.types[0].extension
  if (archiv.suffixversion) {
    extensionname = archiv.destination + archiv.name + '_' + pjson.version + archiv.types[0].extension;
  }

  return extensionname;
}

export const extend = (target, ...params) => {
  var sources = [].slice.call(params, 0);
  sources.forEach(function (source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });
  return target;
}

export const renameDest = (file, paths) => {
  var dest = file.replace(paths.src, paths.dest)

  if (typeof pjson.casesensitive !== 'undefined'
    && typeof paths.casesensitive !== 'undefined'
    && paths.casesensitive) {
    for (let [key, value] of Object.entries(pjson.casesensitive)) {
      var re = new RegExp(key, 'g');
      dest = dest.replace(re, value);
    }
  }

  return dest;
}
