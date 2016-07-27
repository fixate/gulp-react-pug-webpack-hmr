const gulp = require('gulp');

const conf = require('../gulpconfig');




//*------------------------------------*\
//     $COPY FONTS
//*------------------------------------*/
const deps = [
  'fonts:copy',
  'images:copy',
  'favicons:copy',
];

gulp.task('copy', deps, done => done());
