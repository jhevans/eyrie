window.schemaMatcher = (function () {
    'use strict';

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
                            result = matcher(jQActual.find(selector));
                            results.push(result);
                        }
                    }
                    return results[0];
                }
            }
        }
    };
})();