gulp         = require "gulp"
del          = require "del"

conf = require '../gulpconfig'

gulp.task 'clean:build', (done) ->
  del [
    "#{conf.path.dist}/**/*",
  ], done
