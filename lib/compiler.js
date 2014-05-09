var assert = require('assert');
var createPathData = require('./createPathData.js');
var rules =require('./rules.js')

var rule = function(evaluator,message){
	return function(pathData){
		if(evaluator(pathData)){
			return null;
		}
		else {
			return message;
		}
	}
}

var pathDataRules = [
	rule(rules.onlyOneSplatParam,'a path can only have one splat parameter'),
	rule(rules.splatMustBeAtTheEnd, 'the splat in a path must be the last part of the path'),
	rule(rules.uniqueNamesForParams, 'all parameters in a path must have unique names')
];

var pathStringRules = [
	rule(rules.pathMustBeAString,'a path must be a string'),
	rule(rules.pathMustStartWithSlash,'a path string must start with a "/"'),
]

//the path is provided to make the error messages clear
var applyRules = function(rules,target,path) {

	var violations = rules.map(function(rule){
		return rule(target);
	})
	.filter(function(violation){
		return typeof(violation) === 'string';
	});

	if(violations.length !== 0){
		var errorMessage = 'path "' + path + '" is invalid, violations:\n' + violations.join('\n');
		throw new Error(errorMessage);
	}
}

var compileAndValidate = function(path,params) {

	applyRules(pathStringRules,path,path)

	var pathData = createPathData(path,params);

	applyRules(pathDataRules,pathData,path)	
	
	return pathData;
}

//this function will return a set of validated path data, or throw an exception
module.exports = function(schema) {

	if(typeof(schema) === 'string'){
		return compileAndValidate(schema,null);
	}
	else{
		return compileAndValidate(schema.path,schema.params);
	}
}