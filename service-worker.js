try{self["workbox:core:5.1.1"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.1"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const c=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");class a{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let c,a=i&&i.handler;if(!a&&this.s&&(a=this.s),a){try{c=a.handle({url:s,request:e,event:t,params:n})}catch(e){c=Promise.reject(e)}return c instanceof Promise&&this.i&&(c=c.catch(n=>this.i.handle({url:s,request:e,event:t}))),c}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const c=i.match({url:e,request:t,event:s});if(c)return n=c,(Array.isArray(c)&&0===c.length||c.constructor===Object&&0===Object.keys(c).length||"boolean"==typeof c)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const o=()=>(r||(r=new a,r.addFetchListener(),r.addCacheListener()),r);const h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[h.prefix,e,h.suffix].filter(e=>e&&e.length>0).join("-"),f=e=>e||u(h.precache),l=e=>e||u(h.runtime);function d(e){e.then(()=>{})}const w=new Set;class p{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.h=e,this.u=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.h,this.u);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:i,includeKeys:c=!1}={}){return await this.transaction([e],"readonly",(a,r)=>{const o=a.objectStore(e),h=t?o.index(t):o,u=[],f=h.openCursor(s,n);f.onsuccess=()=>{const e=f.result;e?(u.push(c?e:e.value),i&&u.length>=i?r(u):e.continue()):r(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,i)=>{const c=this.o.transaction(e,t);c.onabort=()=>i(c.error),c.oncomplete=()=>n(),s(c,e=>n(e))})}async g(e,t,s,...n){return await this.transaction([t],s,(s,i)=>{const c=s.objectStore(t),a=c[e].apply(c,n);a.onsuccess=()=>i(a.result)})}close(){this.o&&(this.o.close(),this.o=null)}}p.prototype.OPEN_TIMEOUT=2e3;const b={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(b))for(const s of t)s in IDBObjectStore.prototype&&(p.prototype[s]=async function(t,...n){return await this.g(s,t,e,...n)});try{self["workbox:expiration:5.1.1"]&&_()}catch(e){}const g=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class y{constructor(e){this.m=e,this.o=new p("workbox-expiration",1,{onupgradeneeded:e=>this.v(e)})}v(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.m)}async setTimestamp(e,t){const s={url:e=g(e),timestamp:t,cacheName:this.m,id:this.R(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.R(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const i=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),c=[];let a=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.m&&(e&&n.timestamp<e||t&&a>=t?c.push(s.value):a++),s.continue()}else n(c)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}R(e){return this.m+"|"+g(e)}}class m{constructor(e,t={}){this.q=!1,this._=!1,this.U=t.maxEntries,this.L=t.maxAgeSeconds,this.m=e,this.N=new y(e)}async expireEntries(){if(this.q)return void(this._=!0);this.q=!0;const e=this.L?Date.now()-1e3*this.L:0,t=await this.N.expireEntries(e,this.U),s=await self.caches.open(this.m);for(const e of t)await s.delete(e);this.q=!1,this._&&(this._=!1,d(this.expireEntries()))}async updateTimestamp(e){await this.N.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.L){return await this.N.getTimestamp(e)<Date.now()-1e3*this.L}return!1}async delete(){this._=!1,await this.N.expireEntries(1/0)}}const v=(e,t)=>e.filter(e=>t in e),R=async({request:e,mode:t,plugins:s=[]})=>{const n=v(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},q=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const c=await self.caches.open(e),a=await R({plugins:i,request:t,mode:"read"});let r=await c.match(a,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;r=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:r,request:a})}return r},x=async({cacheName:e,request:s,response:n,event:i,plugins:a=[],matchOptions:r})=>{const o=await R({plugins:a,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:c(o.url)});const h=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,c=!1;for(const t of n)if("cacheWillUpdate"in t){c=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return c||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:a,response:n,request:o});if(!h)return;const u=await self.caches.open(e),f=v(a,"cacheDidUpdate"),l=f.length>0?await q({cacheName:e,matchOptions:r,request:o}):null;try{await u.put(o,h)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of w)await e()}(),e}for(const t of f)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:l,newResponse:h,request:o})},U=q,L=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const c=v(i,"fetchDidFail"),a=c.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:r,response:t}));return t}catch(e){for(const t of c)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:r.clone()});throw e}};try{self["workbox:strategies:5.1.1"]&&_()}catch(e){}const N={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let j;async function E(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,c=function(){if(void 0===j){const e=new Response("");if("body"in e)try{new Response(e.body),j=!0}catch(e){j=!1}j=!1}return j}()?s.body:await s.blob();return new Response(c,i)}try{self["workbox:precaching:5.1.1"]&&_()}catch(e){}function I(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),c=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:c.href}}class k{constructor(e){this.m=f(e),this.j=new Map,this.I=new Map,this.k=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=I(n),c="string"!=typeof n&&n.revision?"reload":"default";if(this.j.has(i)&&this.j.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.j.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.k.has(e)&&this.k.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.k.set(e,n.integrity)}if(this.j.set(i,e),this.I.set(i,c),s.length>0){const e="Workbox is precaching URLs without revision "+`info: ${s.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.m),c=await i.keys(),a=new Set(c.map(e=>e.url));for(const[e,t]of this.j)a.has(t)?n.push(e):s.push({cacheKey:t,url:e});const r=s.map(({cacheKey:s,url:n})=>{const i=this.k.get(s),c=this.I.get(n);return this.S({cacheKey:s,cacheMode:c,event:e,integrity:i,plugins:t,url:n})});return await Promise.all(r),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.m),t=await e.keys(),s=new Set(this.j.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async S({cacheKey:e,url:s,cacheMode:n,event:i,plugins:c,integrity:a}){const r=new Request(s,{integrity:a,cache:n,credentials:"same-origin"});let o,h=await L({event:i,plugins:c,request:r});for(const e of c||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:r,response:h}):h.status<400))throw new t("bad-precaching-response",{url:s,status:h.status});h.redirected&&(h=await E(h)),await x({event:i,plugins:c,response:h,request:e===s?r:new Request(e),cacheName:this.m,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.j}getCachedURLs(){return[...this.j.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.j.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.m)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.m,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let Q;const S=()=>(Q||(Q=new k),Q);const M=(e,t)=>{const s=S().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const c=new URL(e,location.href);c.hash="",yield c.href;const a=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(c,t);if(yield a.href,s&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=s,yield e.href}if(n){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:c});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let T=!1;function K(e){T||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=f();self.addEventListener("fetch",c=>{const a=M(c.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!a)return;let r=self.caches.open(i).then(e=>e.match(a)).then(e=>e||fetch(a));c.respondWith(r)})})(e),T=!0)}const P=[],O={get:()=>P,add(e){P.push(...e)}},D=e=>{const t=S(),s=O.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},C=e=>{const t=S();e.waitUntil(t.activate())};var A;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),A={},function(e){S().addToCacheList(e),e.length>0&&(self.addEventListener("install",D),self.addEventListener("activate",C))}([{url:"_next/static/chunks/03d7c743.2c372599cf640b277883.js",revision:"82a5f5b23ef261ea7bd105e0607e0960"},{url:"_next/static/chunks/17.f10926b5bd213657ae5e.js",revision:"6e32d9343efd0aeeaf0fd6cfd76e0217"},{url:"_next/static/chunks/18.1a6474b81c777487a88d.js",revision:"27a668d787f3d9369cb65d44b4fdbea6"},{url:"_next/static/chunks/85937933bf475668ddb0635a64ad3d42618619ad.6803e238d3b27028c6b0.js",revision:"2b58f8576a276e6d0d6d226569458b17"},{url:"_next/static/chunks/c8f7fe3b0e41be846d5687592cf2018ff6e22687.767368106303dcc60ac8.js",revision:"7553b1cb1b269b36ccab0df58b71b097"},{url:"_next/static/chunks/f5f93db81bbe93c756b9ecb4c883cf2b18e570dc.73eb2e563bbf5a3c86d0.js",revision:"0c39a3422e826209ad0e3cc27ebc1900"},{url:"_next/static/chunks/f63f5f85c27e6135119f9b7a4fbfefcf0fdd6730.31989870126532949e96.js",revision:"5f690fcfd12f3d7ddce69aaa1837e249"},{url:"_next/static/chunks/fb7d5399.9c4c0ccf826086715804.js",revision:"06d22c5768469e57be30f1b3996e06ca"},{url:"_next/static/chunks/framework.504af639ffd40f515d05.js",revision:"55def25aad8c48978fc8ebbc1cd7d225"},{url:"_next/static/css/7c9b9b9cee3f5463c4bf.css",revision:"26f4403fd77d9e24e21252d6d706c1dd"},{url:"_next/static/css/7c9b9b9cee3f5463c4bf.css.map",revision:"6192d8adde89eeedd1c08245a3de7ad1"},{url:"_next/static/css/eb63d61c873b7ef125a6.css",revision:"2ccab0afd02ecb0231a5cb714b209da6"},{url:"_next/static/css/eb63d61c873b7ef125a6.css.map",revision:"bacc095936ce72b87dd52bec8f1f9934"},{url:"_next/static/h0bQeg9Qm4ZzRiNLIV-US/_buildManifest.js",revision:"45af43384316f9752b9ceb5b106b60b3"},{url:"_next/static/h0bQeg9Qm4ZzRiNLIV-US/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/h0bQeg9Qm4ZzRiNLIV-US/pages/_app.js",revision:"cd412dd91eb789f2593e48aa17d674d6"},{url:"_next/static/h0bQeg9Qm4ZzRiNLIV-US/pages/_error.js",revision:"32e9ca1ea703d03b946d5376316ad774"},{url:"_next/static/h0bQeg9Qm4ZzRiNLIV-US/pages/box.js",revision:"af539dabf16122accf3fed3a84c7c6d3"},{url:"_next/static/h0bQeg9Qm4ZzRiNLIV-US/pages/cameras.js",revision:"bd45d52864cd6abd0c649735e64e3014"},{url:"_next/static/h0bQeg9Qm4ZzRiNLIV-US/pages/index.js",revision:"0ac6980ccb11557af944396785fb2ed4"},{url:"_next/static/h0bQeg9Qm4ZzRiNLIV-US/pages/solar.js",revision:"4ee2eca926d5e3cf8ab2b73d9a9f4145"},{url:"_next/static/h0bQeg9Qm4ZzRiNLIV-US/pages/welcome.js",revision:"d6bf026d6df42b57ed0eea875b07843e"},{url:"_next/static/icon.png",revision:"e735d073f4160ef51534e2bf59464f7b"},{url:"_next/static/manifest.json",revision:"944d4dc0cc12c9278a2dd9f965e10568"},{url:"_next/static/runtime/main-e506c02bcb6c1309c5d6.js",revision:"540cd17e5fe1f4538ba143e56120dfc6"},{url:"_next/static/runtime/polyfills-68f96448da3c6c1861f7.js",revision:"4a5e2612c4c18daee35c654de01ea6d1"},{url:"_next/static/runtime/webpack-f5d04b0f140d3fec8097.js",revision:"7c7b3ccaf9f7289595180f200fcb05ee"}]),K(A),function(e,s,c){let a;if("string"==typeof e){const t=new URL(e,location.href);a=new n(({url:e})=>e.href===t.href,s,c)}else if(e instanceof RegExp)a=new i(e,s,c);else if("function"==typeof e)a=new n(e,s,c);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}o().registerRoute(a)}(/^https?.*/,new class{constructor(e={}){if(this.m=l(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.M=t?e.plugins:[N,...e.plugins]}else this.M=[N];this.T=e.networkTimeoutSeconds||0,this.K=e.fetchOptions,this.P=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const i=[];let c;if(this.T){const{id:t,promise:a}=this.O({request:s,event:e,logs:n});c=t,i.push(a)}const a=this.D({timeoutId:c,request:s,event:e,logs:n});i.push(a);let r=await Promise.race(i);if(r||(r=await a),!r)throw new t("no-response",{url:s.url});return r}O({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this.C({request:e,event:s}))},1e3*this.T)}),id:n}}async D({timeoutId:e,request:t,logs:s,event:n}){let i,c;try{c=await L({request:t,event:n,fetchOptions:this.K,plugins:this.M})}catch(e){i=e}if(e&&clearTimeout(e),i||!c)c=await this.C({request:t,event:n});else{const e=c.clone(),s=x({cacheName:this.m,request:t,response:e,event:n,plugins:this.M});if(n)try{n.waitUntil(s)}catch(e){}}return c}C({event:e,request:t}){return U({cacheName:this.m,request:t,event:e,matchOptions:this.P,plugins:this.M})}}({cacheName:"offlineCache",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.A(n),c=this.V(s);d(c.expireEntries());const a=c.updateTimestamp(t.url);if(e)try{e.waitUntil(a)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.V(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.W=e,this.L=e.maxAgeSeconds,this.Z=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),w.add(t))}V(e){if(e===l())throw new t("expire-custom-caches-only");let s=this.Z.get(e);return s||(s=new m(e,this.W),this.Z.set(e,s)),s}A(e){if(!this.L)return!0;const t=this.B(e);return null===t||t>=Date.now()-1e3*this.L}B(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.Z)await self.caches.delete(e),await t.delete();this.Z=new Map}}({maxEntries:200,purgeOnQuotaError:!0})]}),"GET");
//# sourceMappingURL=service-worker.js.map
