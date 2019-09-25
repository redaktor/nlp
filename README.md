[![GitHub version](https://badge.fury.io/gh/redaktor%2Fnlp.svg)](http://badge.fury.io/gh/redaktor%2Fnlp)
[![slack](https://raw.githubusercontent.com/redaktor/style/master/assets/readme/shields/slackInvite.png)](https://redaktor-slackin.herokuapp.com)
<br><br>
[![logo](https://raw.githubusercontent.com/redaktor/style/master/assets/readme/logo.png)](#)
**redaktor/text/nlp**<br>
Natural-Language-Processing<br>
[![-](https://raw.githubusercontent.com/redaktor/style/master/assets/readme/lineBlue.png)](#)<br>

# redaktor-text-nlp [wip]

#No training, no prolog. i18n TypeScript
a Natural Language Processing and Text Manipulation library *for Javascript*,<br> small-enough for the browser, and quick-enough to run on keypress and awsome on NodeJS :two_men_holding_hands:

and a toolkit to develop Natural Language Processing and Text Manipulation in all the languages<br>
NOTE: This is a Work In Progress which we started a while ago for a CMS based on ActivityPub –
not all API methods are implemented here and neither are the dictionaries (coming soon)


## Features

```javascript
var nlp = new NLP();
nlp.set('some text');
nlp.pluralize().text(); 
// --> "some texts"
nlp.pos('she sells seashells by the seashore').to_past().text()
//she sold seashells by the seashore
/// [or chain them ...]
```

## How do I use this package?


## API

###Sentence methods
```javascript
  var s= nlp.pos("Tony Danza is dancing").sentences[0]

  s.tense()
  //present

  s.text()
  //"Tony Danza is dancing"

  s.to_past().text()
  //Tony Danza was dancing

  s.to_present().text()
  //Tony Danza is dancing

  s.to_future().text()
  //Tony Danza will be dancing

  s.negate().text()
  //Tony Danza is not dancing

  s.tags()
  //[ 'NNP', 'CP', 'VB' ]

  s.entities()
  //[{text:"Tony Danza"...}]

  s.people()
  //[{text:"Tony Danza"...}]

  s.nouns()
  //[{text:"Tony Danza"...}]

  s.adjectives()
  //[]

  s.adverbs()
  //[]

  s.verbs()
  //[{text:"dancing"}]

  s.values()
  //[]
````

###Noun methods:
```javascript
nlp.noun("earthquakes").singularize()
//earthquake

nlp.noun("earthquake").pluralize()
//earthquakes

nlp.noun('veggie burger').is_plural
//false

nlp.noun('tony danza').is_person
//true
nlp.noun('Tony J. Danza elementary school').is_person
//false
nlp.noun('SS Tony danza').is_person
//false

nlp.noun('hour').article()
//an

nlp.inflect('mayors of toronto'))
//{ plural: 'mayors of toronto', singular: 'mayor of toronto' }
```

###Verb methods:
```javascript
nlp.verb("walked").conjugate()
//{ infinitive: 'walk',
//  present: 'walks',
//  past: 'walked',
//  gerund: 'walking'}
nlp.verb('swimming').to_past()
//swam
nlp.verb('swimming').to_present()
//swims
nlp.verb('swimming').to_future()
//will swim
```
###Adjective methods:
```javascript
nlp.adjective("quick").conjugate()
//  { comparative: 'quicker',
//    superlative: 'quickest',
//    adverb: 'quickly',
//    noun: 'quickness'}
```
###Adverb methods
```javascript
nlp.adverb("quickly").conjugate()
//  { adjective: 'quick'}
```



## Part-of-speech tagging
86% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/)
```javascript
nlp.pos("Tony Hawk walked quickly to the store.").tags()
// [ [ 'NNP', 'VBD', 'RB', 'IN', 'DT', 'NN' ] ]

nlp.pos("they would swim").tags()
// [ [ 'PRP', 'MD', 'VBP' ] ]
nlp.pos("the obviously good swim").tags()
// [ [ 'DT', 'RB', 'JJ', 'NN' ] ]
```

## Named-Entity recognition
```javascript
nlp.spot("joe carter loves toronto")
// [{text:"joe carter"...}, {text:"toronto"...}]
```

## Sentence segmentation
```javascript
nlp.sentences("Hi Dr. Miller the price is 4.59 for the U.C.L.A. Ph.Ds.").length
//1

nlp.tokenize("she sells sea-shells").length
//3
```

## Syllable hyphenization
70% on the [moby hyphenization corpus](http://www.gutenberg.org/dirs/etext02/mhyph10.zip)  0.5k
```javascript
nlp.syllables("hamburger")
//[ 'ham', 'bur', 'ger' ]
```

## US-UK Localization
```javascript
nlp.americanize("favourite")
//favorite
nlp.britishize("synthesized")
//synthesised
```
## N-gram
```javascript
str= "She sells seashells by the seashore. The shells she sells are surely seashells."
nlp.ngram(str, {min_count:1, max_size:5})
// [{ word: 'she sells', count: 2, size: 2 },
// ...
options.min_count // throws away seldom-repeated grams. defaults to 1
options.max_size  // prevents the result from becoming gigantic. defaults to 5
```
### Date parsing
```javascript
nlp.value("I married April for the 2nd time on June 5th 1998 ").date()
// { text: 'June 5th 1998',
//   from: { year: '1998', month: '06', day: '05' },
//   to: {} }
```
### Number parsing
```javascript
nlp.value("two thousand five hundred and sixty").number()
//2560
nlp.value("ten and a half million").number()
//15000000
```
### Unicode Normalisation
a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
```javascript
nlp.normalize("Björk")
//Bjork
```
and for fun,
```javascript
nlp.denormalize("The quick brown fox jumps over the lazy dog", {percentage:50})
// The ɋӈїck brown fox juӎÞs over tӊe laζy dog
```

## How do I contribute?

We appreciate your interest!
Please see our [Contributing Guidelines](./contributing.md#readme).<br>
Check the [Dojo Guidelines Repository](https://github.com/dojo/guidelines#readme) for the
general Contributing Guidelines and Style Guide.

## Testing

Test cases MUST be written using [Intern](https://theintern.github.io) using the Object test interface and Assert assertion interface.

90% branch coverage MUST be provided for all code submitted to this repository, as reported by istanbul’s combined coverage results for all supported platforms.

## Licensing information

TODO: If third-party code was used to write this library, make a list of project names and licenses here

* [Third-party lib one](https//github.com/foo/bar) ([New BSD](http://opensource.org/licenses/BSD-3-Clause))

© 2014–2015 redaktor foundation & contributors. [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
[![-](https://raw.githubusercontent.com/redaktor/style/master/assets/readme/lineBlue.png)](#)
**appendix**
## POS word tags

| Tag  | Description                               | Example                    |
|-----:|-------------------------------------------|----------------------------|
|```Verb```|||
| VB   | verb, generic (base form)                 | think                      |
| VBZ  | verb, 3rd person singular present         | she thinks                 |
| VBP  | verb, non-3rd person singular present     | I think                    |
| VBD  | verb, past tense                          | they thought               |
| VBN  | verb, past participle                     | a sunken ship              |
| VBG  | verb, gerund or present participle        | thinking is fun            |
|```Noun```|||
| NN   | noun, singular or mass                    | tiger, chair, laughter     |
| NNS  | noun, plural                              | tigers, chairs, insects    |
| NNP  | noun, proper singular                     | Germany, God, Alice        |
| NNPS | noun, proper plural                       | we met two Christmases ago |
| PRP  | pronoun, personal                         | me, you, it                |
| PRP$ | pronoun, possessive                       | my, your, our              |
|```Adjective```|||
| JJ   | adjective, generic (base form)            | nice, easy                 |
| JJR  | adjective, comparative                    | nicer, easier              |
| JJS  | adjective, superlative                    | nicest, easiest            |
|```Adverb```|||
| RB   | adverb, generic (base form)               | extremely, loudly, hard    |
| RBR  | adverb, comparative                       | better                     |
| RBS  | adverb, superlative                       | best                       |
| RP   | adverb, particle                          | about, off, up             |
|```Glue```|||
| CC   | conjunction, coordinating                 | and, or, but               |
| DT   | determiner                                | the, a, these              |
| EX   | existential there                         | there were six boys        |
| FW   | foreign word                              | mais                       |
| IN   | conjunction, subordinating or preposition | of, on, before, unless     |
| MD   | verb, modal auxillary                     | may, should                |
| UH   | interjection                              | oh, oops, gosh             |
|```Value```|||
| CD   | cardinal number                           | five, three, 13%           |
| CDV  | cardinal value <br>(with unit of measurement or currency) | 220 km/h, 11€ |
| DA   | date                                      | june 5th, 1998             |
|```Other```|||
| LS   | list item marker                          |                            |
| SYM  | symbol                                    | %                          |
| .    | punctuation mark, sentence closer         | .;?*                       |
| ,    | punctuation mark, comma                   | ,                          |
| :    | punctuation mark, colon                   | :                          |
| (    | contextual separator, left paren          | (                          |
| )    | contextual separator, right paren         | )                          |
|:construction: ```TODO```|*not implemented yet properly*:||
| TO   | infinitival to                            | what to do?                |
| WDT  | wh-determiner                             | which, whatever, whichever |
| WP   | wh-pronoun, personal                      | what, who, whom            |
| WP$  | wh-pronoun, possessive                    | whose, whosever            |
| WRB  | wh-adverb                                 | where, when                |
| PDT  | predeterminer                             | both his children          |

## POS phrase tags (chunks of words)
| Tag  | Description               | Words            | Example          | %  |
|-----:|---------------------------|------------------|------------------|---:|
| NP   | noun phrase               | DT+RB+JJ+NN + PR | the strange bird | 51 |
| PP   | prepositional phrase      | TO+IN            | in between       | 19 |
| VP   | verb phrase               | RB+MD+VB         | was looking      | 9  |
| ADVP | adverb phrase             | RB               | also             | 6  |
| ADJP | adjective phrase          | CC+RB+JJ         | warm and cosy    | 3  |
| SBAR | subordinating conjunction | IN               | whether or not   | 3  |
| PRT  | particle                  | RP               | up the stairs    | 1  |
| INTJ | interjection              | UH               | hello            | < 1|
