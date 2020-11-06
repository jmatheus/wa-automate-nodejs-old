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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var fs = require('fs'), boxen = require('boxen'), configWithCases = require('../../bin/config-schema.json'), updateNotifier = require('update-notifier'), pkg = require('../../package.json'), timeout = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms, 'timeout'); });
};
var Client_1 = require("../api/Client");
var path = __importStar(require("path"));
var auth_1 = require("./auth");
var browser_1 = require("./browser");
var events_1 = require("./events");
var launch_checks_1 = require("./launch_checks");
var tree_kill_1 = __importDefault(require("tree-kill"));
var cfonts_1 = __importDefault(require("cfonts"));
var popup_1 = require("./popup");
var tools_1 = require("../utils/tools");
var shouldLoop = true, qrDelayTimeout, axios;
function create(_sessionId, config, customUserAgent) {
    return __awaiter(this, void 0, void 0, function () {
        var START_TIME, waPage, notifier, sessionId, result, prettyFont, popupaddr, spinner, throwOnError_1, PAGE_UA, BROWSER_VERSION, WA_AUTOMATE_VERSION, WA_VERSION, canInjectEarly, debugInfo, authRace, authenticated, outOfReach, autoRefresh_1, qrLogSkip_1, qrLoop_1, qrSpin, race, result, pre, VALID_SESSION, localStorage_1, _a, _b, sessionjsonpath, sessionData, sdB64, pureWAPI, _c, LAUNCH_TIME_MS, data, client, error_1;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    START_TIME = Date.now();
                    waPage = undefined;
                    sessionId = '';
                    if (typeof _sessionId === 'object' && _sessionId) {
                        config = _sessionId;
                    }
                    else if (typeof _sessionId === 'string') {
                        sessionId = _sessionId;
                    }
                    else if (!_sessionId) {
                        config = {};
                    }
                    if (!(!(config === null || config === void 0 ? void 0 : config.skipUpdateCheck) || (config === null || config === void 0 ? void 0 : config.keepUpdated))) return [3, 2];
                    return [4, updateNotifier({
                            pkg: pkg,
                            updateCheckInterval: 0
                        })];
                case 1:
                    notifier = _d.sent();
                    notifier.notify();
                    if ((notifier === null || notifier === void 0 ? void 0 : notifier.update) && (config === null || config === void 0 ? void 0 : config.keepUpdated)) {
                        console.log('UPDATING @OPEN-WA');
                        result = require('cross-spawn').spawn.sync('npm', ['i', '@open-wa/wa-automate'], { stdio: 'inherit' });
                        if (!result.stderr) {
                            console.log('UPDATED SUCCESSFULLY');
                        }
                        console.log('RESTARTING PROCESS');
                        process.on("exit", function () {
                            require('cross-spawn').spawn(process.argv.shift(), process.argv, {
                                cwd: process.cwd(),
                                detached: true,
                                stdio: "inherit"
                            });
                        });
                        process.exit();
                    }
                    _d.label = 2;
                case 2:
                    if (config === null || config === void 0 ? void 0 : config.inDocker) {
                        config = __assign(__assign({}, config), tools_1.getConfigFromProcessEnv(configWithCases));
                        config.chromiumArgs = (config === null || config === void 0 ? void 0 : config.chromiumArgs) || [];
                        customUserAgent = config.customUserAgent;
                    }
                    if (sessionId === '' || (config === null || config === void 0 ? void 0 : config.sessionId))
                        sessionId = (config === null || config === void 0 ? void 0 : config.sessionId) || 'session';
                    prettyFont = cfonts_1.default.render(('@OPEN-WA|WHATSAPP|AUTOMATOR'), {
                        font: '3d',
                        color: 'candy',
                        align: 'center',
                        gradient: ["red", "#f80"],
                        lineHeight: 3
                    });
                    console.log((config === null || config === void 0 ? void 0 : config.disableSpins) ? boxen([
                        "@open-wa/wa-automate   ",
                        "" + pkg.description,
                        "Version: " + pkg.version + "   ",
                        "Check out the latest changes: https://github.com/open-wa/wa-automate-nodejs#latest-changes   ",
                    ].join('\n'), { padding: 1, borderColor: 'yellow', borderStyle: 'bold' }) : prettyFont.string);
                    if (!(config === null || config === void 0 ? void 0 : config.popup)) return [3, 4];
                    return [4, popup_1.popup(config)];
                case 3:
                    popupaddr = _d.sent();
                    console.log("You can also authenticate the session at: " + popupaddr);
                    _d.label = 4;
                case 4:
                    if (!sessionId)
                        sessionId = 'session';
                    spinner = new events_1.Spin(sessionId, 'STARTUP', config === null || config === void 0 ? void 0 : config.disableSpins);
                    _d.label = 5;
                case 5:
                    _d.trys.push([5, 43, , 45]);
                    qrDelayTimeout = undefined;
                    shouldLoop = true;
                    events_1.ev.on('AUTH.**', function (isAuthenticated, sessionId) { return shouldLoop = false; });
                    spinner.start('Initializing WA');
                    return [4, browser_1.initClient(sessionId, config, customUserAgent)];
                case 6:
                    waPage = _d.sent();
                    spinner.succeed('Browser Launched');
                    throwOnError_1 = config && config.throwErrorOnTosBlock == true;
                    return [4, waPage.evaluate('navigator.userAgent')];
                case 7:
                    PAGE_UA = _d.sent();
                    return [4, waPage.browser().version()];
                case 8:
                    BROWSER_VERSION = _d.sent();
                    waPage
                        .on('console', function (message) { return console.log(message.type().substr(0, 3).toUpperCase() + " " + message.text()); })
                        .on('pageerror', function (_a) {
                        var message = _a.message;
                        return console.log(message);
                    })
                        .on('response', function (response) { return console.log(response.status() + " " + response.url()); })
                        .on('requestfailed', function (request) { return console.log(request.failure().errorText + " " + request.url()); });
                    WA_AUTOMATE_VERSION = "" + pkg.version + ((notifier === null || notifier === void 0 ? void 0 : notifier.update) ? " UPDATE AVAILABLE: " + (notifier === null || notifier === void 0 ? void 0 : notifier.update.latest) : '');
                    return [4, waPage.evaluate(function () { return window.Debug ? window.Debug.VERSION : 'I think you have been TOS_BLOCKed'; })];
                case 9:
                    WA_VERSION = _d.sent();
                    return [4, waPage.evaluate(function () { return (typeof webpackJsonp !== "undefined"); })];
                case 10:
                    canInjectEarly = _d.sent();
                    debugInfo = {
                        WA_VERSION: WA_VERSION,
                        PAGE_UA: PAGE_UA,
                        WA_AUTOMATE_VERSION: WA_AUTOMATE_VERSION,
                        BROWSER_VERSION: BROWSER_VERSION
                    };
                    console.table(debugInfo);
                    if (!canInjectEarly) return [3, 12];
                    spinner.start('Injecting api');
                    return [4, browser_1.injectApi(waPage)];
                case 11:
                    waPage = _d.sent();
                    spinner.start('WAPI injected');
                    return [3, 13];
                case 12:
                    spinner.remove();
                    if (throwOnError_1)
                        throw Error('TOSBLOCK');
                    _d.label = 13;
                case 13:
                    spinner.start('Authenticating');
                    authRace = [];
                    authRace.push(auth_1.isAuthenticated(waPage));
                    if (config === null || config === void 0 ? void 0 : config.authTimeout) {
                        authRace.push(timeout(config.authTimeout * 1000));
                    }
                    return [4, Promise.race(authRace)];
                case 14:
                    authenticated = _d.sent();
                    if (!(authenticated == 'timeout')) return [3, 17];
                    return [4, auth_1.phoneIsOutOfReach(waPage)];
                case 15:
                    outOfReach = _d.sent();
                    spinner.emit(outOfReach ? 'appOffline' : 'authTimeout');
                    spinner.fail(outOfReach ? 'Authentication timed out. Please open the app on the phone. Shutting down' : 'Authentication timed out. Shutting down. Consider increasing authTimeout config variable: https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html#authtimeout');
                    return [4, kill(waPage)];
                case 16:
                    _d.sent();
                    throw new Error(outOfReach ? 'App Offline' : 'Auth Timeout. Consider increasing authTimeout config variable: https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html#authtimeout');
                case 17:
                    autoRefresh_1 = config ? config.autoRefresh : false;
                    qrLogSkip_1 = config ? config.qrLogSkip : false;
                    qrLoop_1 = function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!shouldLoop)
                                        return [2];
                                    console.log(' ');
                                    return [4, auth_1.retrieveQR(waPage, sessionId, autoRefresh_1, throwOnError_1, qrLogSkip_1, config === null || config === void 0 ? void 0 : config.qrFormat, config === null || config === void 0 ? void 0 : config.qrQuality)];
                                case 1:
                                    _a.sent();
                                    console.log(' ');
                                    qrDelayTimeout = timeout((config ? (config.qrRefreshS || 10) : 10) * 1000);
                                    return [4, qrDelayTimeout];
                                case 2:
                                    _a.sent();
                                    if (autoRefresh_1)
                                        qrLoop_1();
                                    return [2];
                            }
                        });
                    }); };
                    if (!authenticated) return [3, 18];
                    spinner.succeed('Authenticated');
                    return [3, 22];
                case 18:
                    spinner.info('Authenticate to continue');
                    qrSpin = new events_1.Spin(sessionId, 'QR');
                    qrSpin.start('Loading QR');
                    qrSpin.succeed();
                    qrLoop_1();
                    race = [];
                    race.push(auth_1.isInsideChat(waPage).toPromise());
                    if (config === null || config === void 0 ? void 0 : config.qrTimeout) {
                        race.push(timeout(config.qrTimeout * 1000));
                    }
                    return [4, Promise.race(race)];
                case 19:
                    result = _d.sent();
                    if (!(result == 'timeout')) return [3, 21];
                    spinner.emit('qrTimeout');
                    spinner.fail('QR scan took too long. Session Timed Out. Shutting down. Consider increasing qrTimeout config variable: https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html#qrtimeout');
                    return [4, kill(waPage)];
                case 20:
                    _d.sent();
                    throw new Error('QR Timeout');
                case 21:
                    qrSpin.emit('successfulScan');
                    shouldLoop = false;
                    clearTimeout(qrDelayTimeout);
                    spinner.succeed();
                    _d.label = 22;
                case 22:
                    pre = canInjectEarly ? 'Rei' : 'I';
                    spinner.start(pre + "njecting api");
                    return [4, browser_1.injectApi(waPage)];
                case 23:
                    waPage = _d.sent();
                    spinner.succeed("WAPI " + pre + "njected");
                    if (!canInjectEarly) return [3, 25];
                    spinner.start('Checking if session is valid');
                    if (!(config === null || config === void 0 ? void 0 : config.safeMode)) return [3, 25];
                    return [4, timeout(5000)];
                case 24:
                    _d.sent();
                    _d.label = 25;
                case 25: return [4, waPage.evaluate(function () { return window.Store && window.Store.Msg ? true : false; })];
                case 26:
                    VALID_SESSION = _d.sent();
                    if (!VALID_SESSION) return [3, 39];
                    spinner.succeed('Client is ready');
                    _b = (_a = JSON).parse;
                    return [4, waPage.evaluate(function () {
                            return JSON.stringify(window.localStorage);
                        })];
                case 27:
                    localStorage_1 = _b.apply(_a, [_d.sent()]);
                    sessionjsonpath = ((config === null || config === void 0 ? void 0 : config.sessionDataPath) && (config === null || config === void 0 ? void 0 : config.sessionDataPath.includes('.data.json'))) ? path.join(path.resolve(process.cwd(), (config === null || config === void 0 ? void 0 : config.sessionDataPath) || '')) : path.join(path.resolve(process.cwd(), (config === null || config === void 0 ? void 0 : config.sessionDataPath) || ''), (sessionId || 'session') + ".data.json");
                    sessionData = {
                        WABrowserId: localStorage_1.WABrowserId,
                        WASecretBundle: localStorage_1.WASecretBundle,
                        WAToken1: localStorage_1.WAToken1,
                        WAToken2: localStorage_1.WAToken2
                    };
                    sdB64 = Buffer.from(JSON.stringify(sessionData)).toString('base64');
                    spinner.emit(sessionData, "sessionData");
                    spinner.emit(sdB64, "sessionDataBase64");
                    if (!(config === null || config === void 0 ? void 0 : config.skipSessionSave))
                        fs.writeFile(sessionjsonpath, sdB64, function (err) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            ;
                        });
                    if (config === null || config === void 0 ? void 0 : config.logConsole)
                        waPage.on('console', function (msg) { return console.log(msg); });
                    if (config === null || config === void 0 ? void 0 : config.logConsoleErrors)
                        waPage.on('error', function (error) { return console.log(error); });
                    if (config === null || config === void 0 ? void 0 : config.restartOnCrash)
                        waPage.on('error', function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.error('Page Crashed! Restarting...', error);
                                        return [4, kill(waPage)];
                                    case 1:
                                        _a.sent();
                                        return [4, create(sessionId, config, customUserAgent).then(config.restartOnCrash)];
                                    case 2:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); });
                    return [4, launch_checks_1.checkWAPIHash()];
                case 28:
                    pureWAPI = _d.sent();
                    if (!pureWAPI) {
                        config.skipBrokenMethodsCheck = true;
                    }
                    _c = debugInfo;
                    return [4, waPage.evaluate("(window.localStorage['last-wid'] || '').replace('@c.us','').replace(/\"/g,\"\").slice(-4)")];
                case 29:
                    _c.NUM = _d.sent();
                    if (!((config === null || config === void 0 ? void 0 : config.skipBrokenMethodsCheck) !== true)) return [3, 31];
                    return [4, launch_checks_1.integrityCheck(waPage, notifier, spinner, debugInfo)];
                case 30:
                    _d.sent();
                    _d.label = 31;
                case 31:
                    LAUNCH_TIME_MS = Date.now() - START_TIME;
                    debugInfo = __assign(__assign({}, debugInfo), { LAUNCH_TIME_MS: LAUNCH_TIME_MS });
                    spinner.emit(debugInfo, "DebugInfo");
                    spinner.succeed("Client loaded in " + LAUNCH_TIME_MS / 1000 + "s");
                    if (!(config === null || config === void 0 ? void 0 : config.hostNotificationLang)) return [3, 33];
                    return [4, waPage.evaluate("window.hostlang=\"" + config.hostNotificationLang + "\"")];
                case 32:
                    _d.sent();
                    _d.label = 33;
                case 33:
                    if (!!(config === null || config === void 0 ? void 0 : config.skipPatches)) return [3, 38];
                    spinner.info('Installing patches');
                    if (!!axios) return [3, 35];
                    return [4, Promise.resolve().then(function () { return __importStar(require('axios')); })];
                case 34:
                    axios = _d.sent();
                    _d.label = 35;
                case 35: return [4, axios.get(pkg.patches)];
                case 36:
                    data = (_d.sent()).data;
                    return [4, Promise.all(data.map(function (patch) { return waPage.evaluate("" + patch); }))];
                case 37:
                    _d.sent();
                    spinner.succeed('Patches Installed');
                    _d.label = 38;
                case 38:
                    client = new Client_1.Client(waPage, config, debugInfo);
                    spinner.succeed("\uD83D\uDE80 @OPEN-WA ready");
                    spinner.emit('SUCCESS');
                    return [2, client];
                case 39:
                    spinner.fail('The session is invalid. Retrying');
                    return [4, kill(waPage)];
                case 40:
                    _d.sent();
                    return [4, create(sessionId, config, customUserAgent)];
                case 41: return [2, _d.sent()];
                case 42: return [3, 45];
                case 43:
                    error_1 = _d.sent();
                    spinner.emit(error_1.message);
                    return [4, kill(waPage)];
                case 44:
                    _d.sent();
                    spinner.remove();
                    throw error_1;
                case 45: return [2];
            }
        });
    });
}
exports.create = create;
var kill = function (p) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, pid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shouldLoop = false;
                if (qrDelayTimeout)
                    clearTimeout(qrDelayTimeout);
                if (!p) return [3, 6];
                return [4, p.browser()];
            case 1:
                browser = _a.sent();
                pid = browser.process() ? browser === null || browser === void 0 ? void 0 : browser.process().pid : null;
                if (!!p.isClosed()) return [3, 3];
                return [4, p.close()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!browser) return [3, 5];
                return [4, browser.close()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                if (pid)
                    tree_kill_1.default(pid, 'SIGKILL');
                _a.label = 6;
            case 6: return [2];
        }
    });
}); };
