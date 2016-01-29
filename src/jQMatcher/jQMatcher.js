export default function jQMatchers() {
    'use strict';

    return {
        toExist: function () {
            return {
                compare: function (actual, description) {
                    var pass,
                        message = description ? "Expected element '" + description + "' to exist" : "Expected element to exist";
                    pass = actual.length > 0;
                    return {
                        pass: pass,
                        message: message
                    };
                },
                negativeCompare: function (actual, description) {
                    var pass,
                        message = description ? "Expected element '" + description + "' not to exist" : "Expected element not to exist";
                    pass = !(actual.length > 0);
                    return {
                        pass: pass,
                        message: message
                    }
                }
            }
        },
        toHaveHtml: function (expected) {
            return {
                compare: function (actual, description) {
                    var pass,
                        message = (description ? "Expected element '" + description + "' to have html '" + expected + "'": "Expected element to to have html '" + expected + "'") + " not '" + actual.html() + "'";
                    pass = actual.html() === expected;
                    return {
                        pass: pass,
                        message: message
                    };
                },
                negativeCompare: function (actual, description) {
                    var pass,
                        message = (description ? "Expected element '" + description + "' not to have html" + expected + "'" : "Expected element not to have html '" + expected + "'") + " not '" + actual.html() + "'";
                    pass = actual.html() === expected;
                    return {
                        pass: pass,
                        message: message
                    }
                }
            }
        }
    };
}