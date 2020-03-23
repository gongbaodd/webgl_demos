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
const withPWA = require("next-pwa");
const nextSourceMaps = require("@zeit/next-source-maps")();
const sentryConfig = require("./config/sentry.js");

module.exports = withPlugins([
  [
    withPWA,
    {
      pwa: {
        dest: "public",
      },
    },
  ],
  [nextSourceMaps, sentryConfig],
  [withTM],
]);
