const withTM = require("next-transpile-modules")([
  "react-babylonjs",
  "react-three-fiber",
  "@babylonjs/core",
  "@babylonjs/loaders",
  "three/examples/jsm/loaders/FBXLoader",
  "three/examples/jsm/controls/OrbitControls",
  "three",
]);
const withPlugins = require("next-compose-plugins");
const withOffline = require("next-offline");

module.exports = withPlugins([[withTM], [withOffline]]);
