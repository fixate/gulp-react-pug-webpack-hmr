const gulp = require('gulp');
const del  = require('del');

const conf = require('../gulpconfig');




//*------------------------------------*\
//     $CLEAN FOR BUILD
//*------------------------------------*/
gulp.task('clean:build', done =>
  del([
    `${conf.path.dist.app}/**/*`,
  ], done)
);

