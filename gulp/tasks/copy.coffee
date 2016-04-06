gulp = require 'gulp'

conf = require '../gulpconfig'




#*------------------------------------*\
#     $FONTS
#*------------------------------------*/
gulp.task 'copy', ['fonts:copy'], (done) ->
  done()
