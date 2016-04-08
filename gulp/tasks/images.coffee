gulp     = require 'gulp'
imagemin = require 'gulp-imagemin'
pngquant = require 'imagemin-pngquant'

conf = require '../gulpconfig'





#*------------------------------------*\
#     $IMAGES
#*------------------------------------*/
gulp.task 'images:minify', () ->
  gulp.src("#{conf.path.dev.img}/raw/**/*.{jpg,jpeg,png,svg,ico}")
    .pipe imagemin {
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        { removeDimensions: true },
        { cleanupIDs: false },
        { removeViewBox: false },
      ],
      use: [pngquant()]
    }
    .pipe gulp.dest("#{conf.path.dev.img}")





#*------------------------------------*\
#     $IMAGES COPY
#*------------------------------------*/
gulp.task 'images:copy', ["images:minify"], () ->
  gulp.src(["#{conf.path.dev.img}/**/*", "!#{conf.path.dev.img}/raw/**/*"])
    .pipe gulp.dest(conf.path.dist.img)
