(function (module) {
	"use strict";

	var highlights = {};
	var opUID;
	var postCount = true;
	var topics = module.parent.require('./topics'),
	  user = module.parent.require('./user');


	/**
	 * Parsea todos los posts del hilo en busca de los mensajes del OP
	 */
	highlights.parse = function (data, callback) {
		if (data && data.postData && data.postData.content) {
			topics.getTopicData(data.postData.tid, function (err, topic) {
				if (err || !topic) {
					return callback(err);
				}
				opUID = topic.uid;
				data.postData.isOP = false;
				if ( opUID == data.postData.uid ) {
					data.postData.isOP = true;
				}
				user.isFollowing(data.uid, data.postData.uid, function (err, isfow) {
					if (err) {
						return callback(err);
					}
					data.postData.isFollow = isfow;
					callback(null, data)
				});
			});
		} else {
			callback(null, data);
		}
	};

	module.exports = highlights;

}(module));
