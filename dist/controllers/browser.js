"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectApi = exports.initClient = void 0;
var path = __importStar(require("path"));
var fs = require('fs');
var puppeteer = require('puppeteer-extra');
var puppeteer_config_1 = require("../config/puppeteer.config");
var events_1 = require("./events");
var ON_DEATH = require('death');
var browser;
function initClient(sessionId, config, customUserAgent) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var waPage, cacheEnabled, blockCrashLogs, blockAssets, interceptAuthentication, proxyAddr, quickAuthed, authCompleteEv_1, sessionjsonpath, sessionjson, sd, s;
        var _this = this;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (config === null || config === void 0 ? void 0 : config.useStealth)
                        puppeteer.use(require('puppeteer-extra-plugin-stealth')());
                    return [4, initBrowser(sessionId, config)];
                case 1:
                    browser = _e.sent();
                    return [4, getWAPage(browser)];
                case 2:
                    waPage = _e.sent();
                    if (!(config === null || config === void 0 ? void 0 : config.proxyServerCredentials)) return [3, 4];
                    return [4, waPage.authenticate(config.proxyServerCredentials)];
                case 3:
                    _e.sent();
                    _e.label = 4;
                case 4: return [4, waPage.setUserAgent(customUserAgent || puppeteer_config_1.useragent)];
                case 5:
                    _e.sent();
                    return [4, waPage.setViewport({
                            width: ((_a = config === null || config === void 0 ? void 0 : config.viewport) === null || _a === void 0 ? void 0 : _a.width) || puppeteer_config_1.width,
                            height: ((_b = config === null || config === void 0 ? void 0 : config.viewport) === null || _b === void 0 ? void 0 : _b.height) || puppeteer_config_1.height,
                            deviceScaleFactor: 1
                        })];
                case 6:
                    _e.sent();
                    cacheEnabled = (config === null || config === void 0 ? void 0 : config.cacheEnabled) === false ? false : true;
                    blockCrashLogs = (config === null || config === void 0 ? void 0 : config.blockCrashLogs) === false ? false : true;
                    return [4, waPage.setBypassCSP((config === null || config === void 0 ? void 0 : config.bypassCSP) || false)];
                case 7:
                    _e.sent();
                    return [4, waPage.setCacheEnabled(cacheEnabled)];
                case 8:
                    _e.sent();
                    blockAssets = !(config === null || config === void 0 ? void 0 : config.headless) ? false : (config === null || config === void 0 ? void 0 : config.blockAssets) || false;
                    if (blockAssets) {
                        puppeteer.use(require('puppeteer-extra-plugin-block-resources')({
                            blockedTypes: new Set(['image', 'stylesheet', 'font'])
                        }));
                    }
                    interceptAuthentication = !(config === null || config === void 0 ? void 0 : config.safeMode);
                    proxyAddr = (config === null || config === void 0 ? void 0 : config.proxyServerCredentials) ? "" + (((_c = config.proxyServerCredentials) === null || _c === void 0 ? void 0 : _c.username) && ((_d = config.proxyServerCredentials) === null || _d === void 0 ? void 0 : _d.password) ? (config.proxyServerCredentials.protocol ||
                        config.proxyServerCredentials.address.includes('https') ? 'https' :
                        config.proxyServerCredentials.address.includes('http') ? 'http' :
                            config.proxyServerCredentials.address.includes('socks5') ? 'socks5' :
                                config.proxyServerCredentials.address.includes('socks4') ? 'socks4' : 'http') + "://" + config.proxyServerCredentials.username + ":" + config.proxyServerCredentials.password + "@" + config.proxyServerCredentials.address
                        .replace('https', '')
                        .replace('http', '')
                        .replace('socks5', '')
                        .replace('socks4', '')
                        .replace('://', '') : config.proxyServerCredentials.address) : false;
                    quickAuthed = false;
                    if (!(interceptAuthentication || proxyAddr || blockCrashLogs)) return [3, 10];
                    return [4, waPage.setRequestInterception(true)];
                case 9:
                    _e.sent();
                    authCompleteEv_1 = new events_1.EvEmitter(sessionId, 'AUTH');
                    waPage.on('request', function (request) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(interceptAuthentication &&
                                        request.url().includes('_priority_components') &&
                                        !quickAuthed)) return [3, 2];
                                    authCompleteEv_1.emit(true);
                                    return [4, waPage.evaluate('window.WA_AUTHENTICATED=true;')];
                                case 1:
                                    _a.sent();
                                    quickAuthed = true;
                                    _a.label = 2;
                                case 2:
                                    if (request.url().includes('https://crashlogs.whatsapp.net/') && blockCrashLogs) {
                                        request.abort();
                                    }
                                    else if (proxyAddr)
                                        require('puppeteer-page-proxy')(request, proxyAddr);
                                    else
                                        request.continue();
                                    return [2];
                            }
                        });
                    }); });
                    _e.label = 10;
                case 10:
                    sessionjsonpath = ((config === null || config === void 0 ? void 0 : config.sessionDataPath) && (config === null || config === void 0 ? void 0 : config.sessionDataPath.includes('.data.json'))) ? path.join(path.resolve(process.cwd(), (config === null || config === void 0 ? void 0 : config.sessionDataPath) || '')) : path.join(path.resolve(process.cwd(), (config === null || config === void 0 ? void 0 : config.sessionDataPath) || ''), (sessionId || 'session') + ".data.json");
                    sessionjson = '';
                    sd = process.env[sessionId.toUpperCase() + "_DATA_JSON"] ? JSON.parse(process.env[sessionId.toUpperCase() + "_DATA_JSON"]) : config === null || config === void 0 ? void 0 : config.sessionData;
                    sessionjson = (typeof sd === 'string') ? JSON.parse(Buffer.from(sd, 'base64').toString('ascii')) : sd;
                    if (fs.existsSync(sessionjsonpath)) {
                        s = fs.readFileSync(sessionjsonpath, "utf8");
                        try {
                            sessionjson = JSON.parse(s);
                        }
                        catch (error) {
                            sessionjson = JSON.parse(Buffer.from(s, 'base64').toString('ascii'));
                        }
                    }
                    if (!sessionjson) return [3, 12];
                    return [4, waPage.evaluateOnNewDocument(function (session) {
                            localStorage.clear();
                            Object.keys(session).forEach(function (key) { return localStorage.setItem(key, session[key]); });
                        }, sessionjson)];
                case 11:
                    _e.sent();
                    _e.label = 12;
                case 12:
                    if (!(config === null || config === void 0 ? void 0 : config.proxyServerCredentials)) return [3, 14];
                    return [4, require('puppeteer-page-proxy')(waPage, proxyAddr)];
                case 13:
                    _e.sent();
                    console.log("Active proxy: " + config.proxyServerCredentials.address);
                    _e.label = 14;
                case 14: return [4, waPage.goto(puppeteer_config_1.puppeteerConfig.WAUrl)];
                case 15:
                    _e.sent();
                    return [2, waPage];
            }
        });
    });
}
exports.initClient = initClient;
function injectApi(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, page.addScriptTag({
                        path: require.resolve(path.join(__dirname, '../lib', 'wapi.js'))
                    })];
                case 1:
                    _a.sent();
                    return [4, page.addScriptTag({
                            path: require.resolve(path.join(__dirname, '../lib', 'axios.min.js'))
                        })];
                case 2:
                    _a.sent();
                    return [4, page.addScriptTag({
                            path: require.resolve(path.join(__dirname, '../lib', 'jsSha.min.js'))
                        })];
                case 3:
                    _a.sent();
                    return [4, page.addScriptTag({
                            path: require.resolve(path.join(__dirname, '../lib', 'base64.js'))
                        })];
                case 4:
                    _a.sent();
                    return [2, page];
            }
        });
    });
}
exports.injectApi = injectApi;
function initBrowser(sessionId, config) {
    if (config === void 0) { config = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var storage, _savedPath, browserFetcher, browserDownloadSpinner_1, revisionInfo, error_1, args, browser, _a, devtools, tunnel;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!((config === null || config === void 0 ? void 0 : config.useChrome) && !(config === null || config === void 0 ? void 0 : config.executablePath))) return [3, 5];
                    storage = require('node-persist');
                    return [4, storage.init()];
                case 1:
                    _b.sent();
                    return [4, storage.getItem('executablePath')];
                case 2:
                    _savedPath = _b.sent();
                    if (!!_savedPath) return [3, 4];
                    config.executablePath = require('chrome-launcher').Launcher.getInstallations()[0];
                    return [4, storage.setItem('executablePath', config.executablePath)];
                case 3:
                    _b.sent();
                    return [3, 5];
                case 4:
                    config.executablePath = _savedPath;
                    _b.label = 5;
                case 5:
                    if (!(config === null || config === void 0 ? void 0 : config.browserRevision)) return [3, 9];
                    browserFetcher = puppeteer.createBrowserFetcher();
                    browserDownloadSpinner_1 = new events_1.Spin(sessionId + '_browser', 'Browser', false, false);
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    browserDownloadSpinner_1.start('Downloading browser revision: ' + config.browserRevision);
                    return [4, browserFetcher.download(config.browserRevision, function (downloadedBytes, totalBytes) {
                            browserDownloadSpinner_1.info("Downloading Browser: " + Math.round(downloadedBytes / 1000000) + "/" + Math.round(totalBytes / 1000000));
                        })];
                case 7:
                    revisionInfo = _b.sent();
                    if (revisionInfo.executablePath) {
                        config.executablePath = revisionInfo.executablePath;
                    }
                    browserDownloadSpinner_1.succeed('Browser downloaded successfully');
                    return [3, 9];
                case 8:
                    error_1 = _b.sent();
                    browserDownloadSpinner_1.succeed('Something went wrong while downloading the browser');
                    return [3, 9];
                case 9:
                    if (config === null || config === void 0 ? void 0 : config.browserWsEndpoint)
                        config.browserWSEndpoint = config.browserWsEndpoint;
                    args = __spreadArrays(puppeteer_config_1.puppeteerConfig.chromiumArgs, ((config === null || config === void 0 ? void 0 : config.chromiumArgs) || []));
                    if (config === null || config === void 0 ? void 0 : config.corsFix)
                        args.push('--disable-web-security');
                    if (!(config === null || config === void 0 ? void 0 : config.browserWSEndpoint)) return [3, 11];
                    return [4, puppeteer.connect(__assign({}, config))];
                case 10:
                    _a = _b.sent();
                    return [3, 13];
                case 11: return [4, puppeteer.launch(__assign({ headless: true, devtools: false, args: args }, config))];
                case 12:
                    _a = _b.sent();
                    _b.label = 13;
                case 13:
                    browser = _a;
                    if (config && config.devtools) {
                        devtools = require('puppeteer-extra-plugin-devtools')();
                        if (config.devtools.user && config.devtools.pass)
                            devtools.setAuthCredentials(config.devtools.user, config.devtools.pass);
                        try {
                            tunnel = devtools.getLocalDevToolsUrl(browser);
                            console.log('\ndevtools URL: ' + tunnel);
                        }
                        catch (error) {
                            console.log("TCL: initBrowser -> error", error);
                        }
                    }
                    return [2, browser];
            }
        });
    });
}
function getWAPage(browser) {
    return __awaiter(this, void 0, void 0, function () {
        var pages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, browser.pages()];
                case 1:
                    pages = _a.sent();
                    console.assert(pages.length > 0);
                    return [2, pages[0]];
            }
        });
    });
}
ON_DEATH(function (signal, err) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!browser) return [3, 2];
                return [4, browser.close()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2];
        }
    });
}); });
