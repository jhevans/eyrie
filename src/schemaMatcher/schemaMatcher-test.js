describe('integration tests', function() {
    'use strict';
    var shouldExist,
        shouldNotExist,
        schemaMatcher,
        element,
        testHtml;

    beforeEach(function(){
        shouldExist = window.jQMatchers.toExist().compare;
        shouldNotExist = window.jQMatchers.toExist().negativeCompare;
        schemaMatcher = window.schemaMatcher.toMatchSchema();

        testHtml = window.__html__['src/schemaMatcher/testHtml.html'];
        $('body').append(testHtml);
        element = $('.test-div');
    });


    it('should pass for single element schema with shouldExist matcher when element exists', function(){
        var expectedSchema = {
            ".single-element": shouldExist
        };
        expect(shouldExist(element.find('.single-element')).pass).toBe(true);
        expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(true);
    });

    it('should fail for single element schema with shouldNotExist matcher when element exists not', function(){
        var expectedSchema = {
            ".single-element": shouldNotExist
        };
        expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(false);
    });

    xit('should pass for flat schema when all elements exist', function() {
        var expectedSchema = {
            '.first-class': shouldExist,
            '.second-class': shouldExist
        };
        expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(true);
    });

    xit('should fail for flat schema when one element exists not', function() {
        var expectedSchema = {
            '.first-class': shouldExist,
            '.second-class': shouldExist
        };
        expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(true);
    });
});