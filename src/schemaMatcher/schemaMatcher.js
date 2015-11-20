var schemaMatcher = (function (compileMessages, _) {
    'use strict';

    var EXPECTED_PREFIX = "Element does not match schema:\n";

    return {
        toMatchSchema: function () {
            return {
                compare: function(jQActual, expectedSchema){
                    var result = compare(jQActual, expectedSchema);
                    result.message = compileMessages(result.results, EXPECTED_PREFIX);
                    return result
                }
            }
        }
    };

    function compare(jQActual, expectedSchema, path) {
        var message = "no message",
            results = [],
            selector,
            matcher,
            result;

        for(selector in expectedSchema){
            if(expectedSchema.hasOwnProperty(selector)){
                matcher = expectedSchema[selector];
                if (_.isFunction(matcher)) {
                    result = matcher(jQActual.find(selector), (path || "") + selector);
                } else {
                    result = compare(jQActual.find(selector), matcher, selector + " ");
                }
                results.push(result);
            }
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