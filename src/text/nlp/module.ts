module NLP {
  // anywhere accessible as e.g. NLP.Iinput
  export interface Iinput {
    text?:string;
    options?:Object;
  };
  export interface ISentence {
    str:string;
    terms:any[];
  }
}
export = NLP;
