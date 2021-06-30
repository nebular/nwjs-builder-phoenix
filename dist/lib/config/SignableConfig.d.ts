export declare class SignableConfig {
    signing: {
        cliArgs: string;
        cliArgsInterpolated?: string[];
        cliArgsVarsFile?: string;
        filesToSignGlobs: [string];
        signtoolPath: string;
    };
    constructor(options?: any);
}
