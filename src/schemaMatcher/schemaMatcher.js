import Matcher from 'src/schemaMatcher/Matcher.js'
import compileMessages from 'src/messageCompilers/defaultMessageCompiler.js'

export default function schemaMatcher() {
    'use strict';

    var EXPECTED_PREFIX = "Element does not match schema:\n";

    return {
        toMatchSchema: function () {
            return {
                compare: function (jQActual, expectedSchema) {
                    var matcher = new Matcher(jQActual, expectedSchema, '', false);
                    var result = matcher.getMatchResult();
                    result.message = compileMessages(result.results, EXPECTED_PREFIX);
                    return result
                }
            }
        },
        toMatchSchemaExactly: function () {
            return {
                compare: function (jQActual, expectedSchema) {
                    var matcher = new Matcher(jQActual, expectedSchema, '', true);
                    var result = matcher.getMatchResult();
                    result.message = compileMessages(result.results, EXPECTED_PREFIX);
                    return result
                }
            }
        }
    };
};
