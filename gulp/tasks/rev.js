const gulp        = require('gulp');
const imagemin    = require('gulp-imagemin');
const pngquant    = require('imagemin-pngquant');
const rename      = require('gulp-rename');
const regexRename = require('gulp-regex-rename');
const replace     = require('gulp-replace');
const rev         = require('gulp-rev');
const revReplace  = require('gulp-rev-replace');


const conf = require('../gulpconfig');





//*------------------------------------*\
//     $REV CSS
//*------------------------------------*/
gulp.task('rev:css', ['minify:css'], () =>
  gulp.src([`${conf.path.prod.css}/style.min.css`])
    .pipe(regexRename(/\.min/, ''))
    .pipe(rev())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(conf.path.prod.css))
    .pipe(rev.manifest(conf.revManifest.path, conf.revManifest.opts))
    .pipe(gulp.dest('./'))
);





//*------------------------------------*\
//     $REV SCRIPTS
//*------------------------------------*/
gulp.task('rev:scripts', ['minify:scripts'], () =>
  gulp.src([`${conf.path.prod.js}/*.bundle.min.js`])
    .pipe(regexRename(/\.min/, ''))
    .pipe(rev())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(conf.path.prod.js))
    .pipe(rev.manifest(conf.revManifest.path, conf.revManifest.opts))
    .pipe(gulp.dest('./'))
);





//*------------------------------------*\
//     $REV FONTS
//*------------------------------------*/
gulp.task('rev:fonts', function() {
  let files = ['eot', 'woff', 'woff2', 'ttf', 'svg'].map(curr => `${conf.path.dev.fnt}/**/*${curr}`);

  return gulp.src(files)
    .pipe(rev())
    .pipe(gulp.dest(conf.path.prod.fnt))
    .pipe(rev.manifest(conf.revManifest.path, conf.revManifest.opts))
    .pipe(gulp.dest('./'));
});





//*------------------------------------*\
//     $REV IMAGES & OPTIMISE
//*------------------------------------*/
gulp.task('rev:images', () =>
  gulp.src(`${conf.path.dev.img}/**/*.{jpg,jpeg,png,svg}`)
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        { removeViewBox: false },
        { cleanupIDs: false },
      ],
      use: [pngquant()]
    }))
    .pipe(rev())
    .pipe(gulp.dest(conf.path.prod.img))
    .pipe(rev.manifest(conf.revManifest.path, conf.revManifest.opts))
    .pipe(gulp.dest('./'))
);





//*------------------------------------*\
//     $REV REPLACE
//*------------------------------------*/
gulp.task('rev:replace', ['rev:css', 'rev:scripts'], function() {
  let manifest = gulp.src(`./${conf.revManifest.path}`);

  return gulp.src([`${conf.path.prod.css}/*.css`, `${conf.path.prod.js}/*.js`], { base: './' })
    .pipe(revReplace({ manifest }))
    .pipe(gulp.dest('./'));
});

