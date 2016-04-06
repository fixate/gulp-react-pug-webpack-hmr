gulp        = require 'gulp'
jade        = require 'gulp-jade'
minifyHTML  = require 'gulp-minify-html'
utils       = require './utils'

conf        = require '../gulpconfig'





#*------------------------------------*\
#     $JADE
#*------------------------------------*/
gulp.task 'jade', () ->
  gulp.src(["#{conf.path.dev.app}/index.jade"])
    .pipe jade().on('error', utils.handleError)
    .pipe gulp.dest(conf.path.dist.app)





#*------------------------------------*\
#     $JADE MINIFY
#*------------------------------------*/
gulp.task 'jade:minify', () ->
  gulp.src(["#{conf.path.dev.app}/index.jade"])
    .pipe jade().on('error', utils.handleError)
    .pipe minifyHTML({conditionals: true})
    .pipe gulp.dest(conf.path.dist.app)





#*------------------------------------*\
#     $JADE WATCH
#*------------------------------------*/
gulp.task 'jade:watch', ['jade'], () ->
  watching = true
  global.browserSync.reload()
