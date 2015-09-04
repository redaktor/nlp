/**
 * data module, autogenerated by grunt. <br>
 * change and contribute to dictionaryRules <br>
 *  <br>
 * regex rules and transforms for adverbs <br>
 *  <br>
 * @readonly
 * @module data/en/rules/adverb
 */
define(["require", "exports"], function (require, exports) {
    zip = { which: { superlative: { matches: /..est$/, tag: 'RBS' },
            comparative: { matches: /..er$/, tag: 'RBR' } },
        adjective: { to: [[/bly$/i, 'ble'],
                [/gically$/i, 'gical'],
                [/([rsdh])ically$/i, '$1ical'],
                [/ically$/i, 'ic'],
                [/uly$/i, 'ue'],
                [/ily$/i, 'y'],
                [/(.{3})ly$/i, '$1']] } };
    return zip;
});