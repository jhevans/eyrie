describe('integration tests', function() {
    'use strict';
    var shouldExist,
        shouldNotExist,
        schemaMatcher,
        element;

    beforeEach(function(){
        shouldExist = window.jQMatchers.toExist.compare,
        shouldNotExist = window.jQMatchers.toExist.negativeCompare,
        schemaMatcher = window.schemaMatcher.toMatchSchema;

        element = $('body');
    })


    xit('should pass for single element schema with shouldExist matcher when element exists', function(){
        var expectedSchema = {
            ".singleElement": shouldExist
        }
        expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(true);
    });

    xit('should fail for single element schema with shouldNotExist matcher when element exists not', function(){
        var expectedSchema = {
            ".singleElement": shouldNotExist
        }
        expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(false);
    });

    xit('should pass for flat schema when all elements exist', function() {
        var expectedSchema = {
            '.firstClass': shouldExist,
            '.secondClass': shouldExist
        }
        expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(true);
    });

    xit('should pass for flat schema when one element exist not', function() {
        var expectedSchema = {
            '.firstClass': shouldExist,
            '.secondClass': shouldExist
        }
        expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(true);
    });
});