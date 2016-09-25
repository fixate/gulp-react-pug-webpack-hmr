const gulp       = require('gulp');
const pug        = require('gulp-pug');
const utils      = require('./utils');
const deepAssign = require('deep-assign');

const conf = require('../gulpconfig');




function compilePug(env = 'dev') {
  return gulp.src([`${conf.path.dev.app}/**/!(_)*.pug`])
    .pipe(pug({
      pretty: true,
      data: deepAssign({}, conf.pug.common.data, conf.pug[env].data),
    }).on('error', utils.handleError))
    .pipe(gulp.dest(conf.path.dist.app));
}





/*------------------------------------*\
     PUG
\*------------------------------------*/
gulp.task('pug', () =>
  compilePug()
);





/*------------------------------------*\
     PUG DIST
\*------------------------------------*/
gulp.task('pug:dist', () =>
  compilePug('dist')
);





/*------------------------------------*\
     PUG WATCH
\*------------------------------------*/
gulp.task('pug:watch', ['pug'], function() {
  let watching = true;
  return global.browserSync.reload();
});
