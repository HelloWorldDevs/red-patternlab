var gulp = require('gulp');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

var input = './assets/scss/**/*.scss';
var output = './assets/css';
var plpublic = './pl/public/patterns/**/*.html';
var plsource = './pl/source/**/*.*';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// Sass
gulp.task('sass', function () {
  return gulp
  // Find all `.scss` files from the `stylesheets/` folder
    .src(input)
    // Run Sass on those files
    .pipe(sass(sassOptions).on('error', sass.logError))
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});

gulp.task('core', shell.task([
    'php pl/core/builder.php -g' ]));

// Browsersync
gulp.task('serve', function() {
  browserSync.init({
    startPath: "pl/public",
    server: {
      baseDir: "./"
    }
  });



  gulp.watch(input, ['sass']);
  gulp.watch(plpublic).on('change', browserSync.reload);
  gulp.watch(plsource, ['core']);
});

// gulp.task('watch', function() {
//   return gulp
//     .watch(input, ['sass'])
//     .on('change', function(event) {
//       console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//     });
// });


// gulp.task('serve', ['sass'], function() {
//   browserSync.init({
//     server: {
//       baseDir: "./pl/public"
//     }
//   });
// });


gulp.task('default', ['serve']);
