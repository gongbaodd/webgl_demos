try{self["workbox:core:5.1.1"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.1"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const a=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");class c{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let a,c=i&&i.handler;if(!c&&this.s&&(c=this.s),c){try{a=c.handle({url:s,request:e,event:t,params:n})}catch(e){a=Promise.reject(e)}return a instanceof Promise&&this.i&&(a=a.catch(n=>this.i.handle({url:s,request:e,event:t}))),a}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const a=i.match({url:e,request:t,event:s});if(a)return n=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const o=()=>(r||(r=new c,r.addFetchListener(),r.addCacheListener()),r);const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},h=e=>[u.prefix,e,u.suffix].filter(e=>e&&e.length>0).join("-"),l=e=>e||h(u.precache),f=e=>e||h(u.runtime);function d(e){e.then(()=>{})}const w=new Set;class p{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.u=e,this.h=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.u,this.h);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:i,includeKeys:a=!1}={}){return await this.transaction([e],"readonly",(c,r)=>{const o=c.objectStore(e),u=t?o.index(t):o,h=[],l=u.openCursor(s,n);l.onsuccess=()=>{const e=l.result;e?(h.push(a?e:e.value),i&&h.length>=i?r(h):e.continue()):r(h)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,i)=>{const a=this.o.transaction(e,t);a.onabort=()=>i(a.error),a.oncomplete=()=>n(),s(a,e=>n(e))})}async g(e,t,s,...n){return await this.transaction([t],s,(s,i)=>{const a=s.objectStore(t),c=a[e].apply(a,n);c.onsuccess=()=>i(c.result)})}close(){this.o&&(this.o.close(),this.o=null)}}p.prototype.OPEN_TIMEOUT=2e3;const b={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(b))for(const s of t)s in IDBObjectStore.prototype&&(p.prototype[s]=async function(t,...n){return await this.g(s,t,e,...n)});try{self["workbox:expiration:5.1.1"]&&_()}catch(e){}const y=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class g{constructor(e){this.m=e,this.o=new p("workbox-expiration",1,{onupgradeneeded:e=>this.v(e)})}v(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.m)}async setTimestamp(e,t){const s={url:e=y(e),timestamp:t,cacheName:this.m,id:this.R(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.R(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const i=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),a=[];let c=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.m&&(e&&n.timestamp<e||t&&c>=t?a.push(s.value):c++),s.continue()}else n(a)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}R(e){return this.m+"|"+y(e)}}class m{constructor(e,t={}){this.q=!1,this._=!1,this.U=t.maxEntries,this.V=t.maxAgeSeconds,this.m=e,this.A=new g(e)}async expireEntries(){if(this.q)return void(this._=!0);this.q=!0;const e=this.V?Date.now()-1e3*this.V:0,t=await this.A.expireEntries(e,this.U),s=await self.caches.open(this.m);for(const e of t)await s.delete(e);this.q=!1,this._&&(this._=!1,d(this.expireEntries()))}async updateTimestamp(e){await this.A.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.V){return await this.A.getTimestamp(e)<Date.now()-1e3*this.V}return!1}async delete(){this._=!1,await this.A.expireEntries(1/0)}}const x=(e,t)=>e.filter(e=>t in e),v=async({request:e,mode:t,plugins:s=[]})=>{const n=x(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},R=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const a=await self.caches.open(e),c=await v({plugins:i,request:t,mode:"read"});let r=await a.match(c,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;r=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:r,request:c})}return r},q=async({cacheName:e,request:s,response:n,event:i,plugins:c=[],matchOptions:r})=>{const o=await v({plugins:c,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:a(o.url)});const u=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,a=!1;for(const t of n)if("cacheWillUpdate"in t){a=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return a||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:c,response:n,request:o});if(!u)return;const h=await self.caches.open(e),l=x(c,"cacheDidUpdate"),f=l.length>0?await R({cacheName:e,matchOptions:r,request:o}):null;try{await h.put(o,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of w)await e()}(),e}for(const t of l)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:f,newResponse:u,request:o})},U=R,V=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const a=x(i,"fetchDidFail"),c=a.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:r,response:t}));return t}catch(e){for(const t of a)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:c.clone(),request:r.clone()});throw e}};try{self["workbox:strategies:5.1.1"]&&_()}catch(e){}const A={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let j;async function L(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,a=function(){if(void 0===j){const e=new Response("");if("body"in e)try{new Response(e.body),j=!0}catch(e){j=!1}j=!1}return j}()?s.body:await s.blob();return new Response(a,i)}try{self["workbox:precaching:5.1.1"]&&_()}catch(e){}function K(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),a=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:a.href}}class P{constructor(e){this.m=l(e),this.j=new Map,this.L=new Map,this.K=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=K(n),a="string"!=typeof n&&n.revision?"reload":"default";if(this.j.has(i)&&this.j.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.j.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.K.has(e)&&this.K.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.K.set(e,n.integrity)}if(this.j.set(i,e),this.L.set(i,a),s.length>0){const e="Workbox is precaching URLs without revision "+`info: ${s.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.m),a=await i.keys(),c=new Set(a.map(e=>e.url));for(const[e,t]of this.j)c.has(t)?n.push(e):s.push({cacheKey:t,url:e});const r=s.map(({cacheKey:s,url:n})=>{const i=this.K.get(s),a=this.L.get(n);return this.P({cacheKey:s,cacheMode:a,event:e,integrity:i,plugins:t,url:n})});return await Promise.all(r),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.m),t=await e.keys(),s=new Set(this.j.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async P({cacheKey:e,url:s,cacheMode:n,event:i,plugins:a,integrity:c}){const r=new Request(s,{integrity:c,cache:n,credentials:"same-origin"});let o,u=await V({event:i,plugins:a,request:r});for(const e of a||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:r,response:u}):u.status<400))throw new t("bad-precaching-response",{url:s,status:u.status});u.redirected&&(u=await L(u)),await q({event:i,plugins:a,response:u,request:e===s?r:new Request(e),cacheName:this.m,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.j}getCachedURLs(){return[...this.j.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.j.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.m)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.m,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let O;const k=()=>(O||(O=new P),O);const N=(e,t)=>{const s=k().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const c=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(a,t);if(yield c.href,s&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=s,yield e.href}if(n){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:a});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let E=!1;function T(e){E||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=l();self.addEventListener("fetch",a=>{const c=N(a.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!c)return;let r=self.caches.open(i).then(e=>e.match(c)).then(e=>e||fetch(c));a.respondWith(r)})})(e),E=!0)}const M=[],D={get:()=>M,add(e){M.push(...e)}},C=e=>{const t=k(),s=D.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},I=e=>{const t=k();e.waitUntil(t.activate())};var S;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),S={},function(e){k().addToCacheList(e),e.length>0&&(self.addEventListener("install",C),self.addEventListener("activate",I))}([{url:"_next/static/VlaYK9eRVx5ZOV5AAPlxd/_buildManifest.js",revision:"0ae1920ca65b87e3008ad89b73fe4b43"},{url:"_next/static/VlaYK9eRVx5ZOV5AAPlxd/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/VlaYK9eRVx5ZOV5AAPlxd/pages/_app.js",revision:"b7a44d15d418d3b0d2b09697624c55f7"},{url:"_next/static/VlaYK9eRVx5ZOV5AAPlxd/pages/_error.js",revision:"0dca0e62491ed732dc9ff923a92a663e"},{url:"_next/static/VlaYK9eRVx5ZOV5AAPlxd/pages/box.js",revision:"6284692a554ef7ddbbeb99ea6536ca2d"},{url:"_next/static/VlaYK9eRVx5ZOV5AAPlxd/pages/cameras.js",revision:"ffaee79cbc8a29ef7bf1104e3ba08f27"},{url:"_next/static/VlaYK9eRVx5ZOV5AAPlxd/pages/cannon.js",revision:"315aeeae16b88e93ddef9c703315a8c0"},{url:"_next/static/VlaYK9eRVx5ZOV5AAPlxd/pages/fakeShadow.js",revision:"b365a3610504dc6eadc12e08b2de97e1"},{url:"_next/static/VlaYK9eRVx5ZOV5AAPlxd/pages/index.js",revision:"afae6c40d1f6316c57a4ad21d892ddc4"},{url:"_next/static/VlaYK9eRVx5ZOV5AAPlxd/pages/renderTarget.js",revision:"39c78460d74a6d4ea0bd14544983b6a3"},{url:"_next/static/VlaYK9eRVx5ZOV5AAPlxd/pages/solar.js",revision:"9eff709dcf59a48f37d56a214b15abd7"},{url:"_next/static/VlaYK9eRVx5ZOV5AAPlxd/pages/welcome.js",revision:"fea9814b1bdc4db74ee11db14f41db89"},{url:"_next/static/chunks/03d7c743.2c372599cf640b277883.js",revision:"82a5f5b23ef261ea7bd105e0607e0960"},{url:"_next/static/chunks/04bc91b8b920b7123afbb8031279d003e8055ea8.79322da8cf569a990dd4.js",revision:"de2a3cbb492bf32500f5af07e44481ff"},{url:"_next/static/chunks/21.44baa2fa197e1bbc8113.js",revision:"2cab492cd7518b2bb5e711addd90ae28"},{url:"_next/static/chunks/22.df5d8a71a16a5409d83a.js",revision:"2378f309c926dee5d77721744253df80"},{url:"_next/static/chunks/23.8468135d6cb3a5af0c4a.js",revision:"2d81bf23cac01e2ccae15732fc64ce26"},{url:"_next/static/chunks/24.914302f37f21bca11710.js",revision:"0d672cc3904cf00bd5da68f36099a35a"},{url:"_next/static/chunks/25.3f33c40afb7f6937e832.js",revision:"61d2a7a836b1df7424ccf9603a10129f"},{url:"_next/static/chunks/4c936c17b9cd9536f4e9c8fe38cfdad2d43e2eb7.ca9115f0f3f530f1cbb2.js",revision:"bb1663bdb0f79a5bed87c3bedebe0677"},{url:"_next/static/chunks/aa136c2f.2b625187b7192d340e0c.js",revision:"4068499b15b5980f776f534191fbfd4f"},{url:"_next/static/chunks/c8f7fe3b0e41be846d5687592cf2018ff6e22687.cc2f5217a58f0ac2e3c5.js",revision:"c8166d3076c60838fdfed157ad5c3472"},{url:"_next/static/chunks/d761d9868a44fdd44effdbb4ac2ad4226cf87774.154b7ca88320e8c9bfb8.js",revision:"0ae1b20c6daca59f98865742e7906fbb"},{url:"_next/static/chunks/fb7d5399.9c4c0ccf826086715804.js",revision:"06d22c5768469e57be30f1b3996e06ca"},{url:"_next/static/chunks/framework.504af639ffd40f515d05.js",revision:"55def25aad8c48978fc8ebbc1cd7d225"},{url:"_next/static/css/7c9b9b9cee3f5463c4bf.css",revision:"26f4403fd77d9e24e21252d6d706c1dd"},{url:"_next/static/css/7c9b9b9cee3f5463c4bf.css.map",revision:"6192d8adde89eeedd1c08245a3de7ad1"},{url:"_next/static/css/eb63d61c873b7ef125a6.css",revision:"2ccab0afd02ecb0231a5cb714b209da6"},{url:"_next/static/css/eb63d61c873b7ef125a6.css.map",revision:"bacc095936ce72b87dd52bec8f1f9934"},{url:"_next/static/icon.png",revision:"e735d073f4160ef51534e2bf59464f7b"},{url:"_next/static/manifest.json",revision:"944d4dc0cc12c9278a2dd9f965e10568"},{url:"_next/static/runtime/main-df148cb15a4db9ffa156.js",revision:"c4bf3ebd66a4c5f0bc63caf1f2f67253"},{url:"_next/static/runtime/polyfills-77f0dadca6bfc219e3b2.js",revision:"8a54fa1ba2e66cc1776b46614c09c429"},{url:"_next/static/runtime/webpack-3d629341e323a6de5027.js",revision:"63853e0958e829989a893992c44161d1"}]),T(S),function(e,s,a){let c;if("string"==typeof e){const t=new URL(e,location.href);c=new n(({url:e})=>e.href===t.href,s,a)}else if(e instanceof RegExp)c=new i(e,s,a);else if("function"==typeof e)c=new n(e,s,a);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=e}o().registerRoute(c)}(/^https?.*/,new class{constructor(e={}){if(this.m=f(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.O=t?e.plugins:[A,...e.plugins]}else this.O=[A];this.k=e.networkTimeoutSeconds||0,this.N=e.fetchOptions,this.T=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const i=[];let a;if(this.k){const{id:t,promise:c}=this.M({request:s,event:e,logs:n});a=t,i.push(c)}const c=this.D({timeoutId:a,request:s,event:e,logs:n});i.push(c);let r=await Promise.race(i);if(r||(r=await c),!r)throw new t("no-response",{url:s.url});return r}M({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this.C({request:e,event:s}))},1e3*this.k)}),id:n}}async D({timeoutId:e,request:t,logs:s,event:n}){let i,a;try{a=await V({request:t,event:n,fetchOptions:this.N,plugins:this.O})}catch(e){i=e}if(e&&clearTimeout(e),i||!a)a=await this.C({request:t,event:n});else{const e=a.clone(),s=q({cacheName:this.m,request:t,response:e,event:n,plugins:this.O});if(n)try{n.waitUntil(s)}catch(e){}}return a}C({event:e,request:t}){return U({cacheName:this.m,request:t,event:e,matchOptions:this.T,plugins:this.O})}}({cacheName:"offlineCache",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.I(n),a=this.S(s);d(a.expireEntries());const c=a.updateTimestamp(t.url);if(e)try{e.waitUntil(c)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.S(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.Y=e,this.V=e.maxAgeSeconds,this.Z=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),w.add(t))}S(e){if(e===f())throw new t("expire-custom-caches-only");let s=this.Z.get(e);return s||(s=new m(e,this.Y),this.Z.set(e,s)),s}I(e){if(!this.V)return!0;const t=this.W(e);return null===t||t>=Date.now()-1e3*this.V}W(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.Z)await self.caches.delete(e),await t.delete();this.Z=new Map}}({maxEntries:200,purgeOnQuotaError:!0})]}),"GET");
//# sourceMappingURL=service-worker.js.map
