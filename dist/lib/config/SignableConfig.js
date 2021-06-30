"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SignableConfig = /** @class */ (function () {
    function SignableConfig(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.signing = {
            cliArgs: '',
            cliArgsInterpolated: [''],
            cliArgsVarsFile: '.env',
            filesToSignGlobs: [''],
            signtoolPath: '',
        };
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
    return SignableConfig;
}());
exports.SignableConfig = SignableConfig;
//# sourceMappingURL=SignableConfig.js.map