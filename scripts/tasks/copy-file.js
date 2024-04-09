import fs from 'fs-extra';
import {dirname} from 'path';
import {stringsreplace} from '../../config.js';

export const copyFile = async (src, dest, manipulateData = false) => {
  fs.promises.readFile(src, 'utf8')
    .then((data) => {
      if (manipulateData) {
        for (let [key, value] of Object.entries(stringsreplace)) {
          key = key.replace('[', '\\[');
          key = key.replace(']', '\\]');
          var re = new RegExp(key, 'g');
          data = data.replace(re, value);
        }
      }

      fs.promises.mkdir(dirname(dest), {recursive: true})
        .then(
          x => fs.promises.writeFile(dest, data, 'utf8')
            .catch((err) => {
              return console.log(err);
            })
        )
    })
}
