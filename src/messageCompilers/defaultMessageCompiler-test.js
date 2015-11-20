describe('defaultMessageCompiler', function() {
    var compileMessages;

    beforeEach(function() {
        compileMessages = window.compileMessages;
    });
    it('should be tested', function(){
        var results = [
            {
                message: "one"
            },
            {
                message: "two"
            },
            {
                message: "three"
            }
        ];

        var expected = "Element does not match schema:\n" +
            "one\n" +
            "two\n" +
            "three\n";
        expect(compileMessages(results)).toBe(expected)
    });
});