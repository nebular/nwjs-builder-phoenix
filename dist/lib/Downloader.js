"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var debug = require('debug')('build:downloader');
var DownloaderBase_1 = require("./common/DownloaderBase");
var util_1 = require("./util");
var Downloader = /** @class */ (function (_super) {
    __extends(Downloader, _super);
    function Downloader(options) {
        var _this = _super.call(this) || this;
        _this.options = util_1.mergeOptions(Downloader.DEFAULT_OPTIONS, options);
        if (_this.options.destination !== _this.destination) {
            _this.setDestination(_this.options.destination);
        }
        if (process.env.NWJS_MIRROR) {
            _this.options.mirror = process.env.NWJS_MIRROR;
        }
        debug('in constructor', 'options', _this.options);
        return _this;
    }
    Downloader.prototype.fetch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, mirror, platform, arch, version, flavor, showProgress, partVersion, partFlavor, partPlatform, partArch, partExtension, url, filename, path, _b, _c, err_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.options, mirror = _a.mirror, platform = _a.platform, arch = _a.arch, version = _a.version, flavor = _a.flavor, showProgress = _a.showProgress;
                        return [4 /*yield*/, this.handleVersion(version)];
                    case 1:
                        partVersion = _d.sent();
                        partFlavor = flavor == 'normal' ? '' : '-' + flavor;
                        partPlatform = this.handlePlatform(platform);
                        partArch = this.handleArch(arch);
                        partExtension = this.extensionByPlatform(platform);
                        url = mirror + "/" + partVersion + "/nwjs" + partFlavor + "-" + partVersion + "-" + partPlatform + "-" + partArch + "." + partExtension;
                        filename = path_1.basename(url);
                        path = path_1.resolve(this.destination, partVersion.substring(1), filename);
                        console.log('in fetch', 'url', url);
                        console.log('in fetch', 'filename', filename);
                        console.log('in fetch', 'path', path);
                        _b = this.options.forceCaches;
                        if (!_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.isFileExists(path)];
                    case 2:
                        _b = (_d.sent());
                        _d.label = 3;
                    case 3:
                        if (_b) {
                            return [2 /*return*/, path];
                        }
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 8, , 9]);
                        return [4 /*yield*/, this.isFileExists(path)];
                    case 5:
                        _c = (_d.sent());
                        if (!_c) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.isFileSynced(url, path)];
                    case 6:
                        _c = (_d.sent());
                        _d.label = 7;
                    case 7:
                        if (_c) {
                            return [2 /*return*/, path];
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _d.sent();
                        debug('in fetch', 'err', err_1);
                        if (err_1.code === 'ENOTFOUND' && this.options.useCaches) {
                            console.info('DNS lookup fails, use local caches at this time.');
                            return [2 /*return*/, path];
                        }
                        else if (err_1.code === 'EAI_AGAIN' && this.options.useCaches) {
                            console.info('DNS lookup timeout, use local caches at this time.');
                            return [2 /*return*/, path];
                        }
                        else {
                            throw err_1;
                        }
                        return [3 /*break*/, 9];
                    case 9: return [4 /*yield*/, this.download(url, filename, path, showProgress)];
                    case 10:
                        _d.sent();
                        return [2 /*return*/, path];
                }
            });
        });
    };
    Downloader.prototype.handleVersion = function (version) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, versions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = version;
                        switch (_a) {
                            case 'latest': return [3 /*break*/, 1];
                            case 'stable': return [3 /*break*/, 1];
                            case 'lts': return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.getVersions()];
                    case 2:
                        versions = _b.sent();
                        //debug('in handleVersion', 'versions', versions);
                        return [2 /*return*/, versions[version]];
                    case 3: return [2 /*return*/, version[0] == 'v' ? version : 'v' + version];
                }
            });
        });
    };
    Downloader.prototype.extensionByPlatform = function (platform) {
        switch (platform) {
            case 'win32':
            case 'win':
                return 'zip';
            case 'darwin':
            case 'osx':
            case 'mac':
                return 'zip';
            case 'linux':
                return 'tar.gz';
            default:
                throw new Error('ERROR_UNKNOWN_PLATFORM');
        }
    };
    Downloader.DEFAULT_OPTIONS = {
        platform: process.platform,
        arch: process.arch,
        version: '0.61.0',
        flavor: 'normal',
        mirror: 'https://dl.nwjs.io/',
        useCaches: true,
        showProgress: true,
        forceCaches: true,
        destination: DownloaderBase_1.DownloaderBase.DEFAULT_DESTINATION,
    };
    return Downloader;
}(DownloaderBase_1.DownloaderBase));
exports.Downloader = Downloader;
//# sourceMappingURL=Downloader.js.map