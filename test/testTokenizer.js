var tokenizePath = require('../lib/tokenizer.js');
var assert = require('assert');

suite('test the tokenization routines',function(){
	
	test('test tokenization',function(done){
		var testPath1 = '/';
		var testPath2 = '/a/b/c';

		var tokens1 = tokenizePath(testPath1);
		var tokens2 = tokenizePath(testPath2);

		assert.equal(tokens1.length,1,'the first path should contain 1 token');
		assert.equal(tokens2.length,3,'the second path should contain 3 tokens');

		assert.equal(tokens2[0],'a','the first token of path 2 should be "a"');
		assert.equal(tokens2[1],'b','the first token of path 2 should be "b"');
		assert.equal(tokens2[2],'c','the first token of path 2 should be "c"');
		done();
	});
});