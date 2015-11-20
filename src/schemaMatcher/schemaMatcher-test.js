describe('schemaMatcher', function() {
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
            ".first": shouldExist
        };

        expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(true);
    });

    it('should fail for single element schema with shouldNotExist matcher when element exists not', function(){
        var expectedSchema = {
            ".first": shouldNotExist
        };

        expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(false);
    });

    it('should pass for flat schema when all predicates pass', function() {
        var expectedSchema = {
            '.first': shouldExist,
            '.second': shouldExist
        };

        expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(true);
    });

    it('should fail for flat schema when one predicate fails', function() {
        var expectedSchema = {
            '.second': shouldExist,
            '.non-existent': shouldExist
        };
        expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(false);
    });

    it('should set appropriate message when one predicate fails', function(){
        var expectedSchema = {
            '.second': shouldExist,
            '.non-existent': shouldExist
        };
        var expectedMessage = "" +
            "Element does not match schema:\n" +
            "Expected element '.non-existent' to exist\n";
        expect(schemaMatcher.compare(element, expectedSchema).message).toEqual(expectedMessage);
    });

});