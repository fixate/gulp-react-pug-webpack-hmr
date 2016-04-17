gulp        = require 'gulp'
pug         = require 'gulp-pug'
minifyHTML  = require 'gulp-minify-html'
utils       = require './utils'

conf        = require '../gulpconfig'





#*------------------------------------*\
#     $JADE
#*------------------------------------*/
gulp.task 'pug', () ->
  gulp.src(["#{conf.path.dev.app}/index.pug"])
    .pipe pug({ pretty: true }).on('error', utils.handleError)
    .pipe gulp.dest(conf.path.dist.app)





#*------------------------------------*\
#     $JADE MINIFY
#*------------------------------------*/
gulp.task 'pug:minify', () ->
  gulp.src(["#{conf.path.dev.app}/index.pug"])
    .pipe pug().on('error', utils.handleError)
    .pipe minifyHTML({conditionals: true})
    .pipe gulp.dest(conf.path.dist.app)





#*------------------------------------*\
#     $JADE WATCH
#*------------------------------------*/
gulp.task 'pug:watch', ['pug'], () ->
  watching = true
  global.browserSync.reload()
