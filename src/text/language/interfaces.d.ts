/** @namespace */
declare var i18n;

declare module I18n {

  export interface IFingerprint {
    rank: number;
    iso: string;
    name: string;
    trigrams: Object;
  }

}

export = I18n;
