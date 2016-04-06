devPath = 'src'
devAssets = "#{devPath}/assets"
distPath = 'dist'
distAssets = "#{distPath}/assets"

module.exports =
  path:
    dev:
      app: devPath
      assets: "#{devAssets}"
      css:    "#{devAssets}/css"
      js:     "#{devAssets}/js"
      img:    "#{devAssets}/img"
      fnt:    "#{devAssets}/fnt"
      scss:   "#{devAssets}/css/scss"
    dist:
      app: distPath
      assets: "#{distAssets}"
      css:    "#{distAssets}/css"
      js:     "#{distAssets}/js"
      img:    "#{distAssets}/img"
      fnt:    "#{distAssets}/fnt"
      scss:   "#{distAssets}/css/scss"
