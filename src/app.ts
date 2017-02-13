/// <reference path="../typings/tsd.d.ts" />

import fs = require("fs");
import * as _ from "lodash";
import * as yaml from "js-yaml";

export class YamlParser {

    constructor() {

    }

    public lint(options: any) {
        let path = options.path;
        if (!fs.existsSync(path)) {
            throw new Error("Path: '" + path + "' does not exists.");
        }

        if (fs.lstatSync(path).isDirectory()) {
            return this.fetchYamlFileNames(options);
        }

        return [];
    }

    private getFileNames(dir, filePaths = [], isDirRecursiveParse = true) {

        let files = fs.readdirSync(dir);

        _.forEach(files, (item) => {
            let path = dir + "/" + item;
            let stat = fs.lstatSync(path);

            if (stat.isSymbolicLink()) {
                return [];
            } else if (stat.isDirectory() && isDirRecursiveParse) {
                this.getFileNames(path, filePaths);
            }
            let rePattern = new RegExp(/\.ya?ml$/);
            let arrMatches = path.match(rePattern);
            let isYaml = rePattern.test(path);
            if (isYaml) {
                filePaths.push(path);
            }
        });

        return filePaths;

    }

    private fetchYamlFileNames(options) {

        let processedFiles = [];
        let files = this.getFileNames(options.path, undefined, options.isDirRecursiveParse);
        _.forEach(files, (item) => {


            let fileResult = { hasError: false, message: undefined, filename: item };

            let hasError = false;
            let message;
            try {
                yaml.safeLoad(fs.readFileSync(item, "utf-8"));
            } catch (ex) {

                fileResult.hasError = true;
                fileResult.message = ex.toString();
            }
            processedFiles.push(fileResult);
        });

        return processedFiles;
    }
}
