'use strict';

const gulp        = require('gulp');
const babel       = require('gulp-babel');

// 编译js文件
gulp.task('babel', function(){
  return gulp.src(['./src/**/*.js', '!./src/**/*.test.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'))
});

gulp.task('css', function() {
  return gulp.src('./src/**/*.css')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['babel', 'css']);
