/**
 * predefined default OPTIONS <br>
 * for mixin in modules <br>
 * WIP <br>
 * @module src/_options
 */
// TODO - jsDOC
export = {
	// defaults to 30 most spoken and a few selected here ...
	language: {
		detect: [
		  'cmn', 'es', 'en', 'hi', 'ar', 'pt', 'bn', 'ru', 'ja', 'pa',
			'de', 'jv', 'id', 'te', 'vi', 'ko', 'fr', 'mr', 'ta', 'ur',
			'tr', 'it', 'th', 'gu', 'nan', 'fa', 'pl', 'uk', 'ro', 'nl',
			'hu', 'el', 'sv', 'da', 'fi', 'ca'
		],
		fallback: 'en',
		// recommended:
		minLength: 25, 	// minimum string.length for detection
		minScore: 0.8, 	// minimum detection score
		minDist: 0.3 		// minimum distance between one and two
	},
	ngram: {
		min_count: 1,
		max_size: 5
	},
	normalize: {
		percentage: 50
	},
	cache: {
		size: 128,
		db: false
	},
	pos: {
		combine: true
	},
	numbers: {
		// TODO
	},
	dates: {
		strict: false,
		// provide a valid JS Date or JSON Date to parse relative dates too
		now: null,
		// optional date locale can be set here,
		// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters
		locale: false,
		// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Using_options
		localized: {
			timeZone: 'UTC',
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}
	}
};
