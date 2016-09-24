const gulp        = require('gulp');
const runSequence = require('run-sequence');





/*------------------------------------*\
     BUILD
\*------------------------------------*/
gulp.task('build', done =>
  runSequence(
    'clean:build',
    [
      'copy',
      'scripts:minify',
      'css:minify',
    ],
    'useref',
    done
  )
);
