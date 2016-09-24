const gulp = require('gulp');

const conf = require('../gulpconfig');





/*------------------------------------*\
     FONTS
\*------------------------------------*/
gulp.task('fonts:copy', () =>
  gulp.src(`${conf.path.dev.fnt}/**/*`)
    .pipe(gulp.dest(conf.path.dist.fnt))
);
