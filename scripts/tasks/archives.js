import fs from 'fs-extra';
import archiver from 'archiver';
import {config, pjson} from '../../config.js';

// Task
export const buildArchives = () => {
  const builder = async () => {
    for (const archivesetup of config.archiver) {
      await build(archivesetup)
    };
  };

  builder().then(() => {
  });
}

const build = archivesetup => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(archivesetup.destination)){
      fs.mkdirSync(archivesetup.destination, { recursive: true });
    }

    let finisher = 0;

    let forEach = archivesetup.types.forEach( function(item) {
      let extensionname = archivesetup.destination + archivesetup.name + item.extension
      if (archivesetup.suffixversion) {
        extensionname = archivesetup.destination + archivesetup.name + '_' + pjson.version + item.extension;
      }
      let output = fs.createWriteStream(extensionname);
      const archive = archiver((item.type).toString(), item.options);
      output.on('close', function() {
        finisher++;
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file ('+archivesetup.name+') descriptor has closed.');

        if(finisher == archivesetup.types.length) {
          resolve()
        }
      });

      // This event is fired when the data source is drained no matter what was the data source.
      // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
      output.on('end', function() {
        console.log('Data has been drained');
      });

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
          // log warning
        } else {
          // throw error
          throw err;
        }
      });

      archive.on('error', function(err) {
        throw err;
      });

      archive.pipe(output);

      archivesetup.folders.forEach(function (folder) {
        archive.directory(folder, false);
      })

      archive.finalize();
    });

  });
}

buildArchives();
