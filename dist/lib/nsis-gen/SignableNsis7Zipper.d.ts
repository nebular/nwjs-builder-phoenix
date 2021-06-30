import { INsisComposerOptions } from './NsisComposer';
import { SignableNsisInstaller } from './SignableNsisInstaller';
export declare class SignableNsis7Zipper extends SignableNsisInstaller {
    protected path: string;
    protected uninstallerOnly: boolean;
    constructor(path: string, uninstallerOnly: boolean, options: INsisComposerOptions);
    protected makeInstallerFiles(): Promise<string>;
}
