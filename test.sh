#!/bin/sh
tsd install -g;
typings install -g;
npm install;
npm install ts-node;
tsd install;
typings install lodash;
npm install coveralls;
npm install mocha-lcov-reporter;
tsc;
gulp build
istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage
