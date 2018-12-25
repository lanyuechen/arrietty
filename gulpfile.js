'use strict';

const gulp        = require('gulp');
const babel       = require('gulp-babel');

// 编译js文件
gulp.task('babel', function(){
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['babel']);
