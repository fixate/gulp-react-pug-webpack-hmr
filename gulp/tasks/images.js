const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const replace = require("gulp-replace");
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");

const conf = require("../gulpconfig");
const devPath = conf.path.dev;

/*------------------------------------*\
     MINIFIY IMAGES
\*------------------------------------*/
gulp.task("images:minify", () =>
  gulp
    .src([
      `./${devPath.img}/raw/**/*.{jpg,jpeg,png,svg,ico}`,
      `!${devPath.img}/raw/svg/inline-icons/**/*.svg`,
      `!${devPath.img}/raw/svg/partials/**/*.svg`
    ])
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest(devPath.img))
);

/*------------------------------------*\
     MINIFY INLINE SVG ICONS
\*------------------------------------*/
gulp.task("images:minify:inlinesvgicons", () =>
  gulp
    .src(`${devPath.img}/raw/svg/inline-icons/*.svg`)
    .pipe(rename({ prefix: "icon-" }))
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [{ removeViewBox: false }]
        })
      ])
    )
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(
      rename({
        extname: ".svg.pug",
        prefix: "_"
      })
    )
    .pipe(gulp.dest(`${devPath.views}/_partials/svg`))
);

/*------------------------------------*\
     MINIFY SVG PARTIALS
\*------------------------------------*/
gulp.task("images:minify:svgpartials", () =>
  gulp
    .src([`./${devPath.img}/raw/svg/partials/**/*.svg`])
    .pipe(replace("<g id=", "<g class="))
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { mergePaths: false },
            { removeUselessStrokeAndFill: false }
          ]
        })
      ])
    )
    .pipe(
      rename({
        extname: ".svg.pug",
        prefix: "_"
      })
    )
    .pipe(gulp.dest(`${devPath.views}/_partials/svg`))
);

/*------------------------------------*\
     COPY IMAGES
\*------------------------------------*/
const copyDepsList = [
  "images:minify",
  "images:minify:svgpartials",
  "images:minify:inlinesvgicons"
];

gulp.task("images:copy", gulp.parallel(copyDepsList), () =>
  gulp
    .src([`${devPath.img}/**/*`, `!${devPath.img}/raw/**/*`])
    .pipe(gulp.dest(conf.path.dist.img))
);

/*------------------------------------*\
     IMAGE WATCHERS
\*------------------------------------*/
gulp.task("images:watch", gulp.series(["images:copy"]), done => done());
gulp.task(
  "images:watch:svgpartials",
  gulp.series(["images:minify:svgpartials"]),
  done => done()
);
gulp.task(
  "images:watch:inlinesvgicons",
  gulp.series(["images:minify:inlinesvgicons"]),
  done => done()
);
