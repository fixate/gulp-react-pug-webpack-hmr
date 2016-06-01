gulp         = require 'gulp'
runSequence  = require 'run-sequence'





#*------------------------------------*\
#     $BUILD
#*------------------------------------*/
gulp.task 'build', () ->
  runSequence(
    'clean:build',
    [
      'fonts:copy',
      'images:copy',
      'scripts:minify',
      'css:minify',
      'pug:minify',
    ]
  )
