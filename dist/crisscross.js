// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"lShjh":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50619;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "d89a312b91eb2656";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"5fM3F":[function(require,module,exports) {
const parceled = true;
const apiKey = document.getElementById("apikey");
// Check if there is a saved API key in local storage and set it if so
if (localStorage.getItem("apiKey")) apiKey.value = localStorage.getItem("apiKey");
let baseUrl = "https://router.ptsd.capital/api/";
const formatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 3
});
const formatter_usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
});
function getPricesArb() {
    let request = new XMLHttpRequest();
    let ratesUrl = new URL(baseUrl + "getprivatequote/arb/");
    let url = ratesUrl.toString() + document.getElementById("source-currency").value + "-" + document.getElementById("destination-currency").value + "/";
    request.open("GET", url, true);
    request.setRequestHeader("apikey", apiKey.value);
    localStorage.setItem("apiKey", apiKey.value);
    request.onload = function() {
        let data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            // Update elements on the site with data returned from prices API for getPricesArb
            let tradeRateArbValue = Math.round(data["cost_rate"] * 1000) / 1000;
            const tradeRateArb = document.getElementById("tradeRateArb");
            tradeRateArb.value = tradeRateArbValue;
            let rrpArbValue = Math.round(data["rrp"] * 1000) / 1000;
            const rrpArb = document.getElementById("rrpArb");
            rrpArb.value = rrpArbValue;
            // Update rev bar
            var revMin = parseFloat(document.getElementById("revMin").innerHTML);
            var revMax = parseFloat(document.getElementById("revMax").innerHTML);
            var cssMin = 0;
            var cssMax = 100;
            var barWidth = (tradeRateArbValue - revMin) * (cssMax - cssMin) / (revMax - revMin) + cssMin;
            const revBar = document.getElementById("revBar");
            revBar.style.width = barWidth + "%";
        }
    };
    request.send();
}
function getPricesFiat() {
    let request = new XMLHttpRequest();
    let ratesUrl = new URL(baseUrl + "getprivatequote/fiat/");
    let url = ratesUrl.toString() + document.getElementById("source-currency").value + "-" + document.getElementById("destination-currency").value + "/";
    request.open("GET", url, true);
    request.setRequestHeader("apikey", apiKey.value);
    localStorage.setItem("apiKey", apiKey.value);
    request.onload = function() {
        let data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            // Update elements on the site with data returned from prices API for getPricesFiat
            let tradeRateFiatValue = Math.round(data["cost_rate"] * 1000) / 1000;
            const tradeRateFiat = document.getElementById("tradeRateFiat");
            tradeRateFiat.value = tradeRateFiatValue;
            let rrpFiatValue = Math.round(data["rrp"] * 1000) / 1000;
            const rrpFiat = document.getElementById("rrpFiat");
            rrpFiat.value = rrpFiatValue;
            let spotRateValue = Math.round(data["fx_ask_price"] * 1000) / 1000;
            const spotRate = document.getElementById("spotRate");
            spotRate.textContent = spotRateValue;
            //This has to live here as it updates source required when it gets a reponse, which is sometimes delayed
            updateSourceRequired();
        }
    };
    request.send();
}
// BALANCES
function getBalances() {
    let request = new XMLHttpRequest();
    let ratesUrl = new URL(baseUrl + "getbalances/");
    let url = ratesUrl.toString();
    request.open("GET", url, true);
    request.setRequestHeader("apikey", apiKey.value);
    request.onload = function() {
        let data = JSON.parse(this.response);
        const valrBalance = data["valr"][0]["available"];
        const valr = document.getElementById("sourceBalance");
        valr.textContent = formatter.format(valrBalance);
    };
    request.send();
}
// ORDERS
function createOrder() {
    let want = parseFloat(document.getElementById("wantAmount").value);
    let request = new XMLHttpRequest();
    let orderUrl = new URL(baseUrl + "createorder/fiat");
    let url = orderUrl.toString();
    request.open("POST", url, true);
    request.setRequestHeader("apikey", apiKey.value);
    request.onload = function() {
        if (request.status == 200) alert("Order created");
        else alert("Order error");
    };
    let wallet = document.getElementById("clientWalletAddress").value;
    let tradeNow = JSON.parse(document.getElementById("tradeNow").value);
    let rateTarget = parseFloat(document.getElementById("tradeRateFiat").value);
    let clientTateTarget = parseFloat(document.getElementById("rrpFiat").value);
    json = {
        "reference": document.getElementById("orderReference").value,
        "from_currency": document.getElementById("source-currency").value,
        "to_currency": document.getElementById("destination-currency").value,
        "want": want,
        "trade_rate": rateTarget,
        "rate": clientTateTarget,
        "twofa": document.getElementById("otp").value,
        "trade_now": tradeNow,
        "withdrawal_address": wallet
    };
    request.send(JSON.stringify(json));
}
function createOrderArb() {
    let have = parseFloat(document.getElementById("haveAmount").value);
    let request = new XMLHttpRequest();
    let orderUrl = new URL(baseUrl + "createorder/arb");
    let url = orderUrl.toString();
    request.open("POST", url, true);
    request.setRequestHeader("apikey", apiKey.value);
    request.onload = function() {
        if (request.status == 200) alert("Order created");
        else alert("Order error");
    };
    let wallet = document.getElementById("clientWalletAddress").value;
    let tradeNow = JSON.parse(document.getElementById("tradeNow").value);
    let arbTarget = parseFloat(document.getElementById("tradeRateArb").value);
    let clientArbRate = parseFloat(document.getElementById("rrpArb").value);
    json = {
        "reference": document.getElementById("orderReference").value,
        "from_currency": document.getElementById("source-currency").value,
        "to_currency": document.getElementById("destination-currency").value,
        "have": have,
        "trade_rate": arbTarget,
        "rate": clientArbRate,
        "twofa": document.getElementById("otp").value,
        "trade_now": tradeNow,
        "withdrawal_address": wallet
    };
    request.send(JSON.stringify(json));
}
function completeOrder() {
    let request = new XMLHttpRequest();
    let orderID = parseFloat(document.getElementById("orderID").value);
    var ratesUrl = new URL(baseUrl + "trades/setstartnow/" + orderID);
    var url = ratesUrl.toString();
    request.open("POST", url, true);
    request.send();
}
// LISTENERS
//run get prices function from button click
(function updatePrices() {
    const button = document.getElementById("getPricesButton");
    button.addEventListener("click", (event)=>{
        getPricesArb();
        getPricesFiat();
        getBalances();
    });
})();
// Updates the source currency required when either its changed by user or prgramatically
function updateSourceRequired() {
    const rrpFiatValue = parseFloat(document.getElementById("rrpFiat").value);
    const wantAmountValue = parseFloat(document.getElementById("wantAmount").value);
    const haveAmountValue = parseFloat(document.getElementById("haveAmount").value);
    const sourceRequired = document.getElementById("sourceRequired");
    if (!isNaN(rrpFiatValue)) {
        if (!isNaN(wantAmountValue) && wantAmountValue !== 0) {
            sourceRequired.textContent = formatter.format(rrpFiatValue * wantAmountValue);
            document.getElementById("orderSize").textContent = formatter_usd.format(wantAmount.value);
        } else if (!isNaN(haveAmountValue)) {
            sourceRequired.textContent = formatter.format(haveAmountValue);
            document.getElementById("orderSize").textContent = formatter_usd.format(haveAmountValue / rrpFiatValue);
        }
    }
    document.getElementById("targetRate").textContent = formatter.format(rrpFiatValue);
}
const rrpFiatElement = document.getElementById("rrpFiat");
rrpFiatElement.addEventListener("change", (event)=>{
    updateSourceRequired();
});
const wantAmountElement = document.getElementById("wantAmount");
wantAmountElement.addEventListener("change", (event)=>{
    updateSourceRequired();
});
// Create Fiat order  
(function createOrderOnClick() {
    const button = document.getElementById("createOrderButtonFiat");
    button.addEventListener("click", (event)=>{
        let have = parseFloat(document.getElementById("haveAmount").value);
        let want = parseFloat(document.getElementById("wantAmount").value);
        let reference = document.getElementById("orderReference").value;
        if (reference.includes("test") || have > 9 || want > 9) createOrder();
        else {
            alert("Order size can't be less than $10");
            return;
        }
    });
})();
// Create Arb order  
(function createOrderOnClickArb() {
    const button = document.getElementById("createOrderButtonArb");
    button.addEventListener("click", (event)=>{
        let have = parseFloat(document.getElementById("haveAmount").value);
        let want = parseFloat(document.getElementById("wantAmount").value);
        let reference = document.getElementById("orderReference").value;
        if (reference.includes("test") || want > 9 || have > 9) createOrderArb();
        else {
            alert("Order size can't be less than $10");
            return;
        }
    });
})();
// HELPERS  
$(document).ready(function() {
    $("#destination-currency").on("change", function() {
        if ($(this).val() === "usdc") {
            $("#clientWalletAddressUSDC").show();
            $("#ercAddress").show();
            $("#clientWalletAddressUSDC").attr("required", "required");
            $("#clientWalletAddress").hide();
            $("#trcAddress").hide();
            $("#clientWalletAddress").removeAttr("required");
        } else {
            $("#clientWalletAddressUSDC").hide();
            $("#ercAddress").hide();
            $("#clientWalletAddressUSDC").removeAttr("required");
            $("#clientWalletAddress").show();
            $("#trcAddress").show();
            $("#clientWalletAddress").attr("required", "required");
        }
    });
});

},{}]},["lShjh","5fM3F"], "5fM3F", "parcelRequirec023")

//# sourceMappingURL=crisscross.js.map
