var yamlParser = require("./build/app.js");
module.exports = function(options){
   var parser = new yamlParser.YamlParser();
   return parser.lint(options);
}