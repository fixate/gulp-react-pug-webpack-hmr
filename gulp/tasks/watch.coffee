gulp  = require 'gulp'
watch = require 'gulp-watch'

conf = require '../gulpconfig'





#*------------------------------------*\
#     $CSS WATCH
#*------------------------------------*/
gulp.task 'watch', ['css', 'jade', 'browser-sync'], () ->
  gulp.watch "#{conf.path.dev.scss}/**/*.scss", ['css:watch']
  gulp.watch ["#{conf.path.dev.js}/**/*.js", "#{conf.path.dev.js}/**/*.jsx"], ['scripts:lint']
  gulp.watch "#{conf.path.dev.app}/**/*.jade", ['jade:watch']
