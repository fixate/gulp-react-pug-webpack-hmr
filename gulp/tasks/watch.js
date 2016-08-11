const gulp = require('gulp');
const gutil = require('gulp-util');
const watch = require('gulp-watch');
const path = require('path');
const fs = require('fs');
const shell = require('gulp-shell');

const conf = require('../gulpconfig');
const devPath = conf.path.dev;





/*------------------------------------*\
     $WATCH
\*------------------------------------*/
const deps = [
  'css',
  'pug',
  'images:copy',
  'fonts:copy',
  'browser-sync',
];

gulp.task('watch', deps, function() {
  gulp.watch(`${devPath.css}/**/*.scss`, ['css:watch']);
  gulp.watch([`${devPath.js}/**/!(*.bundle).js`, `${devPath.js}/**/*.jsx`], ['scripts:lint']);
  gulp.watch(`${devPath.app}/**/*.pug`, ['pug:watch']);
  gulp.watch(`${devPath.app}/partials/svg/raw/inline-icons/**/*.svg`, ['images:watch:inlinesvgicons']);
  gulp.watch([
    `${devPath.app}/partials/svg/raw/**/*.svg`,
    `!${devPath.app}/partials/svg/raw/inline-icons/**/*.svg`,
  ], ['images:watch:svgpartials']);
  return gulp.watch(`${devPath.img}/raw/**/*`, ['images:watch']);
});





/*------------------------------------*\
     $WATCH TESTS
\*------------------------------------*/
gulp.task('watch:tests', function() {
  gulp.watch([`${devPath.js}/**/*.js`])
    .on('change', (file) => {
      const basename = path.basename(file.path);
      const isTestFile = /_test/.test(basename);
      let testFile = file.path;

      if (isTestFile) {
        log(`Running ${basename}`);
      } else {
        try {
          const matchingTestFile = file.path.replace(/\.js$/, '_test.js');

          fs.accessSync(matchingTestFile, fs.F_OK);
          log(`Running ${path.basename(matchingTestFile)}`);
          testFile = matchingTestFile;
        } catch (e) {
          log(`No matching test file for ${basename}.`, 'red');
          log('Running all tests');
          testFile = `${devPath.app}/**/*_test.js`;
        }
      }

      runTest(testFile);
    });

  function log(msg, color = 'green') {
    gutil.log(gutil.colors[color](msg));
  }

  function runTest(glob) {
    return gulp.src('./', { read: false })
      .pipe(shell(`$(which babel-tape-runner) ${glob} | faucet`))
      .on('error', () => {});
  }
});
