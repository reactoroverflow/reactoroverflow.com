module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'index.js', 'server/**/*.js', 'lib/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        node: true,
        globals: {
          jQuery: true
        },
      }
    }
  });

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 

  grunt.registerTask('test', ['jshint']);

};
