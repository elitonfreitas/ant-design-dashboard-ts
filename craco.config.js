const CracoLessPlugin = require('craco-less');
const { getThemeVariables } = require('antd/dist/theme');

const modifyVariables = getThemeVariables({
  dark: false,
});
modifyVariables['@primary-color'] = '#7d1ae5';
modifyVariables['@form-vertical-label-padding'] = '0 0 4px';

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: modifyVariables,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
