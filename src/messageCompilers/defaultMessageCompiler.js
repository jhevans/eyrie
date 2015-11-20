var compileMessages = (function () {
    'use strict';

    return function (results, prefix) {
        var message = prefix || "";

        var failures = [];
        results.forEach(function(result){
            if (!result.pass){
                failures.push(result.message)
            }
        });

        message = message + failures.join('\n');
        return message;
    }
});

window.compileMessages = compileMessages();