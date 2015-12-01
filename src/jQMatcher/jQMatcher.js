export function jQMatchers() {
    'use strict';
    function doesExist(actual) {
        return actual.length > 0;
    }

    function getMessage(description) {
        return description ? "Expected element '" + description + "' to exist" : "Expected element to exist";
    }

    function getInverseMessage(description) {
        return description ? "Expected element '" + description + "' not to exist" : "Expected element not to exist";
    }

    return {
        toExist: function () {
            return {
                compare: function (actual, description) {
                    var pass,
                        message = getMessage(description);

                    pass = doesExist(actual);

                    return {
                        pass: pass,
                        message: message
                    };
                },
                negativeCompare: function (actual, description) {
                    var pass,
                        message = getInverseMessage(description);

                    pass = !doesExist(actual);

                    return {
                        pass: pass,
                        message: message
                    }
                }
            }
        }
    };
}