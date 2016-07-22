const gulp = require('gulp');
const gutil = require('gulp-util');
const watch = require('gulp-watch');
const path = require('path');
const fs = require('fs');
const shell = require('gulp-shell');

const conf = require('../gulpconfig');





//*------------------------------------*\
//     $WATCH
//*------------------------------------*/
const deps = [
  'css',
  'pug',
  'copy',
  'browser-sync',
];

gulp.task('watch', deps, function() {
  gulp.watch(`${conf.path.dev.css}/**/*.scss`, ['css:watch']);
  gulp.watch([`${conf.path.dev.js}/**/!(*.bundle).js`, `${conf.path.dev.js}/**/*.jsx`], ['scripts:lint']);
  gulp.watch(`${conf.path.dev.app}/**/*.pug`, ['pug:watch']);
  return gulp.watch(`${conf.path.dev.img}/raw/**/*`, ['images:watch']);
});





//*------------------------------------*\
//     $WATCH TESTS
//*------------------------------------*/
gulp.task('watch:tests', function() {
  gulp.watch([`${conf.path.dev.js}/**/*.js`])
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
          testFile = 'src/assets/js/**/*_test.js';
        }
      }

      runTest(testFile);
    });

  function log(msg, color = 'green') {
    gutil.log(gutil.colors[color](msg));
  }

  function runTest(glob) {
    return gulp.src(glob, { read: false })
      .pipe(shell(`$(which babel-tape-runner) ${glob} | faucet`))
      .on('error', () => {});
  }
});
