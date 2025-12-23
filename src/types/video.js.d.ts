declare module "video.js" {
  export interface VideoJsPlayerOptions {
    autoplay?: boolean | string;
    controls?: boolean;
    fluid?: boolean;
    responsive?: boolean;
    sources?: {
      src: string;
      type: string;
    }[];
    preload?: string;
    [key: string]: string;
  }

  export interface VideoJsPlayer {
    play(): void;
    pause(): void;
    dispose(): void;
    src(source: string): void;
    on(event: string, callback: (...args: string[]) => void): void;
    [key: string]: string;
  }

  const videojs: VideoJsPlayer;
  export default videojs;
}
