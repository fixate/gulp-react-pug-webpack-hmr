const gulp       = require('gulp');
const gulpif     = require('gulp-if');
const rev        = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const useref     = require('gulp-useref');
const htmlMin    = require('gulp-htmlmin');

const conf = require('../gulpconfig');





/*------------------------------------*\
     USEREF
\*------------------------------------*/
gulp.task('useref', ['pug:dist'], () =>
  gulp.src([`${conf.path.dist.app}/**/*.html`])
    .pipe(useref({ searchPath: `${conf.path.dist.app}` }))

    .pipe(gulpif('*.js', rev()))

    .pipe(gulpif('*.css', rev()))

    .pipe(revReplace())

    .pipe(
      gulpif('*.html', htmlMin({
        collapseWhitespace: true,
        minifyJS: true,
      }))
    )

    .pipe(gulp.dest(conf.path.dist.app))
);
