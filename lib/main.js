import {$} from 'jquery'
import {schemaMatcher} from 'schemaMatcher'

element = $('body');

schemaMatcher.compare(element, expectedSchema).pass