var assert = require('assert');
var rules = require('../lib/rules.js');

suite('test the pre validation rules',function(){

	test('test pathMustBeAString',function(done){
		var aString = 'Im a string';
		var notAString = ['I\'m','not'];
		assert.equal(rules.pathMustBeAString(aString),true,'the string should pass');
		assert.equal(rules.pathMustBeAString(notAString),false,'the non string should not pass');
		done();
	});

	test('test pathMustStartWithSlash',function(done){
		var startsWithSlash = '/Im/start/with/a/slash';
		var doesntStartWithSlash = 'I/Dont'

		assert.equal(rules.pathMustStartWithSlash(startsWithSlash),true,'the string that starts with a slash pass');
		assert.equal(rules.pathMustStartWithSlash(doesntStartWithSlash),false,'the one that doesn\'t start with a a slah shouldn\'t ');
		done();
	});
	
});

suite('test the post validation rules',function(){

	test('test onlyOneSplat',function(done){
		var moreThanOneSplat = [{'isSplat':true},{'isSplat':true}];
		var oneSplat = [{'isSplat':true}];
		var noSplats = [{}];

		assert.equal(rules.onlyOneSplatParam(moreThanOneSplat),false,'the list with more than one splat should not pass');
		assert.equal(rules.onlyOneSplatParam(oneSplat),true,'the list with one splat should pass');
		assert.equal(rules.onlyOneSplatParam(noSplats),true,'the list with no splats should pass');
		done();
	});

	test('test splatMustBeAtTheEnd',function(done){
		var splatAtTheEnd = [{'isSplat':true}];
		var splatInTheMiddle = [{},{'isSplat':true},{}];
		var noSplats = [{},{},{}];

		assert.equal(rules.splatMustBeAtTheEnd(splatAtTheEnd),true,'the list with the splat at the end should pass');
		assert.equal(rules.splatMustBeAtTheEnd(splatInTheMiddle),false,'the list with the splat in the middle should not pass');
		assert.equal(rules.splatMustBeAtTheEnd(noSplats),true,'the list with no splats should pass');
		done();
	});

	test('test uniqueNamesForParams',function(done){
		var uniqueNames = [{},{'name':'zzzz'},{'name':'tim'},{'name':'fff'}];
		var dupedNames = [{},{'name':'jim'},{'name':'tim'},{'name':'jim'}];
		var noNames = [{},{},{}];

		assert.equal(rules.uniqueNamesForParams(uniqueNames),true,'the list with unique names should pass');
		assert.equal(rules.uniqueNamesForParams(dupedNames),false,'the list with the duped names should not pass');
		assert.equal(rules.uniqueNamesForParams(noNames),true,'the list with no names should pass');
		done();
	});
});