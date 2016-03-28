#!/usr/bin/env node

'use strict';

var Jasmine = require('jasmine');
var jasmine = new Jasmine();
require('intel-jasmine-n-matchers');

if (process.env.RUNNER === 'CI') {
  var jasmineJUnitReporter = require('intel-jasmine-junit-reporter');

  var junitReporter = jasmineJUnitReporter({
    specTimer: new jasmine.jasmine.Timer(),
    JUnitReportSavePath: process.env.SAVE_PATH || './',
    JUnitReportFilePrefix: process.env.FILE_PREFIX || 'maybe-results-' +  process.version,
    JUnitReportSuiteName: 'Maybe Reports',
    JUnitReportPackageName: 'Maybe Reports'
  });

  jasmine.jasmine.getEnv().addReporter(junitReporter);
}

require('babel-register');

jasmine.loadConfig({
  spec_dir: 'dist/test',
  spec_files: [
    '**/*-test.js'
  ],
  random: true
});

exports.jasmine = jasmine.jasmine;
exports.env = jasmine.jasmine.getEnv();

jasmine.execute();
