import * as fs from "fs";
class YamlParser{
    path: string;
    constructor(path: string){
        this.path = path;       
    }

    public compare(){
        if(!fs.exists(this.path)){
            throw new Error("Path: '"+ this.path +"' does not exists.");
        }
    }
}

new YamlParser("test");