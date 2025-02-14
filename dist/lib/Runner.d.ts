import { BuildConfig } from './config';
export interface IRunnerOptions {
    x86?: boolean;
    x64?: boolean;
    chromeApp?: boolean;
    mirror?: string;
    detached?: boolean;
    mute?: boolean;
    forceCaches?: boolean;
    destination?: string;
}
export declare class Runner {
    args: string[];
    static DEFAULT_OPTIONS: IRunnerOptions;
    options: IRunnerOptions;
    constructor(options: IRunnerOptions, args: string[]);
    run(): Promise<number>;
    protected integrateFFmpeg(platform: string, arch: string, runtimeDir: string, pkg: any, config: BuildConfig): Promise<void>;
}
