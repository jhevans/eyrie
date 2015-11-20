window.schemaMatcher = (function () {
    'use strict';

    function allPass(results){
        return _.all(results, function(result){
            return result.pass;
        });
    }

    function compileMessages(results){
        var message = "Element does not match schema:\n";
        results.forEach(function(result){
            if (!result.pass){
                message += result.message + "\n";
            }
        });
        return message;
    }

    return {
        toMatchSchema: function () {
            return {
                compare: function (jQActual, expectedSchema) {
                    var message = "no message",
                        results = [],
                        selector,
                        matcher,
                        result;

                    for(selector in expectedSchema){
                        if(expectedSchema.hasOwnProperty(selector)){
                            matcher = expectedSchema[selector];
                            result = matcher(jQActual.find(selector), selector);
                            results.push(result);
                        }
                    }
                    result = {
                        pass: allPass(results),
                        message: compileMessages(results)
                    };

                    return result;
                }
            }
        }
    };
})();