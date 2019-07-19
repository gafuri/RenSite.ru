/*global require*/
"use strict";

var gulp = require('gulp'),
  pug = require('gulp-pug'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync');


gulp.task('pug', function () {
  return gulp.src('./src/pug/**/*')
    .pipe(pug({pretty: true}))
    .on('error', function (err) {
      process.stderr.write(err + '\n');
      this.emit('end');
    })
    .pipe(gulp.dest('./dist/'));
});


gulp.task('sass', function(){
  return gulp.src('./src/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .on('error', sass.logError)
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest("./dist/css/"));
});


gulp.task('images', function () {
  return gulp.src('./src/imgs/**/*')
    .pipe(gulp.dest('./dist/imgs/'));
});


gulp.task('watch', function(){
  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 8080
  });

  gulp.watch('./src/scss/**/*.scss', gulp.series('sass')).on('change', browserSync.reload);
  gulp.watch('./src/pug/**/*.pug', gulp.series('pug')).on('change', browserSync.reload);
});


gulp.task('rebuild', gulp.series('sass', 'images', 'pug'), function () {});

gulp.task('build', gulp.series('sass', 'images', 'pug'));

gulp.task('default', gulp.series('sass', 'images', 'pug', 'build', 'watch'));
