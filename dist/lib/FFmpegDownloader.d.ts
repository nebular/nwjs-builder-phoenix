import { DownloaderBase } from './common';
export interface IRequestProgress {
    percent: number;
    speed: number;
    size: {
        total: number;
        transferred: number;
    };
    time: {
        elapsed: number;
        remaining: number;
    };
}
export interface IFFmpegDownloaderOptions {
    platform?: string;
    arch?: string;
    version?: string;
    mirror?: string;
    useCaches?: boolean;
    showProgress?: boolean;
    forceCaches?: boolean;
    destination?: string;
}
export declare class FFmpegDownloader extends DownloaderBase {
    static DEFAULT_OPTIONS: IFFmpegDownloaderOptions;
    options: IFFmpegDownloaderOptions;
    constructor(options: IFFmpegDownloaderOptions);
    fetch(): Promise<string>;
    protected handleVersion(version: string): Promise<string>;
}
