import { WinConfig } from './WinConfig';
import { MacConfig } from './MacConfig';
import { LinuxConfig } from './LinuxConfig';
import { NsisConfig } from './NsisConfig';
export declare class BuildConfig {
    nwVersion: string;
    nwFlavor: string;
    output: string;
    outputPattern: string;
    packed: boolean;
    targets: string[];
    files: string[];
    excludes: string[];
    win: WinConfig;
    mac: MacConfig;
    linux: LinuxConfig;
    nsis: NsisConfig;
    prepackHook: string;
    runInstall: boolean;
    appId: string;
    ffmpegIntegration: boolean;
    strippedProperties: string[];
    overriddenProperties: any;
    constructor(pkg?: any);
}
