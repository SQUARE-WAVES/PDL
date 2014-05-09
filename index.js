var paramMatchers = require('./lib/paramMatchers.js');

var isOptional = function(str){
	return str.substring(str.length-1,str.length) === '?';
}

var paramName = function(str){
	var endpoint = str.length;
	
	 if(isOptional(str)){
		endpoint = endpoint -1;
	}

	return str.substring(1,endpoint);
}

var paramData = function(token,params){
	var pname = paramName(token);

	return {
		'name':pname,
		'regex':params[pname],
		'optional':isOptional(token)
	};
}

var getMatcher = function(info){
	var matcherKey = Object.keys(info).filter(function(key){
		return paramMatchers[key] !== undefined;
	})[0];

	if(matcherKey === undefined){
		return paramMatchers.whatever();
	}

	return paramMatchers[matcherKey](info[matcherKey])
}

var tokenizePath = function(str){
	return str.substring(1,str.length).split('/');
}

var nonParam = function(str,schema){
	return {
		'val':str,
		'matches':paramMatchers.value(str)
	}
}

var param = function(str,schema) {
	var name = paramName(str);

	var paramInfo;

	if(schema.params){
		paramInfo = schema.params[name];
	} 

	var paramMatcher;

	if(paramInfo) {
		paramMatcher = getMatcher(paramInfo);	
	}
	else{
		paramMatcher = paramMatchers.whatever();
	}
	
	return {
		'name':name,
		'matches':paramMatcher,
		'isOptional':isOptional(str)
	};
}

var splat = function(str,schema){
	var splatParam = param(str,schema);
	splatParam.isSplat = true;

	return splatParam;
};

var tokenTable = {
	':':param,
	'*':splat
};

var createPathData = function(schema){

	//the substring is necessary to get rid of the leading /
	var tokenizedParams = tokenizePath(schema.path);

	var pathData = tokenizedParams.map(function(item){
		var start = item.substring(0,1);

		var matcherMaker = tokenTable[start] || nonParam;
		return matcherMaker(item,schema);
	});

	return pathData;
};

module.exports.createPathData = createPathData;
module.exports.tokenizePath = tokenizePath;