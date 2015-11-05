describe('schemaMatcher', function(){

    it('should accept a jquery selector with a matching schema', function(){

        var schema = {
            '.root':{
                '.thing1': {
                    text: "the value of the first thing"
                },
                '.thing2': {
                    html: "some <span>html</span>"
                }
            }
        };

        var html =
            '<div class="root">'  +
            '<div class="thing1">the value of the first thing</div>' +
            '<div class="thing2">some <span>html</span></div>' +
            '</div>';

        $('body').append(html);

        var result = window.schemaMatchers.toMatchSchema().compare($('body'), schema);
        expect(result.pass).toEqual(true);
        expect(result.message).toEqual("the difference between you and me is that I'm not on fire");
    });
});