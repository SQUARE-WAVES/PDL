var assert = require('assert');
var paramMatchers = require('../lib/paramMatchers.js')

suite('test the param matchers',function(){
	
	test('test the regex matcher',function(done){
		var matcher;

		try{
			matcher = paramMatchers.regex(15)
		}
		catch(err){
			assert.ok(true,'an error should be thrown!');
		}

		matcher = paramMatchers.regex('dogs\\d\\d');

		assert.equal(true,matcher('dogs12'),'the correct word should match');
		assert.equal(false,matcher('catfish'),'the incorrect word should not match');

		done();
	});

	test('test the value matcher',function(done){
		var matcher;

		try{
			matcher = paramMatchers.value({});
		}
		catch(err){
			assert.ok(true,'an error should be thrown!');
		}

		matcher = paramMatchers.value(15)

		assert.equal(true,matcher(15),'the correct value should match');
		assert.equal(false,matcher('dogs'),'the incorrect value should not match');

		done();
	});

	test('test the values matcher',function(done){
		var matcher;

		try{
			matcher = paramMatchers.values(15)
		}
		catch(err){
			assert.ok(true,'an error should be thrown, values implies an ARRAY!');
		}

		matcher = paramMatchers.values(['dogs','cats','fish']);

		assert.equal(true,matcher('dogs'),'the correct word should match');
		assert.equal(false,matcher('catfish'),'the incorrect word should not match');

		done();
	});

	test('test the whatever matcher',function(done){
		var matcher = paramMatchers.whatever();

		var randomAssString = Math.random().toString();

		assert.equal(true,matcher(randomAssString),'some random string should match');
		assert.equal(false,matcher(''),'the empty string should not');

		done();
	});


});