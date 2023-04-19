'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({});

  grunt.config('karma', {
    options: {
      configFile: 'karma.conf.js',
      singleRun: true
    },
    test: {}
  });

  grunt.config('mochaTest', {
    test: {
      options: {
        reporter: 'spec'
      },
      src: ['./test.js']
    }
  });

  grunt.registerTask('default', [
    'mochaTest',
    'karma'
  ]);
};
