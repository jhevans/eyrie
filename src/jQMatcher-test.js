describe('jQMatcher', function() {
    var ELEMENT_DESCRIPTION = "<description>";
    it('should match if element exists', function() {
        var comparison = window.jQMatchers.toExist().compare($('body'));
        expect(comparison.pass).toBe(true);
    });

    it('should not match if element does not exist', function(){
        var comparison = window.jQMatchers.toExist().compare($('.does-not-exist'));
        expect(comparison.pass).toBe(false);
        expect(comparison.message).toBe("Expected element to exist");
    });


    it('should include description in message if description is provided and element does not exist', function(){
        var comparison = window.jQMatchers.toExist().compare($('.does-not-exist'), ELEMENT_DESCRIPTION);
        expect(comparison.pass).toBe(false);
        expect(comparison.message).toBe("Expected element " + ELEMENT_DESCRIPTION + " to exist");
    });

    it('should match if inverse and element does not exist', function() {
        var comparison = window.jQMatchers.toExist().negativeCompare($('.does-not-exist'));
        expect(comparison.pass).toBe(true);
    });

    it('should not match if inverse and element does exist', function() {
        var comparison = window.jQMatchers.toExist().negativeCompare($('body'));
        expect(comparison.pass).toBe(false);
        expect(comparison.message).toBe("Expected element not to exist");
    });

    it('should include description in message if description is provided is inverse and element does exist', function() {
        var comparison = window.jQMatchers.toExist().negativeCompare($('body'), ELEMENT_DESCRIPTION);
        expect(comparison.pass).toBe(false);
        expect(comparison.message).toBe("Expected element " + ELEMENT_DESCRIPTION + " not to exist");
    });
});