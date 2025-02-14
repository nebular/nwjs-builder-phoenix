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
var NsisComposer_1 = require("./NsisComposer");
var SignableNsisInstaller = /** @class */ (function (_super) {
    __extends(SignableNsisInstaller, _super);
    function SignableNsisInstaller(uninstallerOnly, options) {
        var _this = _super.call(this, options) || this;
        _this.uninstallerOnly = uninstallerOnly;
        _this.options = options;
        return _this;
    }
    SignableNsisInstaller.prototype.getUninstallerPath = function () {
        var outpath = path_1.dirname(path_1.resolve(this.options.output));
        var uninstallerPath = path_1.win32.normalize(path_1.resolve(outpath, this.getUninstallerName()));
        return uninstallerPath + ".exe";
    };
    SignableNsisInstaller.prototype.makeModernUIUnInstallWizard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.uninstallerOnly) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.makeModernUIUnInstallWizard.call(this)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = '; omitted since will have already been done in uninstallerOnly mode pass';
                        _b.label = 3;
                    case 3: return [2 /*return*/, _a];
                }
            });
        });
    };
    SignableNsisInstaller.prototype.makeHookOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uninstallHook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uninstallHook = this.uninstallerOnly
                            ? "\n    WriteUninstaller \"" + this.getUninstallerPath() + "\"\n    !insertmacro quitSuccess\n    "
                            : '';
                        return [4 /*yield*/, _super.prototype.makeHookOnInit.call(this)];
                    case 1: return [2 /*return*/, (_a.sent()) + uninstallHook];
                }
            });
        });
    };
    SignableNsisInstaller.prototype.makeInstallSection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dummyInstallerSection, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dummyInstallerSection = "\nSection Install\n  ; running to create uninstaller only; no commands needed\nSectionEnd\n        ";
                        if (!this.uninstallerOnly) return [3 /*break*/, 2];
                        return [4 /*yield*/, dummyInstallerSection];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, _super.prototype.makeInstallSection.call(this)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        });
    };
    SignableNsisInstaller.prototype.makeInstallSectionEnd = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, '; omitting WriteUninstaller since uninstaller will be created not as a wizard step'];
            });
        });
    };
    SignableNsisInstaller.prototype.makeUninstallSection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.uninstallerOnly) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.makeUninstallSection.call(this)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = "; omitting uninstaller section since it was already created and packaged";
                        _b.label = 3;
                    case 3: return [2 /*return*/, _a];
                }
            });
        });
    };
    return SignableNsisInstaller;
}(NsisComposer_1.NsisComposer));
exports.SignableNsisInstaller = SignableNsisInstaller;
//# sourceMappingURL=SignableNsisInstaller.js.map