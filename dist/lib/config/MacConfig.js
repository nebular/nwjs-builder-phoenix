"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MacConfig = /** @class */ (function () {
    function MacConfig(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.name = '';
        this.displayName = '';
        this.version = '';
        this.description = '';
        this.copyright = '';
        this.icon = undefined;
        this.documentIcon = undefined;
        this.plistStrings = {};
        Object.keys(this).map(function (key) {
            if (options[key] !== undefined) {
                switch (key) {
                    default:
                        _this[key] = options[key];
                        break;
                }
            }
        });
    }
    return MacConfig;
}());
exports.MacConfig = MacConfig;
//# sourceMappingURL=MacConfig.js.map