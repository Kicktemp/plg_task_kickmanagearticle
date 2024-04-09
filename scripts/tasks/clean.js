import fs from 'fs-extra';
import {config, pjson} from '../../config.js';

config.paths.cleaner.some((path) => {
  fs.rmSync(path, { recursive: true, force: true });
});
