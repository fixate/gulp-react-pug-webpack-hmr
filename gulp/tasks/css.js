const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");

const conf = require("../gulpconfig");

//*------------------------------------*\
//     $CSS
//*------------------------------------*/
gulp.task("css", () =>
  gulp
    .src([`${conf.path.dev.css}/**/*.{scss,sass}`])
    .pipe(sourcemaps.init())
    .pipe(sass(conf.sass).on("error", sass.logError))
    .pipe(autoprefixer({ browsers: ["last 2 versions"] }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(conf.path.dist.css))
);

//*------------------------------------*\
//     $CSS MINIFY
//*------------------------------------*/
gulp.task("css:minify", () =>
  gulp
    .src([`${conf.path.dev.css}/**/*.{scss,sass}`])
    .pipe(sass(conf.sass).on("error", sass.logError))
    .pipe(autoprefixer({ browsers: ["last 2 versions"] }))
    .pipe(cssnano())
    .pipe(gulp.dest(conf.path.dist.css))
);

//*------------------------------------*\
//     $CSS WATCH
//*------------------------------------*/
gulp.task("css:watch", gulp.series(["css"]), () =>
  global.browserSync.reload("*.css")
);

//*------------------------------------*\
//     $MINIFY CSS
//*------------------------------------*/
gulp.task("minify:css", gulp.series(["css"]), () =>
  gulp
    .src([`${conf.path.dev.css}/style.css`])
    .pipe(cssnano())
    .pipe(regexRename(/\.css/, ".min.css"))
    .pipe(gulp.dest(conf.path.prod.css))
);

//*------------------------------------*\
//     $REV CSS
//*------------------------------------*/
gulp.task("rev:css", gulp.series(["minify:css"]), () =>
  gulp
    .src([`${conf.path.prod.css}/style.min.css`])
    .pipe(regexRename(/\.min/, ""))
    .pipe(rev())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(conf.path.prod.css))
    .pipe(rev.manifest(conf.revManifest.path, conf.revManifest.opts))
    .pipe(gulp.dest("./"))
);
