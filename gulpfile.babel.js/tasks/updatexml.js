/*
 * @title Package Files
 * @description A task to copy images
 */

// Dependencies
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import errorHandler from '../util/errorHandler.js';
import xmlTransformer from 'gulp-xml-transformer';
import fs from 'fs';

// Config
import {config, isProd, stringsreplace} from '../config';
import gulpif from "gulp-if";
import rename from "gulp-rename";
import replacestrings from '../util/replaceStrings.js';

// Task
export function updateXML() {
  return src(config.paths.updateXML.src)
    .pipe(rename(config.paths.updateXML.rename))
    .pipe(dest('./'))
    .pipe(rename(config.paths.updateXML.src))
    .pipe(plumber({errorHandler}))
    .pipe(xmlTransformer((xml, libxmljs) => {
      var child = libxmljs.parseXmlString(fs.readFileSync(config.paths.updateXML.template));
      child = child.get('//update');
      var children = xml.get('//updates').childNodes();
      var updates = new libxmljs.Element(xml, 'updates');
      updates.addChild(child);
      children.forEach(function (update){
        updates.addChild(update);
      });
      xml.get('//updates').replace(updates);
      return Promise.resolve(xml);
    }))
    .pipe(replacestrings(stringsreplace))
    .pipe(dest('./'))
}
