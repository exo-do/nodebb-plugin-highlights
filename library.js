"use strict";

var highlights = {};
var opUID;
var contPost = 1;
var User = module.parent.require('./user');

/**
 * Parsea todos los posts del hilo en busca de usuarios ignorados
 */
highlights.parsePosts = function (data, callback) {
	if (data && data.postData && data.postData.content) {
		data.postData.isOP = false;
		if (contPost == 1) {
			opUID = data.postData.uid;
			data.postData.isOP = true;
			contPost += 1;
		}
		else if ( opUID == data.postData.uid ) {
			data.postData.isOP = true;
		}
	}
	callback(null, data);
};



module.exports = highlights;
