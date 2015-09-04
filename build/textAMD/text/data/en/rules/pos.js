define(["require", "exports", "../../../nlp/_"], function (require, exports, _) {
    zip = { replacing: { prefix: { matches: /^(over|under|out|-|un|re|en).{4}/i,
                replaces: /^(over|under|out|.*?-|un|re|en)/i,
                replacer: '' } },
        words: { JJ: [/.[cts]hy$/i,
                /.[st]ty$/i,
                /.[gk]y$/i,
                /.some$/i,
                /.[nrtumcd]al$/i,
                /.que$/i,
                /.[tnl]ary$/i,
                /.lar$/i,
                /[bszmp]{2}y/i,
                /.[icldtgrv]ent$/i,
                /.[oe]ry$/i,
                /.[lsrnpb]ian$/i,
                /.[^aeiou]ial$/i,
                /.[^aeiou]eal$/i,
                /.[vrl]id$/i,
                /.ike$/i,
                /.rmy$/i,
                /.azy$/i,
                /.bound$/i,
                /.oid$/i,
                /.rough$/i,
                /.mum$/i,
                /.ean$/i,
                /.[ia]sed$/i,
                /.llen$/i,
                /.ried$/i,
                /.gone$/i,
                /.made$/i,
                /.[pdltrkvyns]ing$/i,
                /.ous$/i,
                /.[gt]led$/i,
                /[aeiou].*ist$/i,
                /[a-z]*\\-[a-z]*\\-/i,
                /.[^aeiou][ei]al$/i,
                /.ffy$/i,
                /.[^aeiou]ic$/i,
                /.(gg|bb|zz)ly$/i,
                /.[aeiou]my$/i,
                /.[aeiou]ble$/i,
                /.[^aeiou]ful$/i,
                /.[^aeiou]ish$/i,
                /..ic$/i,
                /[aeiou][^aeiou]id$/i,
                /.[^aeiou]ish$/i,
                /.[^aeiou]ive$/i,
                /[ea]{2}zy$/i],
            VB: [/.[lnr]ize$/i,
                /.fies$/i,
                /^(un|de|re)\\-[a-z]../i,
                /.zes$/i,
                /.ends$/i,
                /.ify$/i,
                /.ens$/i,
                /.oses$/i,
                /.ishes$/i,
                /.ects$/i,
                /.bles$/i,
                /.pose$/i,
                /.tized$/i,
                /.gate$/i,
                /.nes$/i,
                /.lked$/i,
                /.'n$/i,
                /.'t$/i,
                /.tches$/i,
                /.ize$/i,
                /.[^aeiou]ise$/i,
                /.[aeiou]te$/i],
            JJS: [/.[di]est$/i],
            VBZ: [/.[rln]ates$/i],
            RB: [/[rdntkdhs]ly$/i,
                /.wards$/i,
                /.where$/i,
                /.fore$/i,
                /.less$/i,
                /. so$/i,
                /.fully$/i],
            JJR: [/.[ilk]er$/i],
            NN: [/.rol$/i,
                /.tors$/i,
                /.vice$/i,
                /.ices$/i,
                /.ions$/i,
                /.ances$/i,
                /.tions$/i,
                /.tures$/i,
                /.ports$/i,
                /.ints$/i,
                /.ea$/i,
                /[aeiou][pns]er$/i,
                /.ia$/i,
                /.sis$/i,
                /.[aeiou]na$/i,
                /.[^aeiou]ity$/i,
                /.[^aeiou]ium$/i,
                /.[^aeiou]ica$/i,
                /[aeiou][^aeiou]is$/i,
                /[^aeiou]ard$/i,
                /[^aeiou]ism$/i,
                /.[^aeiou]ity$/i,
                /.[^aeiou]ium$/i,
                /.[lstrn]us$/i],
            CD: [/.teen(th)?$/i,
                /.tieth$/i,
                /^-?[0-9]+(.[0-9]+)?$/i,
                /^https?:?\/\/[a-z0-9]/i,
                /^www.[a-z0-9]/i],
            MD: [/.*ould$/i, /.'ll$/i],
            NNO: [/[a-z]'s$/i],
            CP: [/.'re$/i] },
        strongDeterminers: { the: 1, a: 1, an: 1 },
        ambiguousContractions: function (a, i) {
            // look for the next verb, and if it's past-tense (he's walked -> he has walked)
            for (var j = i + 1; j < a.length; j++) {
                if (a[j] && a[j].pos && a[j].pos.tag == 'VBD') {
                    return 'has';
                }
            }
            return 'is';
        },
        set: { ed: { tag: 'VB', _if: function (t, n, l) { return (t.pos_reason !== 'lexicon' && t.normalised.match(/.ed$/)); } } },
        merge: { NN_NN: { _if: function (t, a, i) { return (t.pos.tag === a[i + 1].pos.tag && !t.punctuated && t.noun_capital == a[i + 1].noun_capital); } },
            CD_CD: { _if: function (t, a, i) { return (t.pos.tag === 'CD' && a[i + 1].pos.tag === 'CD'); } },
            CD_w_CD: { _if: function (t, a, i) { return (t.pos.tag === 'CD' && (a[i + 1].normalised === 'and' || a[i + 1].normalised === 'the') && a[i + 2] && a[i + 2].pos.tag === 'CD'); } },
            NNAB_NN: { _if: function (t, a, i) { return ((t.pos.tag === 'NNAB' && a[i + 1].pos.parent === 'noun') || (t.pos.parent === 'noun' && a[i + 1].pos.tag === 'NNAB')); } },
            will_VB: { _if: function (t, a, i) { return (t.normalised === 'will' && a[i + 1].pos.parent === 'verb'); } },
            NNP_NN: { tag: 'NNP', set: 1, _if: function (t, a, i) { return ((t.pos.tag === 'NNP' && a[i + 1].pos.tag === 'NN') || (t.pos.tag === 'NN' && a[i + 1].pos.tag === 'NNP')); } },
            DT1: { merge: 2, _if: function (t, a, i) { return (t.pos.tag == 'NN' && t.noun_capital && (a[i + 1].normalised == 'of' || a[i + 1].normalised == 'and') && a[i + 2] && a[i + 2].noun_capital); } },
            DT2: { merge: 3, _if: function (t, a, i) { return (t.noun_capital && a[i + 1].normalised == 'of' && a[i + 2] && a[i + 2].pos.tag == 'DT' && a[i + 3] && a[i + 3].noun_capital); } } },
        special: { mayIsDate: { tag: 'CD', _if: function (t, n, l) { return (_.has(t.normalised, ['march', 'april', 'may']) && ((n && n.pos.tag == 'CD') || (l && l.pos.tag == 'CD'))); } },
            beforeModal: { tag: 'NN', _if: function (t, n, l) { return (n && !_.has(t.pos.parent, ['noun', 'glue']) && n.pos.tag === 'MD'); } },
            afterWill: { tag: 'VB', _if: function (t, n, l) { return (l && l.normalised == 'will' && !l.punctuated && t.pos.parent == 'noun' && !_.has(t.pos.tag, ['PRP', 'PP'])); } },
            afterI: { tag: 'VB', _if: function (t, n, l) { return (l && l.normalised == 'i' && !l.punctuated && t.pos.parent == 'noun'); } },
            afterAdverb: { tag: 'VB', _if: function (t, n, l) { return (l && t.pos.parent === 'noun' && t.pos.tag !== 'PRP' && t.pos.tag !== 'PP' && l.pos.tag === 'RB' && !l.start); } },
            consecutiveAdjectives: { tag: 'RB', _if: function (t, n, l) { return (n && t.pos.parent === 'adjective' && n.pos.parent === 'adjective' && !t.punctuated); } },
            determinerVerb: { tag: 'NN', _if: function (t, n, l) { return (l && t.pos.parent === 'verb' && _.has(l.pos.normalised, ['the', 'a', 'an']) && t.pos.tag != 'CP'); } },
            copulaAdjective: { tag: 'JJ', _if: function (t, n, l) { return (l && l.pos.tag === 'CP' && !_.has(t.pos.tag, ['DT', 'RB', 'PRP']) && !_.has(t.pos.parent, ['adjective', 'value'])); } },
            copulaAdverbAdjective: { tag: 'JJ', set: 1, _if: function (t, n, l) { return (l && n && l.pos.tag === 'CP' && t.pos.tag === 'RB' && n.pos.parent === 'verb'); } },
            beforeHimHerIt: { tag: 'VB', _if: function (t, n, l) { return (n && n.pos.tag == 'PRP' && t.pos.tag !== 'PP' && t.pos.parent == 'noun' && !t.punctuated); } },
            determinerAdjectiveNoun: { tag: 'JJ', _if: function (t, n, l) { return (l && n && l.pos.tag === 'DT' && n.pos.parent === 'noun' && t.pos.parent === 'verb'); } },
            adjectiveAfterPronoun: { tag: 'VB', _if: function (t, n, l) { return (l && l.pos.tag === 'PRP' && t.pos.tag === 'JJ'); } } },
        wordsMatch: {},
        lexiReplace: {} };
    return zip;
});
