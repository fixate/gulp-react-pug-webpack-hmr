const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const rename = require("gulp-rename");
const regexRename = require("gulp-regex-rename");
const replace = require("gulp-replace");
const rev = require("gulp-rev");
const revReplace = require("gulp-rev-replace");

const conf = require("../gulpconfig");

//*------------------------------------*\
//     $REV FONTS
//*------------------------------------*/
gulp.task("rev:fonts", function() {
  let files = ["eot", "woff", "woff2", "ttf", "svg"].map(
    curr => `${conf.path.dev.fnt}/**/*${curr}`
  );

  return gulp
    .src(files)
    .pipe(rev())
    .pipe(gulp.dest(conf.path.prod.fnt))
    .pipe(rev.manifest(conf.revManifest.path, conf.revManifest.opts))
    .pipe(gulp.dest("./"));
});

//*------------------------------------*\
//     $REV IMAGES & OPTIMISE
//*------------------------------------*/
gulp.task("rev:images", () =>
  gulp
    .src(`${conf.path.dev.img}/**/*.{jpg,jpeg,png,svg}`)
    .pipe(
      imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
        svgoPlugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        use: [pngquant()]
      })
    )
    .pipe(rev())
    .pipe(gulp.dest(conf.path.prod.img))
    .pipe(rev.manifest(conf.revManifest.path, conf.revManifest.opts))
    .pipe(gulp.dest("./"))
);

