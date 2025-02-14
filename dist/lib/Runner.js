"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var debug = require('debug')('build:runner');
var Downloader_1 = require("./Downloader");
var FFmpegDownloader_1 = require("./FFmpegDownloader");
var config_1 = require("./config");
var util_1 = require("./util");
var common_1 = require("./common");
var Runner = /** @class */ (function () {
    function Runner(options, args) {
        if (options === void 0) { options = {}; }
        this.args = args;
        this.options = util_1.mergeOptions(Runner.DEFAULT_OPTIONS, options);
        debug('in constructor', 'args', args);
        debug('in constructor', 'options', this.options);
    }
    Runner.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var platform, arch, pkg, config, downloader, runtimeDir, executable, _a, code, signal;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        platform = process.platform;
                        arch = this.options.x86 || this.options.x64
                            ? (this.options.x86 ? 'ia32' : 'x64')
                            : process.arch;
                        return [4 /*yield*/, fs_extra_1.readJson(path_1.resolve(this.args[0], this.options.chromeApp ? 'manifest.json' : 'package.json'))];
                    case 1:
                        pkg = _b.sent();
                        config = new config_1.BuildConfig(pkg);
                        debug('in run', 'config', config);
                        downloader = new Downloader_1.Downloader({
                            platform: platform, arch: arch,
                            version: config.nwVersion,
                            flavor: 'sdk',
                            mirror: this.options.mirror,
                            useCaches: true,
                            showProgress: this.options.mute ? false : true,
                            forceCaches: this.options.forceCaches,
                            destination: this.options.destination,
                        });
                        if (!this.options.mute) {
                            console.info('Fetching NW.js binary...', {
                                platform: downloader.options.platform,
                                arch: downloader.options.arch,
                                version: downloader.options.version,
                                flavor: downloader.options.flavor,
                            });
                        }
                        return [4 /*yield*/, downloader.fetchAndExtract()];
                    case 2:
                        runtimeDir = _b.sent();
                        if (config.ffmpegIntegration) {
                            // FIXME: Integrate without overwriting extracted files.
                            //await this.integrateFFmpeg(platform, arch, runtimeDir, pkg, config);
                            if (!this.options.mute) {
                                console.warn('Running with FFmpeg integration is not supported.');
                            }
                        }
                        return [4 /*yield*/, util_1.findExecutable(platform, runtimeDir)];
                    case 3:
                        executable = _b.sent();
                        return [4 /*yield*/, fs_extra_1.chmod(executable, 365)];
                    case 4:
                        _b.sent();
                        if (!this.options.mute) {
                            console.info('Launching NW.js app...');
                        }
                        return [4 /*yield*/, util_1.spawnAsync(executable, this.args, {
                                detached: this.options.detached,
                            })];
                    case 5:
                        _a = _b.sent(), code = _a.code, signal = _a.signal;
                        if (!!this.options.mute) return [3 /*break*/, 8];
                        if (!this.options.detached) return [3 /*break*/, 7];
                        console.info('NW.js app detached.');
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                setTimeout(resolve, 3000);
                            })];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        console.info("NW.js app exited with " + code + ".");
                        _b.label = 8;
                    case 8: return [2 /*return*/, code];
                }
            });
        });
    };
    Runner.prototype.integrateFFmpeg = function (platform, arch, runtimeDir, pkg, config) {
        return __awaiter(this, void 0, void 0, function () {
            var downloader, ffmpegDir, src, dest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        downloader = new FFmpegDownloader_1.FFmpegDownloader({
                            platform: platform, arch: arch,
                            version: config.nwVersion,
                            useCaches: true,
                            showProgress: this.options.mute ? false : true,
                            forceCaches: this.options.forceCaches,
                            destination: this.options.destination,
                        });
                        if (!this.options.mute) {
                            console.info('Fetching FFmpeg prebuilt...', {
                                platform: downloader.options.platform,
                                arch: downloader.options.arch,
                                version: downloader.options.version,
                            });
                        }
                        return [4 /*yield*/, downloader.fetchAndExtract()];
                    case 1:
                        ffmpegDir = _a.sent();
                        return [4 /*yield*/, util_1.findFFmpeg(platform, ffmpegDir)];
                    case 2:
                        src = _a.sent();
                        return [4 /*yield*/, util_1.findFFmpeg(platform, runtimeDir)];
                    case 3:
                        dest = _a.sent();
                        return [4 /*yield*/, fs_extra_1.copy(src, dest)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Runner.DEFAULT_OPTIONS = {
        x86: false,
        x64: false,
        chromeApp: false,
        mirror: Downloader_1.Downloader.DEFAULT_OPTIONS.mirror,
        detached: false,
        mute: true,
        forceCaches: Downloader_1.Downloader.DEFAULT_OPTIONS.forceCaches,
        destination: common_1.DownloaderBase.DEFAULT_DESTINATION,
    };
    return Runner;
}());
exports.Runner = Runner;
//# sourceMappingURL=Runner.js.map