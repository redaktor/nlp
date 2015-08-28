var path = require('path');
var src = path.join(__dirname,'src/main.ts');
var dataPath = path.join(__dirname,'src/text/data/');
var buildPath = path.join(__dirname,'build/text/');
var buildPathAMD = path.join(__dirname,'build/textAMD/');
module.exports = function(grunt) {
  // build the data module TS files from human readable src/data/dictionary* :
  // build all JS files for node.js (commonJS) and browser (AMD) :
  grunt.initConfig({
    watch: {
      files: ['./src/text/**'],
      tasks: ['run:build', 'run:run'],
    },
    tslint: {
      options: {
        configuration: grunt.file.readJSON('tslint.json')
      },
      src: ['./src/text/nlp/*.ts']
    },
    run: {
      makeDataTS: {
        exec: ['node ', dataPath, '_make -l'].join('')
      },
      buildClient: {
        exec: ['tsc ', src, ' --module amd --target es5 --outDir ', buildPathAMD].join('')
      },
      build: {
        exec: ['tsc ', src, ' --module commonjs --target es5 --outDir ', buildPath].join('')
      },
      run: {
        exec: ['node ', buildPath].join(''), // TODO - run a test? (we can't run modules) ...
      }
    }
  });
  // do :
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.registerTask('default', ['run:makeDataTS', 'run:buildClient', 'run:build', 'run:run', 'watch']);
  grunt.registerTask('lint', ['tslint:src']);
};
