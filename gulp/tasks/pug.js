const gulp       = require('gulp');
const pug        = require('gulp-pug');
const minifyHTML = require('gulp-minify-html');
const utils      = require('./utils');

const conf = require('../gulpconfig');





//*------------------------------------*\
//     $PUG
//*------------------------------------*/
gulp.task('pug', () =>
  gulp.src([`${conf.path.dev.app}/index.pug`])
    .pipe(pug({
      pretty: true,
      data: {
        myLocalVar: 'local variable value'
      }
    }).on('error', utils.handleError))
    .pipe(gulp.dest(conf.path.dist.app))
);





//*------------------------------------*\
//     $PUG MINIFY
//*------------------------------------*/
gulp.task('pug:minify', () =>
  gulp.src([`${conf.path.dev.app}/index.pug`])
    .pipe(pug({
      data: {
        myLocalVar: 'local variable value'
      }
    }).on('error', utils.handleError))
    .pipe(minifyHTML({conditionals: true}))
    .pipe(gulp.dest(conf.path.dist.app))
);





//*------------------------------------*\
//     $PUG WATCH
//*------------------------------------*/
gulp.task('pug:watch', ['pug'], function() {
  let watching = true;
  return global.browserSync.reload();
});

