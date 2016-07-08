const gulp = require('gulp');
const watch = require('gulp-watch');

const conf = require('../gulpconfig');





//*------------------------------------*\
//     $CSS WATCH
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

