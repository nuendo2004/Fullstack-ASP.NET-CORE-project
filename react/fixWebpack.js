const replace = require("replace-in-file");
const logger = require("sabio-debug").extend("config");
logger.enabled = true;

const newAlias = `'@services': paths.appSrc +"/services",
'@components': paths.appSrc +"/components",`;

const options = {
  files: "./node_modules/react-scripts/config/webpack.config.js",
  from: `'react-native': 'react-native-web',`,
  to: newAlias,
};

try {
  const results = replace.sync(options);
  logger("Webpack Config Changed", results[0].hasChanged);
} catch (error) {
  logger("Error occurred:", error);
}
