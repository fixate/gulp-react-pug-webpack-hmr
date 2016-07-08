const gulp = require('gulp');

const conf = require('../gulpconfig');




//*------------------------------------*\
//     $COPY FONTS
//*------------------------------------*/
gulp.task('copy', ['fonts:copy'], done => done());
