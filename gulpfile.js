var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require("browser-sync");
var scssPath = "src/styles/**/*.scss";

gulp.task('sass', function () {
    return gulp.src(scssPath)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('build/styles/css'))
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/styles/css'));
  });
   
  gulp.task('sass:watch', function () {
    gulp.watch(scssPath, ['sass']);
  });

gulp.task('autoprefixer', () =>
    gulp.src('build/styles/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task("serve", ["sass"], function() {
    browserSync.init({
      server: ".",
      port: 3000
    });
    gulp.watch(scssPath, ["sass"]).on("change", browserSync.reload);
    gulp.watch("*.html").on("change", browserSync.reload);
  });