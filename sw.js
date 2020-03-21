/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "app.1038986c.js",
    "revision": "a1cef58c122f0f4bbd0188165abbdcbd"
  },
  {
    "url": "app.189d7b54.js",
    "revision": "ba5d833e35840e1d46667770cacb1cf0"
  },
  {
    "url": "html/basic.html",
    "revision": "9a48f9901d0cb54454333bcbd51ead5b"
  },
  {
    "url": "html/welcome.html",
    "revision": "e83e5762234a810146e9cb925a9c29e6"
  },
  {
    "url": "index.html",
    "revision": "1a524113a0671109c7070f945db7fa43"
  },
  {
    "url": "style.a9316c5f.css",
    "revision": "a2bf9851abc27951ca1ff6d7f8925c73"
  },
  {
    "url": "/",
    "revision": "11a6ebbb8a7ceee630e1ddb9fc10e2b9"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"));
