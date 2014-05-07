var assert = require('assert');
var PDL = require('../index.js')

suite('test the "compiler"',function(){
	
	test('test tokenization',function(done){
		var testPath1 = '/';
		var testPath2 = '/a/b/c';

		var tokens1 = PDL.tokenizePath(testPath1);
		var tokens2 = PDL.tokenizePath(testPath2);

		assert.equal(tokens1.length,1,'the first path should contain 1 token');
		assert.equal(tokens2.length,3,'the second path should contain 3 tokens');

		assert.equal(tokens2[0],'a','the first token of path 2 should be "a"');
		assert.equal(tokens2[1],'b','the first token of path 2 should be "b"');
		assert.equal(tokens2[2],'c','the first token of path 2 should be "c"');
		done();
	});

	test('test the data generation',function(done){
		var testSchema = {
			'path':'/value/:param/:optional?/*optSplat/+reqSplat',
			'params':{
				'param':{
					'type':'path',
					'values':['dogs','cats']
				},
				'optional':{
					'type':'path',
					'regex':'dz-(.*)'
				},
				'optSplat':{
					'type':'path'
				},
				'reqSplat':{
					'type':'path'
				}
			}
		}

		var pathData = PDL.createPathData(testSchema);
		assert.equal(pathData.length,5,'there should be 5 chunks of path data');
		assert.equal(pathData[0].val,'value','the first data chunk should be a value with the value "value"');
		assert(pathData[0].matches('value'),'the first data chunk should match the correct value');
		assert(!pathData[0].matches('literally anything else'),'the first data chunk should not match other things');
		assert(!pathData[0].isSplat,'the first chunk is not splat');

		assert.equal(pathData[1].name,'param','the second chunk should be a param named "param"');
		assert.equal(pathData[1].isOptional,false,'the second data chunk is NOT optional');
		assert(pathData[1].matches('dogs'),'the second chunk should match things in it\'s values list');
		assert(pathData[1].matches('cats'),'the second chunk should match things in it\'s values list');
		assert(!pathData[1].matches('zzz'),'the second chunk should not match things not in it\'s values list');
		assert(!pathData[1].isSplat,'the second chunk is not splat');

		assert.equal(pathData[2].name,'optional','the third chunk should be an optional param named "optional"');
		assert.equal(pathData[2].isOptional,true,'the third data chunk is optional');
		assert(pathData[2].matches('dz-RAP SCHOOL'),'the third chunk should match things in it\'s regexp');
		assert(!pathData[2].isSplat,'the second chunk is not splat');

		assert.equal(pathData[3].name,'optSplat','the fourth chunk should be an optional splat named "optSplat"');
		assert.equal(pathData[3].isOptional,true,'the fourth data chunk is optional');
		assert(pathData[3].isSplat,'the fourth chunk is splat');

		assert.equal(pathData[4].name,'reqSplat','the fourth chunk should be a splat named "reqSplat"');
		assert.equal(pathData[4].isOptional,false,'the fourth data chunk is NOT optional');
		assert(pathData[4].isSplat,'the fourth chunk is splat');

		done();
	});
});