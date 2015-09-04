/**
 * predefined default OPTIONS <br>
 * for mixin in modules <br>
 * WIP <br>
 * @module src/_options
 */
define(["require", "exports"], function (require, exports) {
    return {
        cache: {
            size: 256,
            db: false
        },
        pos: {
            combine: true
        },
        numbers: {},
        dates: {
            strict: false,
            // provide a valid JS Date or JSON Date to parse relative dates too
            now: null,
            // optional date locale can be set here,
            // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters
            locale: false,
            // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Using_options
            localized: { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        },
        ngram: {
            min_count: 1,
            max_size: 5
        },
        normalize: {
            percentage: 50
        }
    };
});
