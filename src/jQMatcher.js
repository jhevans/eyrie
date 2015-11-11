window.jQMatchers = (function () {
    'use strict';

    return {
        toExist: function () {
            return {
                compare: function (actual) {
                    var pass,
                        message = "Expected element to exist";

                    pass = this.doesExist(actual);

                    return {
                        pass: pass,
                        message: message
                    };
                },
                negativeCompare: function(actual){
                    var pass,
                        message = "Expected element not to exist";

                    pass = !this.doesExist(actual);

                    return {
                        pass: pass,
                        message: message
                    }
                },
                doesExist: function (actual) {
                    return actual.length > 0;
                }
            }
        }
    };
})();