const devPath = 'src';
const devAssets = `${devPath}/assets`;
const distPath = 'dist';
const distAssets = `${distPath}/assets`;
const pugData = require('./pug');

const config = {
  path: {
    dev: {
      app: devPath,
      assets: `${devAssets}`,
      css:    `${devAssets}/css`,
      js:     `${devAssets}/js`,
      img:    `${devAssets}/img`,
      fnt:    `${devAssets}/fnt`
    },
    dist: {
      app: distPath,
      assets: `${distAssets}`,
      css:    `${distAssets}/css`,
      js:     `${distAssets}/js`,
      img:    `${distAssets}/img`,
      fnt:    `${distAssets}/fnt`
    }
  },

  pug: pugData,

  sass: {
    includePaths: ['node_modules'],
  },
};

module.exports = config;
