const gulp        = require('gulp');
const imagemin    = require('gulp-imagemin');
const pngquant    = require('imagemin-pngquant');
const replace     = require('gulp-replace');
const rename      = require('gulp-rename');
const regexRename = require('gulp-regex-rename');
const svgstore    = require('gulp-svgstore');

const conf = require('../gulpconfig');
const devPath = conf.path.dev;





//*------------------------------------*\
//     $IMAGES
//*------------------------------------*/
gulp.task('images:minify', () =>
  gulp.src(`${devPath}/raw/**/*.{jpg,jpeg,png,svg,ico}`)
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
    .pipe(gulp.dest(devPath.img))
);





//*------------------------------------*\
//     $INLINE SVG ICONS
//*------------------------------------*/
gulp.task('images:minify:inlinesvgicons', () =>
  gulp.src(`${devPath}/partials/svg/raw/inline-icons/*.svg`)
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(imagemin({
      svgoPlugins: [
        { removeViewBox: false },
      ],
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(regexRename(/\.svg/, '.svg.pug'))
    .pipe(gulp.dest(`${devPath.views}/partials/svg`))
);





//*------------------------------------*\
//     $OPTIMISE SVG PARTAILS
//*------------------------------------*/
gulp.task('images:minify:svgpartials', () =>
  gulp.src([
    `./${devPath.app}/partials/svg/raw/**/*.svg`,
    `!${devPath.app}/partials/svg/raw/inline-icons/**/*.svg`
  ])
    .pipe(replace('<g id=', '<g class='))
    .pipe(imagemin({
      svgoPlugins: [
        { removeViewBox: false },
        { mergePaths: false },
        { removeUselessStrokeAndFill: false },
      ],
    }))
    .pipe(regexRename(/\.svg/, '.svg.pug'))
    .pipe(gulp.dest(`${devPath.app}/partials/svg`))
);






//*------------------------------------*\
//     $IMAGES COPY
//*------------------------------------*/
const copyDepsList =[
  'images:minify',
  'images:minify:svgpartials',
  'images:minify:inlinesvgicons',
];

gulp.task('images:copy', copyDepsList, () =>
  gulp.src([`${devPath.img}/**/*`, `!${devPath.img}/raw/**/*`])
    .pipe(gulp.dest(conf.path.dist.img))
);





//*------------------------------------*\
//     $IMAGES WATCH
//*------------------------------------*/
gulp.task('images:watch', ["images:copy"], done => done());
gulp.task('images:watch:svgpartials', ["images:minify:svgpartials"], done => done());
gulp.task('images:watch:inlinesvgicons', ["images:minify:inlinesvgicons"], done => done());
