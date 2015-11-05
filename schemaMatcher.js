window.schemaMatchers = (function($){
    
    var matchers = {
        toMatchSchema: function (util, customEqualityTesters) {
            return {
                compare: function (actual, expected) {
                    var result = {
                        pass: false,
                        message: "you aint done owt!"
                    };
                    return result;
                }
            }
        }
    };

    return matchers;
})(jQuery);