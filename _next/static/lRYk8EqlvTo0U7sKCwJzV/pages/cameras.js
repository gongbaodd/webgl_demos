(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"/+9n":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/cameras",function(){return n("Cfxr")}])},"2qu3":function(e,t,n){"use strict";var r=n("/GRZ"),a=n("i2R6"),o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=o(n("q1tI")),i=n("8L3h"),l=n("jwwS"),s=[],d=[],c=!1;function f(e){var t=e(),n={loading:!0,loaded:null,error:null};return n.promise=t.then((function(e){return n.loading=!1,n.loaded=e,e})).catch((function(e){throw n.loading=!1,n.error=e,e})),n}function p(e){var t={loading:!1,loaded:{},error:null},n=[];try{Object.keys(e).forEach((function(r){var a=f(e[r]);a.loading?t.loading=!0:(t.loaded[r]=a.loaded,t.error=a.error),n.push(a.promise),a.promise.then((function(e){t.loaded[r]=e})).catch((function(e){t.error=e}))}))}catch(r){t.error=r}return t.promise=Promise.all(n).then((function(e){return t.loading=!1,e})).catch((function(e){throw t.loading=!1,e})),t}function h(e,t){return u.default.createElement((n=e)&&n.__esModule?n.default:n,t);var n}function _(e,t){var n=Object.assign({loader:null,loading:null,delay:200,timeout:null,render:h,webpack:null,modules:null},t),r=null;function a(){if(!r){var t=new m(e,n);r={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return r.promise()}if(!c&&"function"===typeof n.webpack){var o=n.webpack();d.push((function(e){var t=!0,n=!1,r=void 0;try{for(var u,i=o[Symbol.iterator]();!(t=(u=i.next()).done);t=!0){var l=u.value;if(-1!==e.indexOf(l))return a()}}catch(s){n=!0,r=s}finally{try{t||null==i.return||i.return()}finally{if(n)throw r}}}))}var s=function(e,t){a();var o=u.default.useContext(l.LoadableContext),s=i.useSubscription(r);return u.default.useImperativeHandle(t,(function(){return{retry:r.retry}})),o&&Array.isArray(n.modules)&&n.modules.forEach((function(e){o(e)})),s.loading||s.error?u.default.createElement(n.loading,{isLoading:s.loading,pastDelay:s.pastDelay,timedOut:s.timedOut,error:s.error,retry:r.retry}):s.loaded?n.render(s.loaded,e):null};return s.preload=function(){return a()},s.displayName="LoadableComponent",u.default.forwardRef(s)}var m=function(){function e(t,n){r(this,e),this._loadFn=t,this._opts=n,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}return a(e,[{key:"promise",value:function(){return this._res.promise}},{key:"retry",value:function(){var e=this;this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};var t=this._res,n=this._opts;t.loading&&("number"===typeof n.delay&&(0===n.delay?this._state.pastDelay=!0:this._delay=setTimeout((function(){e._update({pastDelay:!0})}),n.delay)),"number"===typeof n.timeout&&(this._timeout=setTimeout((function(){e._update({timedOut:!0})}),n.timeout))),this._res.promise.then((function(){e._update(),e._clearTimeouts()})).catch((function(t){e._update(),e._clearTimeouts()})),this._update({})}},{key:"_update",value:function(e){this._state=Object.assign(Object.assign({},this._state),e),this._callbacks.forEach((function(e){return e()}))}},{key:"_clearTimeouts",value:function(){clearTimeout(this._delay),clearTimeout(this._timeout)}},{key:"getCurrentValue",value:function(){return Object.assign(Object.assign({},this._state),{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading})}},{key:"subscribe",value:function(e){var t=this;return this._callbacks.add(e),function(){t._callbacks.delete(e)}}}]),e}();function y(e){return _(f,e)}function b(e,t){for(var n=[];e.length;){var r=e.pop();n.push(r(t))}return Promise.all(n).then((function(){if(e.length)return b(e,t)}))}y.Map=function(e){if("function"!==typeof e.render)throw new Error("LoadableMap requires a `render(loaded, props)` function");return _(p,e)},y.preloadAll=function(){return new Promise((function(e,t){b(s).then(e,t)}))},y.preloadReady=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise((function(t){var n=function(){return c=!0,t()};b(d,e).then(n,n)}))},window.__NEXT_PRELOADREADY=y.preloadReady,t.default=y},Cfxr:function(e,t,n){"use strict";n.r(t),n.d(t,"__N_SSG",(function(){return d}));var r=n("q1tI"),a=n.n(r),o=n("a6RD"),u=n.n(o),i=n("apO0"),l=a.a.createElement,s=u()((function(){return Promise.all([n.e(4),n.e(3),n.e(6),n.e(18)]).then(n.bind(null,"xxq1"))}),{loadableGenerated:{webpack:function(){return["xxq1"]},modules:["../playgrounds/cameras"]}}),d=!0;t.default=function(e){var t=e.menuItems;return l(i.a,{menuItems:t},l(s,null))}},a6RD:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n("q1tI")),o=r(n("2qu3")),u=!1;function i(e,t){if(delete t.webpack,delete t.modules,!u)return e(t);var n=t.loading;return function(){return a.default.createElement(n,{error:null,isLoading:!0,pastDelay:!1,timedOut:!1})}}t.noSSR=i,t.default=function(e,t){var n=o.default,r={loading:function(e){e.error,e.isLoading;return e.pastDelay,null}};if(e instanceof Promise?r.loader=function(){return e}:"function"===typeof e?r.loader=e:"object"===typeof e&&(r=Object.assign(Object.assign({},r),e)),r=Object.assign(Object.assign({},r),t),"object"===typeof e&&!(e instanceof Promise)&&(e.render&&(r.render=function(t,n){return e.render(n,t)}),e.modules)){n=o.default.Map;var a={},u=e.modules();Object.keys(u).forEach((function(e){var t=u[e];"function"!==typeof t.then?a[e]=t:a[e]=function(){return t.then((function(e){return e.default||e}))}})),r.loader=a}if(r.loadableGenerated&&delete(r=Object.assign(Object.assign({},r),r.loadableGenerated)).loadableGenerated,"boolean"===typeof r.ssr){if(!r.ssr)return delete r.ssr,i(n,r);delete r.ssr}return n(r)}},jwwS:function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n("q1tI"));t.LoadableContext=a.createContext(null)}},[["/+9n",1,0,2,5]]]);