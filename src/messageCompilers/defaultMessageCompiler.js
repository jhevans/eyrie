export default function compileMessages(results, prefix) {
    'use strict';
    var message = prefix || "";

    var failures = [];
    results.forEach(function (result) {
        if (!result.pass) {
            failures.push(result.message)
        }
    });

    message = message + failures.join('\n');
    return message;
}