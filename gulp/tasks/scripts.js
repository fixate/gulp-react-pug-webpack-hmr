const gulp    = require('gulp');
const eslint  = require('gulp-eslint');
const webpack = require('webpack');

const path = require('../gulpconfig').path;

function runWebPack(config, done) {
  webpack(config).run(function(err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString({ chunks: false }));
    }

    return done();
  })
}





/*------------------------------------*\
     SCRIPTS
\*------------------------------------*/
gulp.task('scripts:minify', function(done) {
  let webpackConf = require('../../webpack.config.prod');

  return runWebPack(webpackConf, done);
});





/*------------------------------------*\
     SCRIPTS WATCH
\*------------------------------------*/
gulp.task('scripts:watch', ['scripts'],  () => global.browserSync.reload());





/*------------------------------------*\
     SCRIPTS VENDORS
\*------------------------------------*/
gulp.task('scripts:vendors', function(done) {});
  // files = [
  //   "#{path.dev.js}/vendor.js"
  // ]

  // runWebPack(entries, {}, done)
  //





/*------------------------------------*\
     SCRIPTS LINTING
\*------------------------------------*/
gulp.task('scripts:lint', function() {
  let files = [
    `${path.dev.js}/**/*.js`,
  ];

  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});
