'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['gruntfile.js', 'index.js', 'server/**/*.js', 'lib/**/*.js', 'client/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        node: true,
        strict: true,
        smarttabs: false,
        indent: 2,
        globals: {
          angular: true,
          jQuery: true,
          marked: true,
          SimpleMDE: true
        },
      }
    }
  });

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 

  grunt.registerTask('test', ['jshint']);

};
