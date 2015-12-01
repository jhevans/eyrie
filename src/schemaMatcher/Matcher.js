import UnexpectedMatcher from 'src/schemaMatcher/UnexpectedMatcher.js';
import _ from 'underscore'
import compileMessages from 'src/messageCompilers/defaultMessageCompiler.js'

export default class Matcher {

    constructor(element, schema, path, strict) {
        this.element = element;
        this.schema = schema;
        this.path = path;
        this.strict = strict;
    }

    getMatchResult () {
        var result;
        if (_.isFunction(this.schema)) {
            result = this.schema(this.element, this.path);
        } else {
            result = this.recursiveCompare();
        }
        return result;
    }

    recursiveCompare () {
        var message = 'no message',
            results = [],
            result;

        var path = this.path ? this.path + ' ' : '';

        var unexpectedMatcher = new UnexpectedMatcher(this.element);

        _.keys(this.schema)
            .forEach(function (selector) {
                var matcher = new Matcher(this.element.find(selector), this.schema[selector], path + selector, this.strict);
                result = matcher.getMatchResult();
                results.push(result);
                unexpectedMatcher.allow(selector);
            }.bind(this));

        if (this.strict && unexpectedMatcher.hasUnexpected()) {
            results.push(unexpectedMatcher.getUnexpectedResult());
        }

        result = {
            pass: _.all(results, function (result) {
                return result.pass;
            }),
            message: compileMessages(results),
            results: results
        };

        return result;

    }
}