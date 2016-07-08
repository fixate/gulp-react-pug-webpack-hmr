const gulp     = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

const conf = require('../gulpconfig');





//*------------------------------------*\
//     $IMAGES
//*------------------------------------*/
gulp.task('images:minify', () =>
  gulp.src(`${conf.path.dev.img}/raw/**/*.{jpg,jpeg,png,svg,ico}`)
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        { cleanupIDs: true },
        { removeViewBox: false },
      ],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(conf.path.dev.img))
);





//*------------------------------------*\
//     $IMAGES COPY
//*------------------------------------*/
gulp.task('images:copy', ["images:minify"], () =>
  gulp.src([`${conf.path.dev.img}/**/*`, `!${conf.path.dev.img}/raw/**/*`])
    .pipe(gulp.dest(conf.path.dist.img))
);





//*------------------------------------*\
//     $IMAGES WATCH
//*------------------------------------*/
gulp.task('images:watch', ["images:copy"], done => done());
