(function (module) {
	"use strict";

	var highlights = {};
	var opUID;
	var postCount = true;
	var topics = module.parent.require('./topics');

	/**
	 * Parsea todos los posts del hilo en busca de los mensajes del OP
	 */
	highlights.parse = function (data, callback) {
		if (data && data.postData && data.postData.content) {
			if (postCount) {
				topics.getTopicData(data.postData.tid, function (err, topic) {
					if (err || !topic) {
						return callback(err);
					}
					opUID = topic.uid;
					data.postData.isOP = false;
					if ( opUID == data.postData.uid ) {
						data.postData.isOP = true;
						callback(null, data);
					} else {
						callback(null, data);
					}
				});
			}
		} else {
			callback(null, data);
		}
	};

	module.exports = highlights;

}(module));
