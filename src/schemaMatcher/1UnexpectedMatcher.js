// TODO: Introduce dependency management urgently! then this file can be renamed to UnexpectedMatcher.js
window.UnexpectedMatcher = (function () {
    'use strict';

    function UnexpectedMatcher(jQActual) {
        this.unexpected = jQActual.children()
    }

    UnexpectedMatcher.prototype.allow = function (selector) {
        this.unexpected = this.unexpected.not(selector);
    };

    UnexpectedMatcher.prototype.hasUnexpected = function () {
        return this.unexpected.length > 0;
    };

    UnexpectedMatcher.prototype.getUnexpectedMessage = function () {
        return "Unexpected Element: '." + this.unexpected.attr('class') + "'"
    };

    UnexpectedMatcher.prototype.getUnexpectedResult = function () {
        return {
            pass: false,
            message: this.getUnexpectedMessage()
        }
    };

    return UnexpectedMatcher;
})();