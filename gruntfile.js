
// https://github.com/babel/grunt-babel
// https://github.com/sindresorhus/load-grunt-tasks

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: false,
        presets: ['es2015']
      },
      dist: {
        files: {
          'dist/srtps.js': 'src/srtps.js'
        }
      }
    }
  })

  grunt.registerTask('default', ['babel'])
}
