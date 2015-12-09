import jQMatchers from 'src/jQMatcher/jQMatcher.js'
import schemaMatcher from 'src/schemaMatcher/schemaMatcher.js'
import $ from 'jquery'

describe('integration with jasmine', () => {
    var element;
    var schemaMatchers = schemaMatcher();
    var shouldExist = jQMatchers().toExist().compare;

    beforeEach(()=> {

        jasmine.addMatchers(schemaMatchers);

        var testHtml = window.__html__['src/schemaMatcher/testHtml.html'];
        $('body').append(testHtml);
        element = $('.test-div');
    });

    it('should allow expect().toMatchSchema()',() => {
        var expectedSchema = {
            ".first": shouldExist
        };

        expect(element).toMatchSchema(expectedSchema);
    });

    it('should allow expect().toMatchSchemaExactly()',() => {
        var expectedSchema = {
            '.first': {
                '.nestedFirst': shouldExist,
                '.nestedSecond': {
                    '.nestedThird': shouldExist
                }
            },
            '.second': shouldExist
        };

        expect(element).toMatchSchemaExactly(expectedSchema);
    });
});