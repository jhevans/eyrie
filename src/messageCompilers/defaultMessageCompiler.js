window.compileMessages = (function () {
    'use strict';
    // TODO: extract as injectable dependency
    return function(results){
        var message = "Element does not match schema:\n";
        results.forEach(function(result){
            if (!result.pass){
                message += result.message + "\n";
            }
        });
        return message;
    }

})();