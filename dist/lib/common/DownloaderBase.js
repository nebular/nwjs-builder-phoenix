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
var request = require("request");
var ProgressBar = require("progress");
var fs_extra_1 = require("fs-extra");
var debug = require('debug')('build:downloader');
var progress = require('request-progress');
var Event_1 = require("./Event");
var util_1 = require("../util");
var DIR_CACHES = process.env.NWJS_BUILDER_CACHE || path_1.resolve(path_1.dirname(module.filename), '..', '..', '..', 'caches');
fs_extra_1.ensureDirSync(DIR_CACHES);
var DownloaderBase = /** @class */ (function () {
    function DownloaderBase() {
        this.onProgress = new Event_1.Event('progress');
        this.destination = DownloaderBase.DEFAULT_DESTINATION;
    }
    DownloaderBase.prototype.fetchAndExtract = function () {
        return __awaiter(this, void 0, void 0, function () {
            var archive, dest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch()];
                    case 1:
                        archive = _a.sent();
                        dest = archive + "-extracted";
                        return [4 /*yield*/, util_1.extractGeneric(archive, dest)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, dest];
                }
            });
        });
    };
    DownloaderBase.prototype.getVersions = function () {
        return new Promise(function (resolve, reject) {
            request('https://nwjs.io/versions.json', function (err, res, body) {
                if (err) {
                    return reject(err);
                }
                var json = JSON.parse(body);
                resolve(json);
            });
        });
    };
    DownloaderBase.prototype.setDestination = function (destination) {
        this.destination = destination;
    };
    DownloaderBase.prototype.handlePlatform = function (platform) {
        switch (platform) {
            case 'win32':
            case 'win':
                return 'win';
            case 'darwin':
            case 'osx':
            case 'mac':
                return 'osx';
            case 'linux':
                return 'linux';
            default:
                throw new Error('ERROR_UNKNOWN_PLATFORM');
        }
    };
    DownloaderBase.prototype.handleArch = function (arch) {
        switch (arch) {
            case 'x86':
            case 'ia32':
                return 'ia32';
            case 'x64':
                return 'x64';
            case 'arm64':
                return 'arm64';
            default:
                throw new Error('ERROR_UNKNOWN_PLATFORM');
        }
    };
    DownloaderBase.prototype.getLocalSize = function (path) {
        return fs_extra_1.lstat(path)
            .then(function (stat) { return stat.size; });
    };
    DownloaderBase.prototype.getRemoteSize = function (url) {
        return new Promise(function (resolve, reject) {
            request.head(url, {
                followAllRedirects: true,
            })
                .on('error', reject)
                .on('response', function (res) { return resolve(parseInt((res.headers['content-length']), 10)); });
        });
    };
    DownloaderBase.prototype.isFileExists = function (path) {
        return new Promise(function (resolve, reject) {
            fs_extra_1.exists(path, resolve);
        });
    };
    DownloaderBase.prototype.isFileSynced = function (url, path) {
        return __awaiter(this, void 0, void 0, function () {
            var localSize, remoteSize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLocalSize(path)];
                    case 1:
                        localSize = _a.sent();
                        return [4 /*yield*/, this.getRemoteSize(url)];
                    case 2:
                        remoteSize = _a.sent();
                        debug('in isFileSynced', 'localSize', localSize);
                        debug('in isFileSynced', 'remoteSize', remoteSize);
                        return [2 /*return*/, localSize == remoteSize];
                }
            });
        });
    };
    DownloaderBase.prototype.download = function (url, filename, path, showProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var bar, onProgress;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bar = null;
                        onProgress = function (state) {
                            if (!state.size.total) {
                                return;
                            }
                            if (!bar) {
                                bar = new ProgressBar('[:bar] :speedKB/s :etas', {
                                    width: 50,
                                    total: state.size.total,
                                });
                                console.info('');
                            }
                            bar.update(state.size.transferred / state.size.total, {
                                speed: (state.speed / 1000).toFixed(2),
                            });
                        };
                        if (showProgress) {
                            this.onProgress.subscribe(onProgress);
                        }
                        debug('in download', 'start downloading', filename);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                progress(request(url, {
                                    encoding: null,
                                }, function (err, res, data) {
                                    if (err) {
                                        return reject(err);
                                    }
                                    if (res.statusCode != 200) {
                                        var e = new Error("ERROR_STATUS_CODE statusCode = " + res.statusCode);
                                        return reject(e);
                                    }
                                    fs_extra_1.writeFile(path, data, function (err) { return err ? reject(err) : resolve(); });
                                }))
                                    .on('progress', function (state) {
                                    _this.onProgress.trigger(state);
                                });
                            })];
                    case 1:
                        _a.sent();
                        debug('in fetch', 'end downloading', filename);
                        if (showProgress) {
                            this.onProgress.unsubscribe(onProgress);
                            if (bar) {
                                console.info('');
                                bar.terminate();
                            }
                        }
                        return [2 /*return*/, path];
                }
            });
        });
    };
    DownloaderBase.DEFAULT_DESTINATION = DIR_CACHES;
    return DownloaderBase;
}());
exports.DownloaderBase = DownloaderBase;
//# sourceMappingURL=DownloaderBase.js.map