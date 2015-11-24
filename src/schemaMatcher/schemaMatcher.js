var schemaMatcher = (function (compileMessages, Matcher) {
    'use strict';

    var EXPECTED_PREFIX = "Element does not match schema:\n";

    return {
        toMatchSchema: function () {
            return {
                compare: function (jQActual, expectedSchema) {
                    var matcher = new Matcher(jQActual, expectedSchema, '', false);
                    var result = matcher.getMatchResult();
                    result.message = compileMessages(result.results, EXPECTED_PREFIX);
                    return result
                }
            }
        },
        toMatchSchemaExactly: function () {
            return {
                compare: function (jQActual, expectedSchema) {
                    var matcher = new Matcher(jQActual, expectedSchema, '', true);
                    var result = matcher.getMatchResult();
                    result.message = compileMessages(result.results, EXPECTED_PREFIX);
                    return result
                }
            }
        }
    };
});

var Matcher = (function (_) {

    function Matcher(element, schema, path, strict) {
        this.element = element;
        this.schema = schema;
        this.path = path;
        this.strict = strict;
    }

    Matcher.prototype.getMatchResult = function () {
        var result;
        if (_.isFunction(this.schema)) {
            result = this.schema(this.element, this.path);
        } else {
            result = this.recursiveCompare();
        }
        return result;
    };

    Matcher.prototype.recursiveCompare = function () {
        var message = 'no message',
            results = [],
            result;

        var path = this.path ? this.path + ' ' : '';

        var unexpectedMatcher = new UnexpectedMatcher(this.element);

        _.keys(this.schema)
            .forEach(function (selector) {
                var matcher = new Matcher(this.element.find(selector), this.schema[selector], path + selector, this.strict);
                result = matcher.getMatchResult();
                results.push(result);
                unexpectedMatcher.allow(selector);
            }.bind(this));

        if (this.strict && unexpectedMatcher.hasUnexpected()) {
            results.push(unexpectedMatcher.getUnexpectedResult());
        }

        result = {
            pass: allPass(results),
            message: compileMessages(results),
            results: results
        };

        return result;

    };

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

    function allPass(results) {
        return _.all(results, function (result) {
            return result.pass;
        });
    }

    return Matcher;
})(window._);

window.schemaMatcher = schemaMatcher(window.compileMessages, Matcher);
