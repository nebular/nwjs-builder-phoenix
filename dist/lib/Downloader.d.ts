import { DownloaderBase } from './common/DownloaderBase';
export interface IDownloaderOptions {
    platform?: string;
    arch?: string;
    version?: string;
    flavor?: string;
    mirror?: string;
    useCaches?: boolean;
    showProgress?: boolean;
    forceCaches?: boolean;
    destination?: string;
}
export declare class Downloader extends DownloaderBase {
    static DEFAULT_OPTIONS: IDownloaderOptions;
    options: IDownloaderOptions;
    constructor(options: IDownloaderOptions);
    fetch(): Promise<string>;
    protected handleVersion(version: string): Promise<any>;
    protected extensionByPlatform(platform: string): "tar.gz" | "zip";
}
