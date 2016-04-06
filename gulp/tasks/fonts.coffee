gulp = require 'gulp'

conf = require '../gulpconfig'




#*------------------------------------*\
#     $FONTS
#*------------------------------------*/
gulp.task 'fonts:copy', () ->
  return gulp.src("#{conf.path.dev.fnt}/**/*")
    .pipe gulp.dest(conf.path.dist.fnt)
