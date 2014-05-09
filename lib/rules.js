//path data rules

module.exports.onlyOneSplatParam = function(pathData){
	var splats = pathData.filter(function(chunk){
		return chunk.isSplat;
	});

	return splats.length <= 1;
}

module.exports.splatMustBeAtTheEnd = function(pathData){
	var firstPart = pathData.slice(0,pathData.length - 1);
	
	var splatsInFirstPart = firstPart.filter(function(chunk){
		return chunk.isSplat;
	});

	return splatsInFirstPart.length === 0;
}

module.exports.uniqueNamesForParams = function(pathData) {

	var passed = pathData.reduce(function(namesSeen,chunk){
		if(namesSeen === false){
			return false;
		}
		else if(chunk.name){
			if(namesSeen[chunk.name] === true){
				return false;
			}
			else{
				namesSeen[chunk.name] = true;
				return namesSeen;
			}
		}
		else{
			return namesSeen;
		}
	},{});

	return passed !== false;
};

//string rules

module.exports.pathMustBeAString = function(pathString){
	return typeof(pathString) === 'string';
}

module.exports.pathMustStartWithSlash = function(pathString){
	return pathString.substring(0,1) === '/';
}