var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');


var scssPath = 'src/styles/**/*.scss';
var build = './build/';

// Minify, Prefix, Sourcemaps, Browser sync, Rename
gulp.task('sass',function(){
  gulp.src(scssPath)
      .pipe(sourcemaps.init())
          .pipe(sass())
          .pipe(autoprefixer())
          .pipe(rename({basename: 'style'}))
          .pipe(cleanCSS())
          .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(build + '/styles/css/'))
      .pipe(browserSync.stream());
});
   

  gulp.task('build',function(){
    browserSync.init({
        server: './build'
    })
    gulp.watch([build + '*.html'],['html']);
    gulp.watch([scssPath],['sass']);

});
