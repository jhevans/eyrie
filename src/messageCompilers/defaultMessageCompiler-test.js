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

        var prefix = "Element does not match schema:\n";
        var expected = prefix +
            "one\n" +
            "two\n" +
            "three";
        expect(compileMessages(results, prefix)).toBe(expected)
    });
});