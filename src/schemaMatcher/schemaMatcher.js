window.schemaMatcher = (function () {
    'use strict';

    return {
        toMatchSchema: function () {
            return {
                compare: function (actual, expected) {
                    var pass,
                        message = "no message";

                    pass = false;
                    // for each key, value
                    // if value is a function
                    // return value(element.find(key))
                    // result = compare(element.find(key), value)
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