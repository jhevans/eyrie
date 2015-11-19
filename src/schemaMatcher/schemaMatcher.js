window.schemaMatcher = (function () {
    'use strict';

    function deepCompare(actual, expected, selectorPath){
        // for each key, value
        // if value is a function
        // return value(element.find(key))
        // result = deepCompare(element.find(key), value, selectorPath)
        // results.add(result)
    }

    return {
        toMatchSchema: function () {
            return {
                compare: function (actual, expected) {
                    var pass,
                        message = "no message";

                    pass = false;
                    // results = deepCompare(actual, expected, "")
                    // result = compileResults(results)
                    // return result


                    return {
                        pass: pass,
                        message: message
                    };
                },
                negativeCompare: function(actual, expected){
                    var pass,
                        message = "no message";

                    pass = false;

                    return {
                        pass: pass,
                        message: message
                    };
                }
            }
        }
    };
})();