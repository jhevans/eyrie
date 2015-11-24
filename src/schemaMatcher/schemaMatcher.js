var schemaMatcher = (function (compileMessages, _) {
    'use strict';

    var EXPECTED_PREFIX = "Element does not match schema:\n";


    function Matcher(element, schema, path, strict){
        this.element = element;
        this.schema = schema;
        this.path = path;
        this.strict = strict;
    }

    Matcher.prototype.getMatchResult = function(){
        var result;
        if (_.isFunction(this.schema)) {
            result = this.schema(this.element, this.path);
        } else {
            result = compare(this.element, this.schema, this.path + " ", this.strict);
        }
        return result;
    };

    function UnexpectedMatcher(jQActual){
        this.unexpected = jQActual.children()
    }

    UnexpectedMatcher.prototype.allow = function (selector){
        this.unexpected = this.unexpected.not(selector);
    };

    UnexpectedMatcher.prototype.hasUnexpected = function(){
        return this.unexpected.length  > 0;
    };

    UnexpectedMatcher.prototype.getUnexpectedMessage = function(){
        return "Unexpected Element: '." + this.unexpected.attr('class') + "'"
    };

    UnexpectedMatcher.prototype.getUnexpectedResult = function(){
        return {
            pass: false,
            message: this.getUnexpectedMessage()
        }
    };

    return {
        toMatchSchema: function () {
            return {
                compare: function(jQActual, expectedSchema){
                    var result = compare(jQActual, expectedSchema, '', false);
                    result.message = compileMessages(result.results, EXPECTED_PREFIX);
                    return result
                }
            }
        },
        toMatchSchemaExactly: function(){
            return {
                compare: function(jQActual, expectedSchema){
                    var result = compare(jQActual, expectedSchema, '', true);
                    result.message = compileMessages(result.results, EXPECTED_PREFIX);
                    return result
                }
            }
        }
    };

    function compare(jQActual, expectedSchema, path, strict) {
        var message = "no message",
            results = [],
            selector,
            result;

        var unexpectedMatcher = new UnexpectedMatcher(jQActual);

        for(selector in expectedSchema){
            if(expectedSchema.hasOwnProperty(selector)){
                var currentElement = jQActual.find(selector);
                var currentSchema = expectedSchema[selector];
                var selectorPath = path + selector;
                var matcher = new Matcher(currentElement, currentSchema, selectorPath, strict);
                result = matcher.getMatchResult();
                results.push(result);
                unexpectedMatcher.allow(selector);
            }
        }

        if (strict && unexpectedMatcher.hasUnexpected()) {
            results.push(unexpectedMatcher.getUnexpectedResult());
        }

        result = {
            pass: allPass(results),
            message: compileMessages(results),
            results: results
        };

        return result;
    }


    function allPass(results){
        return _.all(results, function(result){
            return result.pass;
        });
    }
});
window.schemaMatcher = schemaMatcher(window.compileMessages, window._);