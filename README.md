[![GitHub version](https://badge.fury.io/gh/redaktor%2Fnlp.svg)](http://badge.fury.io/gh/redaktor%2Fnlp)
[![slack](https://raw.githubusercontent.com/redaktor/style/master/assets/readme/shields/slackInvite.png)](https://redaktor-slackin.herokuapp.com)
<br><br>
[![logo](https://raw.githubusercontent.com/redaktor/style/master/assets/readme/logo.png)](#)
**redaktor/text/nlp**<br>
Natural-Language-Processing<br>
[![-](https://raw.githubusercontent.com/redaktor/style/master/assets/readme/lineBlue.png)](#)<br>

# redaktor-text-nlp [wip]

TODO: Replace with a description of this package <br>
See [this fork](https://github.com/redaktor/nlp_compromise)
and [the status wiki page](https://github.com/redaktor/nlp/wiki/development-status)
to get an idea  ...

## Features

TODO: Add sections on features of this package

## How do I use this package?

TODO: Add appropriate usage and instruction guidelines
### To run:
```
npm install
grunt
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
