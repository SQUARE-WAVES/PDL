var assert = require('assert');
var compilePathData = require('../lib/compiler.js');

suite('test the "compiler"',function(){

	test('test compilation with valid paths',function(done){
		var path1 = '/this/has/no/params'
		var path2 = '/:this/:has?/:several'
		var path3 = '/this/one/has/*splat?'
		var emptyPath = '/';

		var schema = {
			'path':'/some/:stuff',
			'params':{
				'stuff':{
					'values':['a','b','c']
				}
			}
		};

		//we don't really need to test anything about the path data, as we know it works from
		//the tests for that module, we just need to be sure that it comes out for all parts

		var path1data = compilePathData(path1);
		assert.equal(path1data.length,4,'pathdata should be returned for each chunk');

		var path2data = compilePathData(path2);
		assert.equal(path2data.length,3,'pathdata should be returned for each param');

		var path3data = compilePathData(path3);
		assert.equal(path3data.length,4,'pathdata should be returned for each param or chunk');

		var emptyPathData = compilePathData(emptyPath);
		assert.equal(emptyPathData.length,1,'pathdata should be returned for the one valueless chunk, as this is a legit path');

		var schemaPathData = compilePathData(schema);
		assert.equal(schemaPathData.length,2,'schemas should compile correctly as well');

		done();
	});

	test('test compilation with invalid paths',function(done){
		var bad1 = 'this [] is not a PATH at aLL';
		var bad2 = '/:same/:same/:same/:same'
		var bad3 = ['not','even','a','string'];

		var runCompiler = function(thing){
			return function(){
				compilePathData(thing);
			}
		}

		assert.throws(runCompiler(bad1),'the path with no / should not compile');
		assert.throws(runCompiler(bad2),'a path that violates the post conditions should not compile');
		assert.throws(runCompiler(bad3),'the path that isn\'t even a string should not compile');
		done();
	});
});