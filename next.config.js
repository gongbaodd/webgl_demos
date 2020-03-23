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
const nextSourceMaps = require("@zeit/next-source-maps")();
const withManifest = require("next-manifest");
const offline = require("next-offline");
const sentryConfig = require("./config/sentry.js");
const manifest = require("./config/manifest");

module.exports = withPlugins([
  [offline],
  [nextSourceMaps, sentryConfig],
  [withManifest, manifest],
  [withTM],
]);
