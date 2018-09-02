var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require("browser-sync");
var scssPath = "src/styles/**/*.scss";

gulp.task('sass', function () {
    return gulp.src(scssPath)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('build/styles/css'));
  });
   
  gulp.task('sass:watch', function () {
    gulp.watch(scssPath, ['sass']);
  });


gulp.task("serve", ["sass"], function() {
    browserSync.init({
      server: ".",
      port: 3000
    });
    gulp.watch(scssPath, ["sass"]).on("change", browserSync.reload);
    gulp.watch("*.html").on("change", browserSync.reload);
  });