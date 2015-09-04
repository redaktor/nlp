/** @namespace */
declare var nlp;

declare module Nlp {

  export interface IOptionsDate {
    timeZone: string;
    weekday: string;
    year: string;
    month: string;
    day: string;
  }

  export interface IOptions {
    language: string;
  	languageDetection: boolean;

  	cache?: {
  		size?: number;
  		db?: boolean;
  	},
  	pos?: {
  		combine: boolean;
  	},
  	numbers?: {
  		// TODO
  	},
  	dates?: {
  		strict?: boolean;
  		// provide a valid JS Date or JSON Date to parse relative dates too
  		now?: Date;
  		// optional date locale can be set here,
  		// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters
  		locale?: boolean;
  		// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Using_options
  		localized?: IOptionsDate;
  	},
  	ngram?: {
  		min_count?: number;
  		max_size?: number;
  	},
  	normalize?: {
  		percentage: number;
  	}
  }

  export interface ITerm {
    text:string;
    normal:string;
    reason:string;

    normalize: () => string;
    isCapital: () => boolean;
    isAcronym: () => boolean;
    americanize: () => string;
    britishize: () => string;
    syllables: () => string[];
  }

  export interface ISentence {
    options:IOptions;
    str:string;
    terms?:ITerm[];

    text:() => string;
    normalized:() => string;
  }

  export interface IText {
    options:IOptions;
    str:string;
    sentences:ISentence[];
  }

}

export = Nlp;
