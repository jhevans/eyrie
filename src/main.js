import $ from 'jquery';
import {schemaMatcher} from 'src/schemaMatcher/schemaMatcher.js'
import {jQMatchers} from 'src/jQMatcher/jQMatcher.js'

var element = $('body');

var shouldExist = jQMatchers().toExist().compare;
var expectedSchema = {
    ".first": shouldExist
};


console.log(schemaMatcher().toMatchSchema().compare(element, expectedSchema).pass);