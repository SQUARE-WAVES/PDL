var tokenizePath = function(str){
	return str.substring(1,str.length).split('/');
}

module.exports = tokenizePath;