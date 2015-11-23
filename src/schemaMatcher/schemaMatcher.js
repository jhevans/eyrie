var schemaMatcher = (function (compileMessages, _) {
    'use strict';

    var EXPECTED_PREFIX = "Element does not match schema:\n";

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
            matcher,
            result;

        var unexpected = jQActual.children();

        for(selector in expectedSchema){
            if(expectedSchema.hasOwnProperty(selector)){
                matcher = expectedSchema[selector];
                if (_.isFunction(matcher)) {
                    // check if selector matches
                    var expected = jQActual.find(selector);
                    result = matcher(expected, path + selector);
                    // check if any extra elements were present
                } else {
                    result = compare(jQActual.find(selector), matcher, path + selector + " ", strict);
                }
                unexpected = unexpected.not(selector);
                results.push(result);
            }
        }

        if (strict && unexpected.length > 0) {
            results.push({
                pass: false,
                message: "Unexpected Element: '." + unexpected.attr('class') + "'"
            });
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