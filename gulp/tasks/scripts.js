const gulp = require("gulp");
const eslint = require("gulp-eslint");
const webpack = require("webpack");

const path = require("../gulpconfig").path;

function runWebPack(config, done) {
  webpack(config).run(function(err, stats) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(
        stats.toString({ chunks: false, modules: false, colors: true })
      );
    }

    return done();
  });
}

/*------------------------------------*\
     SCRIPTS
\*------------------------------------*/
gulp.task("scripts:minify", function(done) {
  let webpackConf = require("../../webpack.config.prod");

  return runWebPack(webpackConf, done);
});

/*------------------------------------*\
     SCRIPTS VENDORS
\*------------------------------------*/
gulp.task("scripts:vendors", done => done());
// files = [
//   "#{path.dev.js}/vendor.js"
// ]

// runWebPack(entries, {}, done)
//

/*------------------------------------*\
     SCRIPTS LINTING
\*------------------------------------*/
gulp.task("scripts:lint", function() {
  let files = [`${path.dev.js}/**/*.js`];

  return gulp
    .src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

/*------------------------------------*\
/     $REV SCRIPTS
/*------------------------------------*/
gulp.task("rev:scripts", gulp.series(["scripts:minify"]), () =>
  gulp
    .src([`${conf.path.prod.js}/*.bundle.min.js`])
    .pipe(regexRename(/\.min/, ""))
    .pipe(rev())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(conf.path.prod.js))
    .pipe(rev.manifest(conf.revManifest.path, conf.revManifest.opts))
    .pipe(gulp.dest("./"))
);
