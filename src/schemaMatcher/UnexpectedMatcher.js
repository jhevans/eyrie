export default class UnexpectedMatcher {
    constructor(jQActual) {
        this.unexpected = jQActual.children()
    }

    allow(selector) {
        this.unexpected = this.unexpected.not(selector);
    };

    hasUnexpected () {
        return this.unexpected.length > 0;
    };

    getUnexpectedMessage () {
        return "Unexpected Element: '." + this.unexpected.attr('class') + "'"
    };

    getUnexpectedResult () {
        return {
            pass: false,
            message: this.getUnexpectedMessage()
        }
    };
};