describe('integration test', function() {
    'use strict';

    xit('should do something', function() {
        var expectedSchema = {
            '.topLevelClass': {
                '.lowerLevelClass': window.jQMatchers.toExist()
            }
        }

        expect(element).toMatchSchema(expectedSchema);

    });
});