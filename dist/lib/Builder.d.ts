import { BuildConfig } from './config';
import { NsisVersionInfo } from './common';
export interface IParseOutputPatternOptions {
    name: string;
    version: string;
    platform: string;
    arch: string;
}
export interface IBuilderOptions {
    win?: boolean;
    mac?: boolean;
    linux?: boolean;
    x86?: boolean;
    x64?: boolean;
    arm64?: boolean;
    tasks?: string[];
    chromeApp?: boolean;
    mirror?: string;
    concurrent?: boolean;
    mute?: boolean;
    forceCaches?: boolean;
    destination?: string;
}
export declare class Builder {
    dir: string;
    static DEFAULT_OPTIONS: IBuilderOptions;
    options: IBuilderOptions;
    constructor(options: IBuilderOptions, dir: string);
    build(): Promise<void>;
    protected getTimeDiff(started: number): string;
    protected writeStrippedManifest(path: string, pkg: any, config: BuildConfig): Promise<void>;
    protected parseOutputPattern(pattern: string, options: IParseOutputPatternOptions, pkg: any, config: BuildConfig): string;
    protected combineExecutable(executable: string, nwFile: string): Promise<{}>;
    protected readPlist(path: string): Promise<any>;
    protected writePlist(path: string, p: any): Promise<void>;
    protected updateWinResources(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<{}>;
    protected renameWinApp(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    protected updatePlist(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    protected updateHelperPlist(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    protected updateMacIcons(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    protected fixMacMeta(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    protected renameMacApp(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    protected renameMacHelperApp(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    protected canRenameMacHelperApp(pkg: any, config: BuildConfig): boolean;
    protected findMacHelperApp(targetDir: string): Promise<string>;
    protected fixLinuxMode(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    protected renameLinuxApp(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    protected prepareWinBuild(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    protected prepareMacBuild(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    private maybeRunPrehookScript;
    private maybeRunNpmInstall;
    protected prepareLinuxBuild(targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    protected copyFiles(platform: string, targetDir: string, appRoot: string, pkg: any, config: BuildConfig): Promise<void>;
    protected integrateFFmpeg(platform: string, arch: string, targetDir: string, pkg: any, config: BuildConfig): Promise<void>;
    protected buildNsisDiffUpdater(platform: string, arch: string, versionInfo: NsisVersionInfo, fromVersion: string, toVersion: string, pkg: any, config: BuildConfig): Promise<void>;
    protected buildDirTarget(platform: string, arch: string, runtimeDir: string, pkg: any, config: BuildConfig): Promise<string>;
    private systemSync;
    protected buildArchiveTarget(type: string, sourceDir: string): Promise<string>;
    protected buildNsisTarget(platform: string, arch: string, sourceDir: string, pkg: any, config: BuildConfig): Promise<void>;
    protected buildNsis7zTarget(platform: string, arch: string, sourceDir: string, pkg: any, config: BuildConfig): Promise<void>;
    protected buildTask(platform: string, arch: string, pkg: any, config: BuildConfig): Promise<void>;
}
