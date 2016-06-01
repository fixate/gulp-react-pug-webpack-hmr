gulp        = require 'gulp'
pug         = require 'gulp-pug'
minifyHTML  = require 'gulp-minify-html'
utils       = require './utils'

conf        = require '../gulpconfig'





#*------------------------------------*\
#     $PUG
#*------------------------------------*/
gulp.task 'pug', () ->
  gulp.src(["#{conf.path.dev.app}/index.pug"])
    .pipe pug({ pretty: true }).on('error', utils.handleError)
    .pipe gulp.dest(conf.path.dist.app)





#*------------------------------------*\
#     $PUG MINIFY
#*------------------------------------*/
gulp.task 'pug:minify', () ->
  gulp.src(["#{conf.path.dev.app}/index.pug"])
    .pipe pug().on('error', utils.handleError)
    .pipe minifyHTML({conditionals: true})
    .pipe gulp.dest(conf.path.dist.app)





#*------------------------------------*\
#     $PUG WATCH
#*------------------------------------*/
gulp.task 'pug:watch', ['pug'], () ->
  watching = true
  global.browserSync.reload()
