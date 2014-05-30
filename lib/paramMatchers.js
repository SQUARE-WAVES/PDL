var assert = require('assert');

var isObject = function(item){
	return typeof(item) === 'object';
}

module.exports.regex = function(text){
	assert.ok(typeof(text) === 'string','a regex matcher requires a string to be passed in');

	var rg = new RegExp(text);

	return function(param){
		return rg.test(param);
	}
};

module.exports.value = function(val){

	assert.notEqual(true,isObject(val),'a value matcher needs a value not an object');
	return function(param){
		return param === val;
	}
};

module.exports.values = function(list){
	assert.ok(Array.isArray(list),'a values matcher requires an array of strings to be passed in');

	var set = {};
	list.forEach(function(item){
		set[item] = true;
	});

	return function(param){
		return set[param] === true;
	}
};


module.exports.whatever = function(){

	return function(param){
		return param !== '';
	}
}