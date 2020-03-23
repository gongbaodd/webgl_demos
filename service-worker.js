try{self["workbox:core:5.1.1"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.1"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const c=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");class a{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let c,a=i&&i.handler;if(!a&&this.s&&(a=this.s),a){try{c=a.handle({url:s,request:e,event:t,params:n})}catch(e){c=Promise.reject(e)}return c instanceof Promise&&this.i&&(c=c.catch(n=>this.i.handle({url:s,request:e,event:t}))),c}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const c=i.match({url:e,request:t,event:s});if(c)return n=c,(Array.isArray(c)&&0===c.length||c.constructor===Object&&0===Object.keys(c).length||"boolean"==typeof c)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const o=()=>(r||(r=new a,r.addFetchListener(),r.addCacheListener()),r);const h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[h.prefix,e,h.suffix].filter(e=>e&&e.length>0).join("-"),f=e=>e||u(h.precache),l=e=>e||u(h.runtime);function d(e){e.then(()=>{})}const w=new Set;class p{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.h=e,this.u=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.h,this.u);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:i,includeKeys:c=!1}={}){return await this.transaction([e],"readonly",(a,r)=>{const o=a.objectStore(e),h=t?o.index(t):o,u=[],f=h.openCursor(s,n);f.onsuccess=()=>{const e=f.result;e?(u.push(c?e:e.value),i&&u.length>=i?r(u):e.continue()):r(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,i)=>{const c=this.o.transaction(e,t);c.onabort=()=>i(c.error),c.oncomplete=()=>n(),s(c,e=>n(e))})}async g(e,t,s,...n){return await this.transaction([t],s,(s,i)=>{const c=s.objectStore(t),a=c[e].apply(c,n);a.onsuccess=()=>i(a.result)})}close(){this.o&&(this.o.close(),this.o=null)}}p.prototype.OPEN_TIMEOUT=2e3;const b={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(b))for(const s of t)s in IDBObjectStore.prototype&&(p.prototype[s]=async function(t,...n){return await this.g(s,t,e,...n)});try{self["workbox:expiration:5.1.1"]&&_()}catch(e){}const y=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class g{constructor(e){this.m=e,this.o=new p("workbox-expiration",1,{onupgradeneeded:e=>this.v(e)})}v(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.m)}async setTimestamp(e,t){const s={url:e=y(e),timestamp:t,cacheName:this.m,id:this.R(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.R(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const i=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),c=[];let a=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.m&&(e&&n.timestamp<e||t&&a>=t?c.push(s.value):a++),s.continue()}else n(c)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}R(e){return this.m+"|"+y(e)}}class m{constructor(e,t={}){this.q=!1,this._=!1,this.U=t.maxEntries,this.T=t.maxAgeSeconds,this.m=e,this.L=new g(e)}async expireEntries(){if(this.q)return void(this._=!0);this.q=!0;const e=this.T?Date.now()-1e3*this.T:0,t=await this.L.expireEntries(e,this.U),s=await self.caches.open(this.m);for(const e of t)await s.delete(e);this.q=!1,this._&&(this._=!1,d(this.expireEntries()))}async updateTimestamp(e){await this.L.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.T){return await this.L.getTimestamp(e)<Date.now()-1e3*this.T}return!1}async delete(){this._=!1,await this.L.expireEntries(1/0)}}const v=(e,t)=>e.filter(e=>t in e),R=async({request:e,mode:t,plugins:s=[]})=>{const n=v(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},q=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const c=await self.caches.open(e),a=await R({plugins:i,request:t,mode:"read"});let r=await c.match(a,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;r=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:r,request:a})}return r},x=async({cacheName:e,request:s,response:n,event:i,plugins:a=[],matchOptions:r})=>{const o=await R({plugins:a,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:c(o.url)});const h=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,c=!1;for(const t of n)if("cacheWillUpdate"in t){c=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return c||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:a,response:n,request:o});if(!h)return;const u=await self.caches.open(e),f=v(a,"cacheDidUpdate"),l=f.length>0?await q({cacheName:e,matchOptions:r,request:o}):null;try{await u.put(o,h)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of w)await e()}(),e}for(const t of f)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:l,newResponse:h,request:o})},U=q,T=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const c=v(i,"fetchDidFail"),a=c.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:r,response:t}));return t}catch(e){for(const t of c)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:r.clone()});throw e}};try{self["workbox:strategies:5.1.1"]&&_()}catch(e){}const L={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let j;async function N(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,c=function(){if(void 0===j){const e=new Response("");if("body"in e)try{new Response(e.body),j=!0}catch(e){j=!1}j=!1}return j}()?s.body:await s.blob();return new Response(c,i)}try{self["workbox:precaching:5.1.1"]&&_()}catch(e){}function P(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),c=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:c.href}}class k{constructor(e){this.m=f(e),this.j=new Map,this.N=new Map,this.P=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=P(n),c="string"!=typeof n&&n.revision?"reload":"default";if(this.j.has(i)&&this.j.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.j.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.P.has(e)&&this.P.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.P.set(e,n.integrity)}if(this.j.set(i,e),this.N.set(i,c),s.length>0){const e="Workbox is precaching URLs without revision "+`info: ${s.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.m),c=await i.keys(),a=new Set(c.map(e=>e.url));for(const[e,t]of this.j)a.has(t)?n.push(e):s.push({cacheKey:t,url:e});const r=s.map(({cacheKey:s,url:n})=>{const i=this.P.get(s),c=this.N.get(n);return this.k({cacheKey:s,cacheMode:c,event:e,integrity:i,plugins:t,url:n})});return await Promise.all(r),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.m),t=await e.keys(),s=new Set(this.j.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async k({cacheKey:e,url:s,cacheMode:n,event:i,plugins:c,integrity:a}){const r=new Request(s,{integrity:a,cache:n,credentials:"same-origin"});let o,h=await T({event:i,plugins:c,request:r});for(const e of c||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:r,response:h}):h.status<400))throw new t("bad-precaching-response",{url:s,status:h.status});h.redirected&&(h=await N(h)),await x({event:i,plugins:c,response:h,request:e===s?r:new Request(e),cacheName:this.m,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.j}getCachedURLs(){return[...this.j.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.j.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.m)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.m,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let E;const I=()=>(E||(E=new k),E);const M=(e,t)=>{const s=I().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const c=new URL(e,location.href);c.hash="",yield c.href;const a=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(c,t);if(yield a.href,s&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=s,yield e.href}if(n){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:c});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let K=!1;function V(e){K||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=f();self.addEventListener("fetch",c=>{const a=M(c.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!a)return;let r=self.caches.open(i).then(e=>e.match(a)).then(e=>e||fetch(a));c.respondWith(r)})})(e),K=!0)}const O=[],D={get:()=>O,add(e){O.push(...e)}},F=e=>{const t=I(),s=D.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},H=e=>{const t=I();e.waitUntil(t.activate())};var C;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),C={},function(e){I().addToCacheList(e),e.length>0&&(self.addEventListener("install",F),self.addEventListener("activate",H))}([{url:"_next/static/chunks/008045ce724bd11d9341bc7cfc9f15530ad80950.09c0aa2d205c4326d1a6.js",revision:"8f320dd6ac9ea530cd15c7ede85247b6"},{url:"_next/static/chunks/088d5a4e.5c00853e075a371b3904.js",revision:"3adf26dd33fc7ed00c1f016a93122b6d"},{url:"_next/static/chunks/0926d42c.319bab04f8bfa4cabe50.js",revision:"8d9097e43d3fdaf69a58b2d76cfc0c2d"},{url:"_next/static/chunks/14c3089aa1e0724472f90f2ba8b15764830f3a59.79322da8cf569a990dd4.js",revision:"de2a3cbb492bf32500f5af07e44481ff"},{url:"_next/static/chunks/20.bf77e71c2bc5de4b3f4a.js",revision:"214cddebf2fa37dc8971f79b144a0c22"},{url:"_next/static/chunks/587aac24.72b9e3a1c019e85376eb.js",revision:"d5f9319485e2afb008f7714694202065"},{url:"_next/static/chunks/6.23ddaedcdf7e20cd582f.js",revision:"b793e948b2ea798da1818bd3f555822b"},{url:"_next/static/chunks/87a06baf.329be8804e97c6630090.js",revision:"a3c64ed54a8633cb7ebc4c7318a05fcc"},{url:"_next/static/chunks/a5fa4335.889186d94a811ea1e22e.js",revision:"69049558d9e46c1f5cd171a20139f1ad"},{url:"_next/static/chunks/bfb0485f877080e3359cd8bfa1733b1eca0dba9f.4a8312baf082e299ce2b.js",revision:"8cced022fcd856a741bf0d874075d646"},{url:"_next/static/chunks/fb7d5399.78668d9e01e732d91baf.js",revision:"e4e9d8795a6ddada601c5b05f436bc84"},{url:"_next/static/chunks/framework.a255b134ad967159c90a.js",revision:"079fd43ee850e993f26f88d7d89ebb4d"},{url:"_next/static/css/7ce8fc8c3460fc8ad993.css",revision:"917f63105fdaf696cbdf32461d235155"},{url:"_next/static/css/7ce8fc8c3460fc8ad993.css.map",revision:"5f719a2832988f46b0a3346b8e2097b0"},{url:"_next/static/css/e5e217217c3c70da36bf.css",revision:"33497bb8f28b72b9d923dbb29b781e11"},{url:"_next/static/css/e5e217217c3c70da36bf.css.map",revision:"22da831f7a507943a18e305cdb5928df"},{url:"_next/static/icon.png",revision:"e735d073f4160ef51534e2bf59464f7b"},{url:"_next/static/manifest.json",revision:"944d4dc0cc12c9278a2dd9f965e10568"},{url:"_next/static/runtime/main-d692cc7cc4b30542d80d.js",revision:"4248efda0abbbddbd4dfacb6c6f38b09"},{url:"_next/static/runtime/polyfills-2a0fc3a05bf6412679d3.js",revision:"3beeb60659cf243032321c1bd150bc5e"},{url:"_next/static/runtime/webpack-0b217cf1dacbdbea930b.js",revision:"20e5668cfd14c34ad8ba20df73db068f"},{url:"_next/static/yHVrUhVcT1IRdTPb1g46F/_buildManifest.js",revision:"02d7fcf2b6bc58d637e8788e862a175e"},{url:"_next/static/yHVrUhVcT1IRdTPb1g46F/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/yHVrUhVcT1IRdTPb1g46F/pages/_app.js",revision:"5c2a0a50fd84cd759be12c807c0ba5fb"},{url:"_next/static/yHVrUhVcT1IRdTPb1g46F/pages/_error.js",revision:"e2170dd27ff9a89e25ee5fb875a3d20a"},{url:"_next/static/yHVrUhVcT1IRdTPb1g46F/pages/basic.js",revision:"286d78b69721f73b915f72a2d7abea6f"},{url:"_next/static/yHVrUhVcT1IRdTPb1g46F/pages/box.js",revision:"fddc48bd72a59590e5bf110777054c0f"},{url:"_next/static/yHVrUhVcT1IRdTPb1g46F/pages/index.js",revision:"b9810279c5a48d4d1a0664118cb48cf8"},{url:"_next/static/yHVrUhVcT1IRdTPb1g46F/pages/welcome.js",revision:"709f03a945ee4150b7997caf5fb6e72c"}]),V(C),function(e,s,c){let a;if("string"==typeof e){const t=new URL(e,location.href);a=new n(({url:e})=>e.href===t.href,s,c)}else if(e instanceof RegExp)a=new i(e,s,c);else if("function"==typeof e)a=new n(e,s,c);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}o().registerRoute(a)}(/^https?.*/,new class{constructor(e={}){if(this.m=l(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.I=t?e.plugins:[L,...e.plugins]}else this.I=[L];this.M=e.networkTimeoutSeconds||0,this.K=e.fetchOptions,this.V=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const i=[];let c;if(this.M){const{id:t,promise:a}=this.O({request:s,event:e,logs:n});c=t,i.push(a)}const a=this.D({timeoutId:c,request:s,event:e,logs:n});i.push(a);let r=await Promise.race(i);if(r||(r=await a),!r)throw new t("no-response",{url:s.url});return r}O({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this.F({request:e,event:s}))},1e3*this.M)}),id:n}}async D({timeoutId:e,request:t,logs:s,event:n}){let i,c;try{c=await T({request:t,event:n,fetchOptions:this.K,plugins:this.I})}catch(e){i=e}if(e&&clearTimeout(e),i||!c)c=await this.F({request:t,event:n});else{const e=c.clone(),s=x({cacheName:this.m,request:t,response:e,event:n,plugins:this.I});if(n)try{n.waitUntil(s)}catch(e){}}return c}F({event:e,request:t}){return U({cacheName:this.m,request:t,event:e,matchOptions:this.V,plugins:this.I})}}({cacheName:"offlineCache",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.H(n),c=this.C(s);d(c.expireEntries());const a=c.updateTimestamp(t.url);if(e)try{e.waitUntil(a)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.C(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.A=e,this.T=e.maxAgeSeconds,this.S=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),w.add(t))}C(e){if(e===l())throw new t("expire-custom-caches-only");let s=this.S.get(e);return s||(s=new m(e,this.A),this.S.set(e,s)),s}H(e){if(!this.T)return!0;const t=this.W(e);return null===t||t>=Date.now()-1e3*this.T}W(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.S)await self.caches.delete(e),await t.delete();this.S=new Map}}({maxEntries:200,purgeOnQuotaError:!0})]}),"GET");
//# sourceMappingURL=service-worker.js.map
