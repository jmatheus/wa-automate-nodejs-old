"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigFromProcessEnv = exports.smartUserAgent = void 0;
exports.smartUserAgent = function (useragent, v) {
    if (v === void 0) { v = '0.4.315'; }
    useragent = useragent.replace(useragent.match(/\(([^()]*)\)/g).find(function (x) { return x.toLowerCase().includes('linux') || x.toLowerCase().includes('windows'); }), '(Macintosh; Intel Mac OS X 10_15_2)');
    if (!useragent.includes('WhatsApp'))
        return "WhatsApp/" + v + " " + useragent;
    return useragent.replace(useragent.match(/WhatsApp\/([.\d])*/g)[0].match(/[.\d]*/g).find(function (x) { return x; }), v);
};
exports.getConfigFromProcessEnv = function (json) {
    var output = {};
    json.forEach(function (_a) {
        var env = _a.env, key = _a.key;
        if (process.env[env])
            output[key] = process.env[env];
        if (process.env[env] === 'true' || process.env[env] === 'false')
            output[key] = Boolean(process.env[env]);
    });
    return output;
};
