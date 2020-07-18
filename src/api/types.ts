import { GoogleCardTypes, GoogleImageVideoTypes, GoogleLocales } from '../constants';


export namespace RestOptions {
  export interface EditGuildSettings {
    allowlist?: Array<{
      id: string,
      type: string,
    }>,
    blocklist?: Array<{
      id: string,
      type: string,
    }>,
    prefixes?: Array<string>,
  }


  export interface GoogleContentVisionOCR {
    url: string,
  }

  export interface GoogleSearch {
    locale?: GoogleLocales,
    maxResults?: number,
    query: string,
    safe?: boolean | string,
    showUnknown?: boolean | string,
  }

  export interface GoogleSearchImages {
    locale?: GoogleLocales,
    maxResults?: number,
    query: string,
    safe?: boolean | string,
  }

  export interface GoogleTranslate {
    from?: GoogleLocales,
    text: string,
    to?: GoogleLocales,
  }


  export interface ImageJPEG {
    quality?: number,
    url: string,
  }

  export interface ImageMagik {
    scale?: number,
    url: string,
  }

  export interface ImageMagikGif {
    url: string,
  }

  export interface ImageMirrorBottom {
    url: string,
  }

  export interface ImageMirrorLeft {
    url: string,
  }

  export interface ImageMirrorRight {
    url: string,
  }

  export interface ImageMirrorTop {
    url: string,
  }

  export interface ImageResize {
    convert?: string,
    scale?: number,
    size?: string,
    url: string,
  }

  export interface PutGuildSettings {
    icon: null | string,
    name: string,
  }

  export interface SearchDuckDuckGo {
    query: string,
  }

  export interface SearchDuckDuckGoImages {
    query: string,
  }

  export interface SearchE621 {
    max_results?: number,
    query: string,
  }

  export interface SearchE926 {
    max_results?: number,
    query: string,
  }

  export interface SearchRule34 {
    query: string,
  }

  export interface SearchRule34Paheal {
    query: string,
  }

  export interface SearchUrban {
    query: string,
  }

  export interface SearchUrbanRandom {

  }

  export interface SearchWolframAlpha {
    query: string,
  }


  export interface UploadCommands {
    commands: Array<{
      aliases: Array<string>,
      args: Array<{aliases: Array<string>, name: string, prefix: string}>,
      description: string,
      dmable: boolean,
      examples: Array<string>,
      name: string,
      ratelimits: Array<{duration: number, limit: number, type: string}>,
      type: string,
      usage: string,
    }>,
  }


  export interface YoutubeSearch {
    query: string,
  }
  
}