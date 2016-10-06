const gulp                 = require('gulp');
const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const conf          = require('../gulpconfig');
const webpackConfig = require('../../webpack.config.dev');
const bundler       = webpack(webpackConfig);

gulp.task('browser-sync', () =>
  global.browserSync.init({
    server: {
      baseDir: 'dist',
      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConfig.output.publicPath,
          stats: {
            colors: true,
            chunks: false
          }
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler)
      ],
      routes: {
        '/assets/img': 'src/assets/img',
      },
    },
    injectchanges: true,
    open: false,
    notify: false,
    // tunnel: true,
  })
);
