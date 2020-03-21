const withTM = require("next-transpile-modules")([
  "react-babylonjs",
  "@babylonjs/core",
  "@babylonjs/loaders",
  "three/examples/jsm/loaders/FBXLoader",
  "three/examples/jsm/controls/OrbitControls",
]);

module.exports = withTM();
