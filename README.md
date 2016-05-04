# Eyrie.js

A library for writing concise, readable Jasmine integration tests with helpful error messages.  The core is a jasmine matcher which matches a jQueryObject against a 'schema' object with css selectors as keys and matcher functions as values.  This provides a concise commmon language for describing the complete state of a page which should make tests far more readable.  As the matched objects are just pojos they can be built and derived programmatically opening up the possibility of deriving tests from data or even from the existing html of a working system.


```
expect(jQueryElement)
 .toMatchSchema({
  ".js-foo": shouldExist(),
  ".js-bar": shouldHaveHtml("bar")
 });
 
 //	Element does not match schema:
	// Expected element '.js-foo' to exist
	// Expected element '.js-bar' to have html 'bar' not 'baz'
```

## TODO
- [ ] Move all package management to jspm/remove npm
- [ ] es6ify
- [ ] Create distributable
- [ ] Do readme
- [ ] Set message on pass to something appropriate
- [x] Match schema exactly
- [ ] Include schemaMatchers as custom matchers
- [ ] Find out how to expose existing jasmine comparators
- [ ] Matchers:
 - [ ] textEquals
 - [ ] htmlEquals
 - [ ] hasClass
 - [ ] hasValue
