var assert = require('assert');
var parsePath = require('../lib/createPathData.js');

suite('test the "syntax parser"',function(){

	test('test the data generation',function(done){
		var testSchema = {
			'path':'/value/:param/:optional?/*optSplat?/*reqSplat',
			'params':{
				'param':{
					'values':['dogs','cats']
				},
				'optional':{
					'regex':'dz-(.*)'
				},
				'count':{
					'regex':"\\d+"
				}
			}
		}

		var pathData = parsePath(testSchema);

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

	test('test the data with unspecified params',function(done){
		var testSchema = {
			'path':'/value/:param/:optional?/*optSplat?/*reqSplat',
		}

		var pathData = parsePath(testSchema);

		assert.equal(pathData.length,5,'there should be 5 chunks of path data');
		assert.equal(pathData[0].val,'value','the first data chunk should be a value with the value "value"');
		assert.equal(pathData[0].matches('value'),true,'the first data chunk should match only the correct value');
		assert(!pathData[0].isSplat,'the first chunk is not splat');

		assert.equal(pathData[1].name,'param','the second chunk should be a param named "param"');
		assert.equal(pathData[1].isOptional,false,'the second data chunk is NOT optional');
		assert(pathData[1].matches(Math.random().toString()),'the second data chunk should match literally anything');
		assert(!pathData[1].isSplat,'the second chunk is not splat');

		assert.equal(pathData[2].name,'optional','the third chunk should be an optional param named "optional"');
		assert.equal(pathData[2].isOptional,true,'the third data chunk is optional');
		assert(pathData[2].matches(Math.random().toString()),'the third data chunk should match literally anything');
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