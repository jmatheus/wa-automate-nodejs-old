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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigWithCase = void 0;
var tsj = require("ts-json-schema-generator");
var change_case_1 = require("change-case");
var defaultConfig = {
    path: "../api/model/config.ts",
    tsconfig: "../../tsconfig.json",
    type: "ConfigObject",
};
var getConfigWithCase = function (config) {
    if (!config)
        config = defaultConfig;
    var schema = tsj.createGenerator(config).createSchema(config.type);
    var ignoredConfigs = [
        'browserRevision',
        'useStealth',
        'chromiumArgs',
        'executablePath',
        'skipBrokenMethodsCheck',
        'inDocker',
        'bypassCSP',
        'throwErrorOnTosBlock',
        'killProcessOnBrowserClose'
    ];
    var configs = Object.entries(schema.definitions.ConfigObject.properties).map(function (_a) {
        var key = _a[0], entry = _a[1];
        if (key === 'sessionData') {
            entry.type = 'string';
            entry.description = 'The base64 encoded sessionData used to restore a session.';
            delete entry.anyOf;
        }
        return __assign(__assign({}, entry), { key: key });
    }).filter(function (_a) {
        var type = _a.type, key = _a.key;
        return type && !ignoredConfigs.includes(key);
    });
    var configWithCases = configs.map(function (o) { return (__assign({ env: "WA_" + (0, change_case_1.constantCase)(o.key), p: (0, change_case_1.paramCase)(o.key) }, o)); });
    return configWithCases;
};
exports.getConfigWithCase = getConfigWithCase;
