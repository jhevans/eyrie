describe('schemaMatcher', function() {
    'use strict';
    var shouldExist,
        shouldNotExist,
        schemaMatcher,
        exactSchemaMatcher,
        element,
        testHtml;

    var NO_MATCH_HEADER = "Element does not match schema:\n";

    beforeEach(function(){
        shouldExist = window.jQMatchers.toExist().compare;
        shouldNotExist = window.jQMatchers.toExist().negativeCompare;
        schemaMatcher = window.schemaMatcher.toMatchSchema();
        exactSchemaMatcher = window.schemaMatcher.toMatchSchemaExactly();

        testHtml = window.__html__['src/schemaMatcher/testHtml.html'];
        $('body').append(testHtml);
        element = $('.test-div');
    });

    describe('flat schema', function() {
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
                NO_MATCH_HEADER +
                "Expected element '.non-existent' to exist";
            expect(schemaMatcher.compare(element, expectedSchema).message).toEqual(expectedMessage);
        });
    });

    describe('nested schema', function() {
        it('should pass for nested schema with single shouldExist matcher when element exists', function () {
            var expectedSchema = {
                ".first": {
                    '.nestedFirst': shouldExist
                }
            };

            expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(true);
        });

        it('should fail for nested schema with single shouldExist matcher when element exists not', function () {
            var expectedSchema = {
                ".first": {
                    '.non-existent': shouldExist
                }
            };

            expect(schemaMatcher.compare(element, expectedSchema).pass).toBe(false);
        });

        it('should set appropriate message when one predicate fails', function(){
            var expectedSchema = {
                ".first": {
                    '.non-existent': shouldExist
                }
            };
            var expectedMessage = "" +
                NO_MATCH_HEADER +
                "Expected element '.first .non-existent' to exist";

            expect(schemaMatcher.compare(element, expectedSchema).message).toBe(expectedMessage);

        });

    });

    describe('strict schema', function(){
        it('should pass when the dom matches the schema exactly', function(){

            var expectedSchema = {
                '.first': {
                    '.nestedFirst': shouldExist,
                    '.nestedSecond': {
                        '.nestedThird': shouldExist
                    }
                },
                '.second': shouldExist
            };

            expect(exactSchemaMatcher.compare(element, expectedSchema).pass).toBe(true);
        });

        it('should fail when an extra element is present', function(){

            var expectedSchema = {
                '.first': {
                    '.nestedFirst': shouldExist,
                    '.nestedSecond': {
                        '.nestedThird': shouldExist
                    }
                }
            };

            expect(exactSchemaMatcher.compare(element, expectedSchema).pass).toBe(false);

        });

        it('should provide appropriate message when an extra element is present', function(){

            var expectedSchema = {
                '.first': {
                    '.nestedFirst': shouldExist,
                    '.nestedSecond': {
                        '.nestedThird': shouldExist
                    }
                }
            };

            var expectedMessage = "" +
                NO_MATCH_HEADER +
                "Unexpected Element: '.second'";
            expect(exactSchemaMatcher.compare(element, expectedSchema).message).toBe(expectedMessage);

        });

        it('should fail when an expected element is absent', function() {

            var expectedSchema = {
                '.first': {
                    '.nestedFirst': shouldExist,
                    '.nestedSecond': {
                        '.nestedThird': shouldExist,
                        '.non-existent': shouldExist
                    }
                },
                '.second': shouldExist
            };

            var expectedMessage = "" +
                NO_MATCH_HEADER +
                "Expected element '.first .nestedSecond .non-existent' to exist";
            expect(exactSchemaMatcher.compare(element, expectedSchema).pass).toBe(false);
            expect(exactSchemaMatcher.compare(element, expectedSchema).message).toBe(expectedMessage);
        });
    });
});