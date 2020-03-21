const withTM = require("next-transpile-modules")([
  "react-babylonjs",
  "react-three-fiber",
  "@babylonjs/core",
  "@babylonjs/loaders",
  "three/examples/jsm/loaders/FBXLoader",
  "three/examples/jsm/controls/OrbitControls",
  "three",
]);

module.exports = withTM();
