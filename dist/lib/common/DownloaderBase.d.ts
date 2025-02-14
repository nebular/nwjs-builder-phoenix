import { Event } from './Event';
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
export declare abstract class DownloaderBase {
    onProgress: Event<IRequestProgress>;
    static readonly DEFAULT_DESTINATION: string;
    protected destination: string;
    abstract fetch(): Promise<string>;
    protected abstract handleVersion(version: string): Promise<string>;
    fetchAndExtract(): Promise<string>;
    protected getVersions(): Promise<any>;
    protected setDestination(destination: string): void;
    protected handlePlatform(platform: string): "linux" | "win" | "osx";
    protected handleArch(arch: string): "ia32" | "x64" | "arm64";
    protected getLocalSize(path: string): Promise<number>;
    protected getRemoteSize(url: string): Promise<number>;
    protected isFileExists(path: string): Promise<{}>;
    protected isFileSynced(url: string, path: string): Promise<boolean>;
    protected download(url: string, filename: string, path: string, showProgress: boolean): Promise<string>;
}
