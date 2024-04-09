import fs from 'fs-extra';
import libxmljs from 'libxmljs';
import {config, stringsreplace} from '../../config.js';
import {getArchiveName, createHashFromFile} from './util.js';

function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}
console.log(getArchiveName());
export const updateXML = async () => {
    fs.promises.readFile(config.paths.updateXML.src, 'utf8')
        .then((data) => {
            fs.promises.writeFile(config.paths.updateXML.rename, data, 'utf8')
                .catch((err) => {
                    return console.log(err);
                })
            fs.promises.readFile(config.paths.updateXML.template, 'utf8')
                .then(async (templateData) => {
                    var child = libxmljs.parseXml(templateData);
                    child = child.get('//update');
                    var xml = libxmljs.parseXml(data);
                    var children = xml.get('//updates').childNodes();
                    var updates = new libxmljs.Element(xml, 'updates');
                    updates.addChild(child);
                    children.forEach(function (update){
                        updates.addChild(update);
                    });
                    xml.get('//updates').replace(updates);

                    data = xml.toString();

                    const sha256 = await createHashFromFile(getArchiveName(), 'sha256');
                    const sha384 = await createHashFromFile(getArchiveName(), 'sha384');
                    const sha512 = await createHashFromFile(getArchiveName(), 'sha512');

                    var shareplace = extend({}, stringsreplace, {"[SHA256]": sha256}, {"[SHA384]": sha384}, {"[SHA512]": sha512});

                    for (let [key, value] of Object.entries(shareplace)) {
                        key = key.replace('[', '\\[');
                        key = key.replace(']', '\\]');
                        var re = new RegExp(key, 'g');
                        data = data.replace(re, value);
                    }

                    fs.promises.writeFile(config.paths.updateXML.src ,data, 'utf8')
                        .catch((err) => {
                            return console.log(err);
                        })
                })
                .catch((err) => {
                    return console.log(err);
                })

        })
};

updateXML();
