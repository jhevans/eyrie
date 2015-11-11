window.jQMatchers = (function () {
    'use strict';
    function doesExist(actual) {
        return actual.length > 0;
    }

    return {
        toExist: function () {
            return {
                compare: function (actual) {
                    var pass,
                        message = "Expected element to exist";

                    pass = doesExist(actual);

                    return {
                        pass: pass,
                        message: message
                    };
                },
                negativeCompare: function(actual){
                    var pass,
                        message = "Expected element not to exist";

                    pass = !doesExist(actual);

                    return {
                        pass: pass,
                        message: message
                    }
                }
            }
        }
    };
})();