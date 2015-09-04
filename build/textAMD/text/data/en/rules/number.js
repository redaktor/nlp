define(["require", "exports"], function (require, exports) {
    zip = { negative: /^(-|minus|negative)[\s\-]/i,
        factors: [{ reg: /\b(a)?(one-)?(\s)?half([\s\-])?(of\s)?/i, mult: 0.5 },
            { reg: /\b(a)?(one-)?(\s)?quarter([\s\-])?(of\s)?/i,
                mult: 0.25 }],
        ordinals: /(?:\w*)(st|nd|rd|th)(?: |$)/i };
    return zip;
});
