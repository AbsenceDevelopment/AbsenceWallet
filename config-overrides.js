/* config-overrides.js */
const rewireSass = require('react-app-rewire-scss');
const rewireSvgReactLoader = require('react-app-rewire-svg-react-loader');

module.exports = function override(config, env) {
  config = rewireSass(config, env);
  config = rewireSvgReactLoader(config, env);
  //do stuff with the webpack config...
  return config;
}
