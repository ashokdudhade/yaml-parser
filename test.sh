#!/bin/sh
tsd install -g;
typings install -g;
tsd install;
typings install lodash;
gulp build
istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage
