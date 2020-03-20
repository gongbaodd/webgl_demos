const withTM = require("next-transpile-modules")([
  "react-babylonjs",
  "@babylonjs/core",
  "@babylonjs/loaders",
]);

module.exports = withTM();
