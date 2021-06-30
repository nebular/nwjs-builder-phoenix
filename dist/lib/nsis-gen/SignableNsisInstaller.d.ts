import { INsisComposerOptions, NsisComposer } from './NsisComposer';
export declare class SignableNsisInstaller extends NsisComposer {
    protected uninstallerOnly: boolean;
    options: INsisComposerOptions;
    constructor(uninstallerOnly: boolean, options: INsisComposerOptions);
    getUninstallerPath(): string;
    protected makeModernUIUnInstallWizard(): Promise<string>;
    protected makeHookOnInit(): Promise<string>;
    protected makeInstallSection(): Promise<string>;
    protected makeInstallSectionEnd(): Promise<string>;
    protected makeUninstallSection(): Promise<string>;
}
