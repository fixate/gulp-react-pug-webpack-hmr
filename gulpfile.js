/* ------------------------------------ *\
#     $GULPFILE
\* ------------------------------------ */
/*
 All tasks are configured in ./gulp/tasks
 Simply add a new task there, and it will be automatically available as a gulp
 task for your project
*/
const gulp = require("gulp");
const requireDir = require("require-dir");
const browserSync = require("browser-sync").create();

const fancyLog = require("fancy-log");
const ansi = require("ansi-colors");
const shell = require("gulp-shell");

const path = require("path");
const fs = require("fs");
const watch = require("gulp-watch");

const conf = require("./gulp/gulpconfig");
const devPath = conf.path.dev;

global.browserSync = browserSync;

requireDir("./gulp/tasks", { recurse: false });

/*------------------------------------*\
     $WATCH
\*------------------------------------*/
const watchDeps = ["css", "images:copy", "fonts:copy", "browser-sync"];

gulp.task("watch", gulp.parallel(watchDeps), function() {
  gulp.watch(`${devPath.css}/**/*.scss`, ["css:watch"]);

  // Webpack runs via the browser-sync task when js files are changed.
  // We only run eslint from here
  gulp.watch(
    [`${devPath.js}/**/!(*.bundle).js`, `${devPath.js}/**/*.jsx`],
    ["scripts:lint"]
  );

  gulp.watch(`${devPath.app}/**/*.pug`, ["pug:watch"]);

  gulp.watch(`${devPath.img}/raw/svg/inline-icons/**/*.svg`, [
    "images:watch:inlinesvgicons"
  ]);
  gulp.watch(`${devPath.img}/raw/svg/partials/svg/raw/**/*.svg`, [
    "images:watch:svgpartials"
  ]);

  return gulp.watch(
    [
      `${devPath.img}/raw/**/*`,
      `!${devPath.img}/raw/svg/inline-icons/**/*`,
      `!${devPath.img}/raw/svg/partials/**/*`
    ],
    ["images:watch"]
  );
});

/*------------------------------------*\
     $WATCH TESTS
\*------------------------------------*/
gulp.task("watch:tests", function() {
  gulp.watch([`${devPath.js}/**/*.js`]).on("change", file => {
    const basename = path.basename(file.path);
    const isTestFile = /_test/.test(basename);
    let testFile = file.path;

    if (isTestFile) {
      log(`Running ${basename}`);
    } else {
      try {
        const matchingTestFile = file.path.replace(/\.js$/, "_test.js");

        fs.accessSync(matchingTestFile, fs.F_OK);
        log(`Running ${path.basename(matchingTestFile)}`);
        testFile = matchingTestFile;
      } catch (e) {
        log(`No matching test file for ${basename}.`, "red");
        log("Running all tests");
        testFile = `${devPath.app}/**/*_test.js`;
      }
    }

    runTest(testFile);
  });

  function log(msg, color = "green") {
    fancyLog(ansi[color](msg));
  }

  function runTest(glob) {
    return gulp
      .src("./", { read: false })
      .pipe(shell(`$(which babel-tape-runner) ${glob} | faucet`))
      .on("error", () => {});
  }
});

/*------------------------------------*\
/     $COPY ASSETS
/*------------------------------------*/
const copyAssetsDeps = ["fonts:copy", "images:copy", "favicons:copy"];

gulp.task("copy", gulp.parallel(copyAssetsDeps), done => done());

/*------------------------------------*\
/     $REV REPLACE
/*------------------------------------*/
gulp.task("rev:replace", gulp.parallel(["rev:css", "rev:scripts"]), function() {
  let manifest = gulp.src(`./${conf.revManifest.path}`);

  return gulp
    .src([`${conf.path.prod.css}/*.css`, `${conf.path.prod.js}/*.js`], {
      base: "./"
    })
    .pipe(revReplace({ manifest }))
    .pipe(gulp.dest("./"));
});
/*------------------------------------*\
     BUILD
\*------------------------------------*/
gulp.task(
  "build",
  gulp.series(
    "clean:build",
    gulp.parallel("copy", "scripts:minify", "css:minify"),
    "useref"
  ),
  done => done()
);
/* ------------------------------------ *\
#     $DEFAULT TASK
\* ------------------------------------ */
gulp.task("default", gulp.series(["watch"]), done => done());
