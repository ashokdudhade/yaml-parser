var assert = require("assert");
var should = require("chai").should();
var expect = require("chai").expect;
var _ = require("lodash")

var yamlParser = require("../index.js");
describe('Yaml parser tests', function() {
        it('should return yaml lint non null result', function(){
              var result  = new yamlParser({path: __dirname+'/data'});
              should.not.equal(result, null);
              should.not.equal(result.length, 0);
              var errorResult = _.filter(result,function(item){ return item.hasError ==  true});
              should.not.equal(errorResult, null);
              should.equal(/.*file_with_error\.yml$/.test(errorResult[0].filename), true);
        });    

        it('should return yaml lint non null result with no recursive parsing directories', function(){
              var result  = new yamlParser({path: __dirname+'/data', isDirRecursiveParse: false});
              should.not.equal(result, null);
              should.equal(result.length, 3);
              var childDirResult = _.filter(result, function(item){
                  return /(.*)child\.yml/.test(item.filename);
              });
              should.equal(childDirResult.length, 0);
        });  


         it('should return yaml lint non null result with explicit recursive parsing directories flag', function(){
              var result  = new yamlParser({path: __dirname+'/data', isDirRecursiveParse: true});
              should.not.equal(result, null);
              should.equal(result.length, 4);
              var childDirResult = _.filter(result, function(item){
                  return /(.*)child\.yml/.test(item.filename);
              });
              should.equal(childDirResult.length, 1);
        });      
        it('should throw error when path does not exists', function(){
               expect(function(){new yamlParser({path: __dirname+'/data122'})}).to
               .throw(Error); 
        });  
});
