// TODO: implement di
//into('schemaMatcher', schemaMatcher).inject('compileMessages');

window.schemaMatcher = (function (compileMessages, _) {
    'use strict';

    function allPass(results){
        return _.all(results, function(result){
            return result.pass;
        });
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
})(window.compileMessages, window._);