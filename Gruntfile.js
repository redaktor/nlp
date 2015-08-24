var path = require('path');
var buildServerPath = path.join(__dirname,'build');
var buildClientPath = path.join(__dirname,'build/client');
module.exports = function(grunt) {
  // build the data module TS files from human readable src/data/dictionary* :
  // build all JS files for node.js (commonJS) and browser (AMD) :
  grunt.initConfig({
    watch: {
      files: ['./src/**'],
      tasks: ['run:build', 'run:run'],
    },
    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      src: [
        "src/*.ts",
      ]
    },
    run: {
      buildDataTS: {
        exec: 'node ./src/nlp/data/_build -l'
      },
      buildClient: {
        exec: ['tsc ./src/index.ts --module amd --target es5 --outDir ',buildClientPath].join('')
      },
      build: {
        exec: ['tsc ./src/index.ts --module commonjs --target es5 --outDir ',buildServerPath].join('')
      },
      run: {
        exec: 'node ./build/index.js',
      }
    }
  });
  // do :
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.registerTask('default', ['run:buildDataTS', 'run:buildClient', 'run:build', 'run:run', 'watch']);
  grunt.registerTask('lint', ['tslint:src']);
};
