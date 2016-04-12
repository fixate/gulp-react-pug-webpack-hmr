gulp         = require "gulp"
del          = require "del"

conf = require '../gulpconfig'




#*------------------------------------*\
#     $CLEAN FOR BUILD
#*------------------------------------*/
gulp.task 'clean:build', (done) ->
  del [
    "#{conf.path.dist.app}/**/*",
  ], done
