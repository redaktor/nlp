/**
 * data module, autogenerated by grunt. <br>
 * change and contribute to dictionary <br>
 *  <br>
 * The schema for Parts Of Speech tagging <br>
 *  <br>
 * @readonly
 * @module data/en/schema
 */
declare var res:any;
declare var zip:any;
zip = { VB: { name: 'verb, generic', parent: 'verb', tag: 'VB' },
  VBD: 
   { name: 'past-tense verb',
     parent: 'verb',
     tag: 'VBD',
     tense: 'past' },
  VBN: 
   { name: 'past-participle verb',
     parent: 'verb',
     tag: 'VBN',
     tense: 'past' },
  VBP: 
   { name: 'infinitive verb',
     parent: 'verb',
     tag: 'VBP',
     tense: 'present' },
  VBF: 
   { name: 'future-tense verb',
     parent: 'verb',
     tag: 'VBF',
     tense: 'future' },
  VBZ: 
   { name: 'present-tense verb',
     parent: 'verb',
     tag: 'VBZ',
     tense: 'present' },
  CP: { name: 'copula', parent: 'verb', tag: 'CP' },
  VBG: { name: 'gerund verb', parent: 'verb', tag: 'VBG' },
  JJ: { name: 'adjective, generic', parent: 'adjective', tag: 'JJ' },
  JJR: 
   { name: 'comparative adjective',
     parent: 'adjective',
     tag: 'JJR' },
  JJS: 
   { name: 'superlative adjective',
     parent: 'adjective',
     tag: 'JJS' },
  RB: { name: 'adverb', parent: 'adverb', tag: 'RB' },
  RBR: { name: 'comparative adverb', parent: 'adverb', tag: 'RBR' },
  RBS: { name: 'superlative adverb', parent: 'adverb', tag: 'RBS' },
  NN: { name: 'noun, generic', parent: 'noun', tag: 'NN' },
  NNP: { name: 'singular proper noun', parent: 'noun', tag: 'NNP' },
  NNA: { name: 'noun, active', parent: 'noun', tag: 'NNA' },
  NNPA: { name: 'noun, acronym', parent: 'noun', tag: 'NNPA' },
  NNPS: { name: 'plural proper noun', parent: 'noun', tag: 'NNPS' },
  NNAB: { name: 'noun, abbreviation', parent: 'noun', tag: 'NNAB' },
  NNS: { name: 'plural noun', parent: 'noun', tag: 'NNS' },
  NNO: { name: 'possessive noun', parent: 'noun', tag: 'NNO' },
  NNG: { name: 'gerund noun', parent: 'noun', tag: 'NNG' },
  PP: { name: 'possessive pronoun', parent: 'noun', tag: 'PP' },
  PRP: { name: 'personal pronoun', parent: 'noun', tag: 'PRP' },
  FW: { name: 'foreign word', parent: 'glue', tag: 'FW' },
  CD: { name: 'cardinal value, generic', parent: 'value', tag: 'CD' },
  DA: { name: 'date', parent: 'value', tag: 'DA' },
  NU: { name: 'number', parent: 'value', tag: 'NU' },
  IN: { name: 'preposition', parent: 'glue', tag: 'IN' },
  MD: { name: 'modal verb', parent: 'verb', tag: 'MD' },
  CC: { name: 'co-ordating conjunction', parent: 'glue', tag: 'CC' },
  DT: { name: 'determiner', parent: 'glue', tag: 'DT' },
  UH: { name: 'interjection', parent: 'glue', tag: 'UH' },
  EX: { name: 'existential there', parent: 'glue', tag: 'EX' },
  getTense: function (tense) {
			if (!zip.tense.hasOwnProperty(tense)) {
				return {tag: null};
			}
			return zip.tense[tense];
		},
  _tense: 
   { infinitive: { en: 'infinitive', de: 'Infinitiv', tag: 'VBP', base: 1 },
     present: { en: 'present', de: 'Präsenz', tag: 'VBZ', base: 1 },
     past: { en: 'past', de: 'Imperfekt', tag: 'VBD', base: 1 },
     gerund: { en: 'gerund', de: 'Gerundium', tag: 'VBG', base: 1 },
     doer: { en: 'doer', de: 'Ausführer', tag: 'NNA' },
     participle: { en: 'participle', de: 'Partizip', tag: 'VBN' },
     future: { en: 'future', de: 'Futur', tag: 'VBF' },
     futurePerfect: { en: 'future perfect', de: 'Futur-Perfekt', tag: 'VB' },
     perfect: { en: 'perfect', de: 'Perfekt', tag: 'VB' },
     pluperfect: { en: 'pluperfect', de: 'Plusquamperfekt', tag: 'VB' } },
  _tenses: 
   [ 'infinitive',
     'present',
     'past',
     'gerund',
     'doer',
     'participle',
     'future',
     'futurePerfect',
     'perfect',
     'pluperfect' ],
  _baseTense: 
   { infinitive: { en: 'infinitive', de: 'Infinitiv', tag: 'VBP', base: 1 },
     present: { en: 'present', de: 'Präsenz', tag: 'VBZ', base: 1 },
     past: { en: 'past', de: 'Imperfekt', tag: 'VBD', base: 1 },
     gerund: { en: 'gerund', de: 'Gerundium', tag: 'VBG', base: 1 } },
  _baseTenses: [ 'infinitive', 'present', 'past', 'gerund' ] }
export = zip;