/// <reference path="../typings/tsd.d.ts" />

import fs = require('fs');
import * as _ from "lodash";
import * as yaml from "js-yaml";

class YamlParser {

    constructor() {

    }

    public lint(path: string) {

        if (!fs.existsSync(path)) {
            throw new Error("Path: '" + path + "' does not exists.");
        }

        if (fs.lstatSync(path).isDirectory()) {
            return this.fetchYamlFileNames(path);
        }

        return [];
    }

    private getFileNames(dir, filePaths = []) {

        var files = fs.readdirSync(dir);

        _.forEach(files, (item) => {
            var path = dir + "/" + item;
            var stat = fs.lstatSync(path);

            if (stat.isSymbolicLink()) {
                return [];
            } else if (stat.isDirectory()) {
                this.getFileNames(path, filePaths)
            }
            var rePattern = new RegExp(/\.ya?ml$/);
            var arrMatches = path.match(rePattern);
            var isYaml = rePattern.test(path);
            if (isYaml) {
                filePaths.push(path);
            }
        });

        return filePaths;

    }

    private fetchYamlFileNames(dirName) {

        var processedFiles = [];
        var files = this.getFileNames(dirName);
        _.forEach(files, (item) => {


            var fileResult = { hasError: false, message: undefined, filename: item };

            var hasError = false;
            var message;
            try {
                yaml.safeLoad(fs.readFileSync(item, 'utf-8'));
            } catch (ex) {

                fileResult.hasError = true;
                fileResult.message = ex.toString();
            }
            
            processedFiles.push(fileResult);
        });

        return processedFiles;
        
    }
}

var y = new YamlParser();
y.lint('/Users/ashokdudhade/MVP/tech-ui/ui/web/config');