try{self["workbox:core:5.1.1"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.1"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const a=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");class c{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let a,c=i&&i.handler;if(!c&&this.s&&(c=this.s),c){try{a=c.handle({url:s,request:e,event:t,params:n})}catch(e){a=Promise.reject(e)}return a instanceof Promise&&this.i&&(a=a.catch(n=>this.i.handle({url:s,request:e,event:t}))),a}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const a=i.match({url:e,request:t,event:s});if(a)return n=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const o=()=>(r||(r=new c,r.addFetchListener(),r.addCacheListener()),r);const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},h=e=>[u.prefix,e,u.suffix].filter(e=>e&&e.length>0).join("-"),f=e=>e||h(u.precache),l=e=>e||h(u.runtime);function d(e){e.then(()=>{})}const w=new Set;class p{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.u=e,this.h=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.u,this.h);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:i,includeKeys:a=!1}={}){return await this.transaction([e],"readonly",(c,r)=>{const o=c.objectStore(e),u=t?o.index(t):o,h=[],f=u.openCursor(s,n);f.onsuccess=()=>{const e=f.result;e?(h.push(a?e:e.value),i&&h.length>=i?r(h):e.continue()):r(h)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,i)=>{const a=this.o.transaction(e,t);a.onabort=()=>i(a.error),a.oncomplete=()=>n(),s(a,e=>n(e))})}async m(e,t,s,...n){return await this.transaction([t],s,(s,i)=>{const a=s.objectStore(t),c=a[e].apply(a,n);c.onsuccess=()=>i(c.result)})}close(){this.o&&(this.o.close(),this.o=null)}}p.prototype.OPEN_TIMEOUT=2e3;const y={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(y))for(const s of t)s in IDBObjectStore.prototype&&(p.prototype[s]=async function(t,...n){return await this.m(s,t,e,...n)});try{self["workbox:expiration:5.1.1"]&&_()}catch(e){}const b=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class m{constructor(e){this.g=e,this.o=new p("workbox-expiration",1,{onupgradeneeded:e=>this.v(e)})}v(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.g)}async setTimestamp(e,t){const s={url:e=b(e),timestamp:t,cacheName:this.g,id:this.q(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.q(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const i=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),a=[];let c=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.g&&(e&&n.timestamp<e||t&&c>=t?a.push(s.value):c++),s.continue()}else n(a)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}q(e){return this.g+"|"+b(e)}}class g{constructor(e,t={}){this.R=!1,this._=!1,this.L=t.maxEntries,this.U=t.maxAgeSeconds,this.g=e,this.j=new m(e)}async expireEntries(){if(this.R)return void(this._=!0);this.R=!0;const e=this.U?Date.now()-1e3*this.U:0,t=await this.j.expireEntries(e,this.L),s=await self.caches.open(this.g);for(const e of t)await s.delete(e);this.R=!1,this._&&(this._=!1,d(this.expireEntries()))}async updateTimestamp(e){await this.j.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.U){return await this.j.getTimestamp(e)<Date.now()-1e3*this.U}return!1}async delete(){this._=!1,await this.j.expireEntries(1/0)}}const v=(e,t)=>e.filter(e=>t in e),x=async({request:e,mode:t,plugins:s=[]})=>{const n=v(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},q=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const a=await self.caches.open(e),c=await x({plugins:i,request:t,mode:"read"});let r=await a.match(c,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;r=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:r,request:c})}return r},R=async({cacheName:e,request:s,response:n,event:i,plugins:c=[],matchOptions:r})=>{const o=await x({plugins:c,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:a(o.url)});const u=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,a=!1;for(const t of n)if("cacheWillUpdate"in t){a=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return a||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:c,response:n,request:o});if(!u)return;const h=await self.caches.open(e),f=v(c,"cacheDidUpdate"),l=f.length>0?await q({cacheName:e,matchOptions:r,request:o}):null;try{await h.put(o,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of w)await e()}(),e}for(const t of f)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:l,newResponse:u,request:o})},L=q,U=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const a=v(i,"fetchDidFail"),c=a.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:r,response:t}));return t}catch(e){for(const t of a)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:c.clone(),request:r.clone()});throw e}};try{self["workbox:strategies:5.1.1"]&&_()}catch(e){}const j={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let K;async function P(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,a=function(){if(void 0===K){const e=new Response("");if("body"in e)try{new Response(e.body),K=!0}catch(e){K=!1}K=!1}return K}()?s.body:await s.blob();return new Response(a,i)}try{self["workbox:precaching:5.1.1"]&&_()}catch(e){}function N(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),a=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:a.href}}class C{constructor(e){this.g=f(e),this.K=new Map,this.P=new Map,this.N=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=N(n),a="string"!=typeof n&&n.revision?"reload":"default";if(this.K.has(i)&&this.K.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.K.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.N.has(e)&&this.N.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.N.set(e,n.integrity)}if(this.K.set(i,e),this.P.set(i,a),s.length>0){const e="Workbox is precaching URLs without revision "+`info: ${s.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.g),a=await i.keys(),c=new Set(a.map(e=>e.url));for(const[e,t]of this.K)c.has(t)?n.push(e):s.push({cacheKey:t,url:e});const r=s.map(({cacheKey:s,url:n})=>{const i=this.N.get(s),a=this.P.get(n);return this.C({cacheKey:s,cacheMode:a,event:e,integrity:i,plugins:t,url:n})});return await Promise.all(r),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.g),t=await e.keys(),s=new Set(this.K.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async C({cacheKey:e,url:s,cacheMode:n,event:i,plugins:a,integrity:c}){const r=new Request(s,{integrity:c,cache:n,credentials:"same-origin"});let o,u=await U({event:i,plugins:a,request:r});for(const e of a||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:r,response:u}):u.status<400))throw new t("bad-precaching-response",{url:s,status:u.status});u.redirected&&(u=await P(u)),await R({event:i,plugins:a,response:u,request:e===s?r:new Request(e),cacheName:this.g,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.K}getCachedURLs(){return[...this.K.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.K.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.g)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.g,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let k;const I=()=>(k||(k=new C),k);const S=(e,t)=>{const s=I().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const c=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(a,t);if(yield c.href,s&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=s,yield e.href}if(n){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:a});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let E=!1;function Z(e){E||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=f();self.addEventListener("fetch",a=>{const c=S(a.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!c)return;let r=self.caches.open(i).then(e=>e.match(c)).then(e=>e||fetch(c));a.respondWith(r)})})(e),E=!0)}const M=[],T={get:()=>M,add(e){M.push(...e)}},O=e=>{const t=I(),s=T.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},D=e=>{const t=I();e.waitUntil(t.activate())};var G;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),G={},function(e){I().addToCacheList(e),e.length>0&&(self.addEventListener("install",O),self.addEventListener("activate",D))}([{url:"_next/static/VyGZsIsSaKPeLx2CYXpmZ/_buildManifest.js",revision:"c9dd13e5936fd9458e30398cde8241cd"},{url:"_next/static/VyGZsIsSaKPeLx2CYXpmZ/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/VyGZsIsSaKPeLx2CYXpmZ/pages/_app.js",revision:"aeac4a58917afcc26d96a018b39757f1"},{url:"_next/static/VyGZsIsSaKPeLx2CYXpmZ/pages/_error.js",revision:"32e9ca1ea703d03b946d5376316ad774"},{url:"_next/static/VyGZsIsSaKPeLx2CYXpmZ/pages/box.js",revision:"1cff834f773e0b962cf7ace4e6bc6125"},{url:"_next/static/VyGZsIsSaKPeLx2CYXpmZ/pages/cameras.js",revision:"50d6d0129b96fdf50748a24e0b4c13d0"},{url:"_next/static/VyGZsIsSaKPeLx2CYXpmZ/pages/fakeShadow.js",revision:"4f94960b3e3098d16c0ec9bbf393a0d3"},{url:"_next/static/VyGZsIsSaKPeLx2CYXpmZ/pages/index.js",revision:"4de2494e314b073d9e53f349723d0b92"},{url:"_next/static/VyGZsIsSaKPeLx2CYXpmZ/pages/solar.js",revision:"b34f5ae35c0200973b7e526a7dd40ff7"},{url:"_next/static/VyGZsIsSaKPeLx2CYXpmZ/pages/welcome.js",revision:"744d467c720b3f68877dbadbe59fbd2d"},{url:"_next/static/chunks/03d7c743.2c372599cf640b277883.js",revision:"82a5f5b23ef261ea7bd105e0607e0960"},{url:"_next/static/chunks/18.ec6a70769b1aab766285.js",revision:"1aabe0f7a2cc0171628aaf1693adbaa7"},{url:"_next/static/chunks/19.51395c44e6805598e652.js",revision:"686b12e596db8e0e56c3e97ea5fd38f5"},{url:"_next/static/chunks/195afdf9787f58a2d841f52922a9c541baa8b171.154b7ca88320e8c9bfb8.js",revision:"0ae1b20c6daca59f98865742e7906fbb"},{url:"_next/static/chunks/20.febec767dfffa99024f4.js",revision:"035daf79cbe928b30e0404cbc5ed10e6"},{url:"_next/static/chunks/36fcee59392826e43c47df4dafaca855ad1e3d9b.79322da8cf569a990dd4.js",revision:"de2a3cbb492bf32500f5af07e44481ff"},{url:"_next/static/chunks/9e2d504ed54a32bc623adcb1b41fb834a9fbd02a.ca9115f0f3f530f1cbb2.js",revision:"bb1663bdb0f79a5bed87c3bedebe0677"},{url:"_next/static/chunks/c8f7fe3b0e41be846d5687592cf2018ff6e22687.cf1fc010b36034e0a627.js",revision:"494d0efde875ffbaab169b1015476edf"},{url:"_next/static/chunks/fb7d5399.9c4c0ccf826086715804.js",revision:"06d22c5768469e57be30f1b3996e06ca"},{url:"_next/static/chunks/framework.504af639ffd40f515d05.js",revision:"55def25aad8c48978fc8ebbc1cd7d225"},{url:"_next/static/css/7c9b9b9cee3f5463c4bf.css",revision:"26f4403fd77d9e24e21252d6d706c1dd"},{url:"_next/static/css/7c9b9b9cee3f5463c4bf.css.map",revision:"6192d8adde89eeedd1c08245a3de7ad1"},{url:"_next/static/css/eb63d61c873b7ef125a6.css",revision:"2ccab0afd02ecb0231a5cb714b209da6"},{url:"_next/static/css/eb63d61c873b7ef125a6.css.map",revision:"bacc095936ce72b87dd52bec8f1f9934"},{url:"_next/static/icon.png",revision:"e735d073f4160ef51534e2bf59464f7b"},{url:"_next/static/manifest.json",revision:"944d4dc0cc12c9278a2dd9f965e10568"},{url:"_next/static/runtime/main-6aa8912646f47e4e18d0.js",revision:"b0eef81282afe7f9ca592aa0ec17cfc7"},{url:"_next/static/runtime/polyfills-abc03d00a3102608c112.js",revision:"a96b61c1ddebae068348278de33ad595"},{url:"_next/static/runtime/webpack-1b075732a976036b964a.js",revision:"74d272a8b06c63738c0f7dc810613054"}]),Z(G),function(e,s,a){let c;if("string"==typeof e){const t=new URL(e,location.href);c=new n(({url:e})=>e.href===t.href,s,a)}else if(e instanceof RegExp)c=new i(e,s,a);else if("function"==typeof e)c=new n(e,s,a);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=e}o().registerRoute(c)}(/^https?.*/,new class{constructor(e={}){if(this.g=l(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.k=t?e.plugins:[j,...e.plugins]}else this.k=[j];this.I=e.networkTimeoutSeconds||0,this.S=e.fetchOptions,this.Z=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const i=[];let a;if(this.I){const{id:t,promise:c}=this.M({request:s,event:e,logs:n});a=t,i.push(c)}const c=this.T({timeoutId:a,request:s,event:e,logs:n});i.push(c);let r=await Promise.race(i);if(r||(r=await c),!r)throw new t("no-response",{url:s.url});return r}M({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this.O({request:e,event:s}))},1e3*this.I)}),id:n}}async T({timeoutId:e,request:t,logs:s,event:n}){let i,a;try{a=await U({request:t,event:n,fetchOptions:this.S,plugins:this.k})}catch(e){i=e}if(e&&clearTimeout(e),i||!a)a=await this.O({request:t,event:n});else{const e=a.clone(),s=R({cacheName:this.g,request:t,response:e,event:n,plugins:this.k});if(n)try{n.waitUntil(s)}catch(e){}}return a}O({event:e,request:t}){return L({cacheName:this.g,request:t,event:e,matchOptions:this.Z,plugins:this.k})}}({cacheName:"offlineCache",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.D(n),a=this.G(s);d(a.expireEntries());const c=a.updateTimestamp(t.url);if(e)try{e.waitUntil(c)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.G(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.A=e,this.U=e.maxAgeSeconds,this.V=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),w.add(t))}G(e){if(e===l())throw new t("expire-custom-caches-only");let s=this.V.get(e);return s||(s=new g(e,this.A),this.V.set(e,s)),s}D(e){if(!this.U)return!0;const t=this.X(e);return null===t||t>=Date.now()-1e3*this.U}X(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.V)await self.caches.delete(e),await t.delete();this.V=new Map}}({maxEntries:200,purgeOnQuotaError:!0})]}),"GET");
//# sourceMappingURL=service-worker.js.map
