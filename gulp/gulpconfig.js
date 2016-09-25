const devPath = 'src';
const devAssets = `${devPath}/assets`;
const distPath = 'dist';
const distAssets = `${distPath}/assets`;

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

  pug: {
    common: {
      data: {

      },
    },

    dev: {
      data: {
        basePath: '',
      },
    },

    dist: {
      data: {
        basePath: '',
      },
    },
  },
};

module.exports = config;
