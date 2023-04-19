var browserifyIstanbul = require('browserify-istanbul');

module.exports = function(config) {
  config.set({
    basePath: '.',
    browsers: ['Chrome'],
    frameworks: [
      'browserify',
      'mocha',
    ],
    files: [
      'test/**/*.js',
    ],
    preprocessors: {
      'test/**/*.js': ['browserify'],
    },
    reporters: ['progress', 'coverage'],
    browserify: {
      debug: true,
      transform: [browserifyIstanbul({
        ignore: ['test/**'],
      })],
    },
    coverageReporter: {
      reporters: [
        { type: 'html' },
        { type: 'lcov', subdir: '.' },
      ],
    },
    autoWatch: true,
  });
};
