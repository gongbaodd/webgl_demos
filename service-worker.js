try{self["workbox:core:5.1.1"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.1"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const a=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");class c{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let a,c=i&&i.handler;if(!c&&this.s&&(c=this.s),c){try{a=c.handle({url:s,request:e,event:t,params:n})}catch(e){a=Promise.reject(e)}return a instanceof Promise&&this.i&&(a=a.catch(n=>this.i.handle({url:s,request:e,event:t}))),a}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const a=i.match({url:e,request:t,event:s});if(a)return n=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const o=()=>(r||(r=new c,r.addFetchListener(),r.addCacheListener()),r);const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},h=e=>[u.prefix,e,u.suffix].filter(e=>e&&e.length>0).join("-"),f=e=>e||h(u.precache),l=e=>e||h(u.runtime);function d(e){e.then(()=>{})}const w=new Set;class p{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.u=e,this.h=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.u,this.h);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:i,includeKeys:a=!1}={}){return await this.transaction([e],"readonly",(c,r)=>{const o=c.objectStore(e),u=t?o.index(t):o,h=[],f=u.openCursor(s,n);f.onsuccess=()=>{const e=f.result;e?(h.push(a?e:e.value),i&&h.length>=i?r(h):e.continue()):r(h)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,i)=>{const a=this.o.transaction(e,t);a.onabort=()=>i(a.error),a.oncomplete=()=>n(),s(a,e=>n(e))})}async g(e,t,s,...n){return await this.transaction([t],s,(s,i)=>{const a=s.objectStore(t),c=a[e].apply(a,n);c.onsuccess=()=>i(c.result)})}close(){this.o&&(this.o.close(),this.o=null)}}p.prototype.OPEN_TIMEOUT=2e3;const y={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(y))for(const s of t)s in IDBObjectStore.prototype&&(p.prototype[s]=async function(t,...n){return await this.g(s,t,e,...n)});try{self["workbox:expiration:5.1.1"]&&_()}catch(e){}const b=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class g{constructor(e){this.m=e,this.o=new p("workbox-expiration",1,{onupgradeneeded:e=>this.v(e)})}v(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.m)}async setTimestamp(e,t){const s={url:e=b(e),timestamp:t,cacheName:this.m,id:this._(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this._(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const i=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),a=[];let c=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.m&&(e&&n.timestamp<e||t&&c>=t?a.push(s.value):c++),s.continue()}else n(a)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}_(e){return this.m+"|"+b(e)}}class m{constructor(e,t={}){this.q=!1,this.R=!1,this.U=t.maxEntries,this.L=t.maxAgeSeconds,this.m=e,this.j=new g(e)}async expireEntries(){if(this.q)return void(this.R=!0);this.q=!0;const e=this.L?Date.now()-1e3*this.L:0,t=await this.j.expireEntries(e,this.U),s=await self.caches.open(this.m);for(const e of t)await s.delete(e);this.q=!1,this.R&&(this.R=!1,d(this.expireEntries()))}async updateTimestamp(e){await this.j.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.L){return await this.j.getTimestamp(e)<Date.now()-1e3*this.L}return!1}async delete(){this.R=!1,await this.j.expireEntries(1/0)}}const v=(e,t)=>e.filter(e=>t in e),q=async({request:e,mode:t,plugins:s=[]})=>{const n=v(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},x=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const a=await self.caches.open(e),c=await q({plugins:i,request:t,mode:"read"});let r=await a.match(c,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;r=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:r,request:c})}return r},R=async({cacheName:e,request:s,response:n,event:i,plugins:c=[],matchOptions:r})=>{const o=await q({plugins:c,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:a(o.url)});const u=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,a=!1;for(const t of n)if("cacheWillUpdate"in t){a=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return a||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:c,response:n,request:o});if(!u)return;const h=await self.caches.open(e),f=v(c,"cacheDidUpdate"),l=f.length>0?await x({cacheName:e,matchOptions:r,request:o}):null;try{await h.put(o,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of w)await e()}(),e}for(const t of f)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:l,newResponse:u,request:o})},U=x,L=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const a=v(i,"fetchDidFail"),c=a.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:r,response:t}));return t}catch(e){for(const t of a)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:c.clone(),request:r.clone()});throw e}};try{self["workbox:strategies:5.1.1"]&&_()}catch(e){}const j={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let K;async function N(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,a=function(){if(void 0===K){const e=new Response("");if("body"in e)try{new Response(e.body),K=!0}catch(e){K=!1}K=!1}return K}()?s.body:await s.blob();return new Response(a,i)}try{self["workbox:precaching:5.1.1"]&&_()}catch(e){}function O(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),a=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:a.href}}class k{constructor(e){this.m=f(e),this.K=new Map,this.N=new Map,this.O=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=O(n),a="string"!=typeof n&&n.revision?"reload":"default";if(this.K.has(i)&&this.K.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.K.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.O.has(e)&&this.O.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.O.set(e,n.integrity)}if(this.K.set(i,e),this.N.set(i,a),s.length>0){const e="Workbox is precaching URLs without revision "+`info: ${s.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.m),a=await i.keys(),c=new Set(a.map(e=>e.url));for(const[e,t]of this.K)c.has(t)?n.push(e):s.push({cacheKey:t,url:e});const r=s.map(({cacheKey:s,url:n})=>{const i=this.O.get(s),a=this.N.get(n);return this.k({cacheKey:s,cacheMode:a,event:e,integrity:i,plugins:t,url:n})});return await Promise.all(r),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.m),t=await e.keys(),s=new Set(this.K.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async k({cacheKey:e,url:s,cacheMode:n,event:i,plugins:a,integrity:c}){const r=new Request(s,{integrity:c,cache:n,credentials:"same-origin"});let o,u=await L({event:i,plugins:a,request:r});for(const e of a||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:r,response:u}):u.status<400))throw new t("bad-precaching-response",{url:s,status:u.status});u.redirected&&(u=await N(u)),await R({event:i,plugins:a,response:u,request:e===s?r:new Request(e),cacheName:this.m,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.K}getCachedURLs(){return[...this.K.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.K.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.m)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.m,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let D;const E=()=>(D||(D=new k),D);const G=(e,t)=>{const s=E().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const c=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(a,t);if(yield c.href,s&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=s,yield e.href}if(n){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:a});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let M=!1;function S(e){M||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=f();self.addEventListener("fetch",a=>{const c=G(a.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!c)return;let r=self.caches.open(i).then(e=>e.match(c)).then(e=>e||fetch(c));a.respondWith(r)})})(e),M=!0)}const T=[],P={get:()=>T,add(e){T.push(...e)}},C=e=>{const t=E(),s=P.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},I=e=>{const t=E();e.waitUntil(t.activate())};var A;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),A={},function(e){E().addToCacheList(e),e.length>0&&(self.addEventListener("install",C),self.addEventListener("activate",I))}([{url:"_next/static/chunks/03d7c743.2c372599cf640b277883.js",revision:"82a5f5b23ef261ea7bd105e0607e0960"},{url:"_next/static/chunks/088d5a4e.0e6069669eea0f43c422.js",revision:"0b9930d8be5db6af79afe6637b00cb6c"},{url:"_next/static/chunks/1fb11e977eb7005fae7dd57c7ef67d6d7801aa40.d0fb1286682bdc661238.js",revision:"38e607e72cb086d0e75c41ffe3e637aa"},{url:"_next/static/chunks/20.bf77e71c2bc5de4b3f4a.js",revision:"214cddebf2fa37dc8971f79b144a0c22"},{url:"_next/static/chunks/587aac24.72b9e3a1c019e85376eb.js",revision:"d5f9319485e2afb008f7714694202065"},{url:"_next/static/chunks/6.23ddaedcdf7e20cd582f.js",revision:"b793e948b2ea798da1818bd3f555822b"},{url:"_next/static/chunks/87a06baf.329be8804e97c6630090.js",revision:"a3c64ed54a8633cb7ebc4c7318a05fcc"},{url:"_next/static/chunks/a5fa4335.889186d94a811ea1e22e.js",revision:"69049558d9e46c1f5cd171a20139f1ad"},{url:"_next/static/chunks/ceb00a8da3747a04cbc4d5406e4ae3be3a79daca.79322da8cf569a990dd4.js",revision:"de2a3cbb492bf32500f5af07e44481ff"},{url:"_next/static/chunks/d9f05bec30c9d33712a485924f566413367e1d09.cf480233b6376981c0ff.js",revision:"a591a0f891b44114e368029623241993"},{url:"_next/static/chunks/fb7d5399.78668d9e01e732d91baf.js",revision:"e4e9d8795a6ddada601c5b05f436bc84"},{url:"_next/static/chunks/framework.a255b134ad967159c90a.js",revision:"079fd43ee850e993f26f88d7d89ebb4d"},{url:"_next/static/css/e5e217217c3c70da36bf.css",revision:"33497bb8f28b72b9d923dbb29b781e11"},{url:"_next/static/css/e5e217217c3c70da36bf.css.map",revision:"22da831f7a507943a18e305cdb5928df"},{url:"_next/static/css/eb63d61c873b7ef125a6.css",revision:"2ccab0afd02ecb0231a5cb714b209da6"},{url:"_next/static/css/eb63d61c873b7ef125a6.css.map",revision:"bacc095936ce72b87dd52bec8f1f9934"},{url:"_next/static/icon.png",revision:"e735d073f4160ef51534e2bf59464f7b"},{url:"_next/static/manifest.json",revision:"944d4dc0cc12c9278a2dd9f965e10568"},{url:"_next/static/runtime/main-2237451a12ab92eb4eda.js",revision:"cc693a376a400d2205f0ee1d793edced"},{url:"_next/static/runtime/polyfills-2a0fc3a05bf6412679d3.js",revision:"3beeb60659cf243032321c1bd150bc5e"},{url:"_next/static/runtime/webpack-2ba7c7490b5aa0e9ca0f.js",revision:"eceeea9d246e89af93f1b451d48aac66"},{url:"_next/static/trdwf_GK-y0Vh8OGS3Duz/_buildManifest.js",revision:"73466fc5c348a88ae00a6f34b57b2936"},{url:"_next/static/trdwf_GK-y0Vh8OGS3Duz/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/trdwf_GK-y0Vh8OGS3Duz/pages/_app.js",revision:"58678c116171db0eb246703046e6c732"},{url:"_next/static/trdwf_GK-y0Vh8OGS3Duz/pages/_error.js",revision:"e2170dd27ff9a89e25ee5fb875a3d20a"},{url:"_next/static/trdwf_GK-y0Vh8OGS3Duz/pages/basic.js",revision:"11323c443f99ef792a68f80b5654479c"},{url:"_next/static/trdwf_GK-y0Vh8OGS3Duz/pages/box.js",revision:"fddc48bd72a59590e5bf110777054c0f"},{url:"_next/static/trdwf_GK-y0Vh8OGS3Duz/pages/index.js",revision:"b9810279c5a48d4d1a0664118cb48cf8"},{url:"_next/static/trdwf_GK-y0Vh8OGS3Duz/pages/welcome.js",revision:"709f03a945ee4150b7997caf5fb6e72c"}]),S(A),function(e,s,a){let c;if("string"==typeof e){const t=new URL(e,location.href);c=new n(({url:e})=>e.href===t.href,s,a)}else if(e instanceof RegExp)c=new i(e,s,a);else if("function"==typeof e)c=new n(e,s,a);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=e}o().registerRoute(c)}(/^https?.*/,new class{constructor(e={}){if(this.m=l(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.D=t?e.plugins:[j,...e.plugins]}else this.D=[j];this.G=e.networkTimeoutSeconds||0,this.M=e.fetchOptions,this.S=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const i=[];let a;if(this.G){const{id:t,promise:c}=this.T({request:s,event:e,logs:n});a=t,i.push(c)}const c=this.P({timeoutId:a,request:s,event:e,logs:n});i.push(c);let r=await Promise.race(i);if(r||(r=await c),!r)throw new t("no-response",{url:s.url});return r}T({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this.C({request:e,event:s}))},1e3*this.G)}),id:n}}async P({timeoutId:e,request:t,logs:s,event:n}){let i,a;try{a=await L({request:t,event:n,fetchOptions:this.M,plugins:this.D})}catch(e){i=e}if(e&&clearTimeout(e),i||!a)a=await this.C({request:t,event:n});else{const e=a.clone(),s=R({cacheName:this.m,request:t,response:e,event:n,plugins:this.D});if(n)try{n.waitUntil(s)}catch(e){}}return a}C({event:e,request:t}){return U({cacheName:this.m,request:t,event:e,matchOptions:this.S,plugins:this.D})}}({cacheName:"offlineCache",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.I(n),a=this.A(s);d(a.expireEntries());const c=a.updateTimestamp(t.url);if(e)try{e.waitUntil(c)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.A(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.V=e,this.L=e.maxAgeSeconds,this.W=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),w.add(t))}A(e){if(e===l())throw new t("expire-custom-caches-only");let s=this.W.get(e);return s||(s=new m(e,this.V),this.W.set(e,s)),s}I(e){if(!this.L)return!0;const t=this.B(e);return null===t||t>=Date.now()-1e3*this.L}B(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.W)await self.caches.delete(e),await t.delete();this.W=new Map}}({maxEntries:200,purgeOnQuotaError:!0})]}),"GET");
//# sourceMappingURL=service-worker.js.map
