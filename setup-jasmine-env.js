/*global jasmine:true*/

if (process.env.RUNNER === 'CI') {
  const jasmineReporters = require('jasmine-reporters');

  jasmine.VERBOSE = true;
  jasmine.getEnv().addReporter(
    new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: process.env.SAVE_PATH || './',
      filePrefix: process.env.FILE_PREFIX || 'maybe-results-' + process.version
    })
  );
}
