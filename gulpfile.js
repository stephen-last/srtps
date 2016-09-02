
var gulp = require('gulp')
var babel = require('gulp-babel')

// es6
gulp.task('compile', function () {
  return gulp.src('src/srtps.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['compile'])
