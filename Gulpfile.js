var gulp = require('gulp');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

var input = './source/css/scss/**/*.scss';
var output = './source/css';
var plpublic = './public/patterns/**/*.html';
var plsource = './source/**/*.*';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// Sass
gulp.task('sass', function () {
  console.log('changed detected')
  return gulp

  // Find all `.scss` files from the `stylesheets/` folder
    .src(input)
    // Run Sass on those files
    .pipe(sass(sassOptions).on('error', sass.logError))
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});

// Browsersync
gulp.task('serve', function() {
  browserSync.init({
    startPath: "/public",
    server: {
      baseDir: "./"
    }
  });

//gulp-shell
  gulp.task('shell', shell.task([
      'php core/console --generate' ]));


  gulp.watch(input, ['sass']);
gulp.watch(plpublic).on('change', browserSync.reload);
gulp.watch(plsource, ['shell']);
});


gulp.task('default', ['serve']);
