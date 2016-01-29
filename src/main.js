import $ from 'jquery';
import schemaMatcher from 'src/schemaMatcher/schemaMatcher.js'
import jQMatchers from 'src/jQMatcher/jQMatcher.js'

var element = $('body');

beforeEach(function() {
    jasmine.addMatchers(schemaMatcher())
    window.jQMatchers = jQMatchers();
});

describe('test', function() {
    it('should have expect().toMatchSchema defined ', function() {
        expect(expect({}).toMatchSchema).toBeDefined();
    });

    it('should have jQMatchers defined', function(){
        expect(window.jQMatchers).toBeDefined();
        expect(window.jQMatchers.toExist).toBeDefined();
    });
});