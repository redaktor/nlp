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
|:construction: ```TODO```|*not implemented yet properly*:||
| TO   | infinitival to                            | what to do?                |
| WDT  | wh-determiner                             | which, whatever, whichever |
| WP   | wh-pronoun, personal                      | what, who, whom            |
| WP$  | wh-pronoun, possessive                    | whose, whosever            |
| WRB  | wh-adverb                                 | where, when                |
| PDT  | predeterminer                             | both his children          |
|```Value```|||
| CD   | cardinal number                           | five, three, 13%           |
| CDV  | cardinal value <br>(with unit of measurement or currency) | 220 km/h, 11€ |
| DA   | date                                      | june 5th, 1998             |
|```other```|||
| LS   | list item marker                          |                            |
| SYM  | symbol                                    | %                          |
| .    | punctuation mark, sentence closer         | .;?*                       |
| ,    | punctuation mark, comma                   | ,                          |
| :    | punctuation mark, colon                   | :                          |
| (    | contextual separator, left paren          | (                          |
| )    | contextual separator, right paren         | )                          |

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
