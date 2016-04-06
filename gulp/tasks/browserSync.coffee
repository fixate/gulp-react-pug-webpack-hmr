gulp                 = require 'gulp'
webpack              = require 'webpack'
webpackDevMiddleware = require 'webpack-dev-middleware'
webpackHotMiddleware = require 'webpack-hot-middleware'

conf = require '../gulpconfig'
webpackConfig = require '../webpack.config.dev'
bundler = webpack(webpackConfig)

gulp.task 'browser-sync', () ->
  global.browserSync.init {
    server:
      baseDir: 'dist'
      middleware: [
        webpackDevMiddleware(bundler, {
          # IMPORTANT: dev middleware can't access config, so we should
          # provide publicPath by ourselves
          publicPath: webpackConfig.output.publicPath,

          hot: true
          inline: true
          # pretty colored output
          stats: {
            colors: true
            chunks: false
          }

          # for other settings see
          # http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        # bundler should be the same as above
        webpackHotMiddleware(bundler)
      ]
    injectchanges: true
    open: false
    # files: [
    #   "#{conf.path.dist.css}/**/*.css"
    #   "#{conf.path.dist.app}/**/*.html"
    # ]
    # notify: false
    # tunnel: true
  }

gulp.task 'bs-reload', () ->
  global.browserSync.reload()
