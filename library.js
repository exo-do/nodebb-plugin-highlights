(function (module) {
	"use strict";

	var highlights = {};
	var opUID;
	var postCount = true;
	var topics = module.parent.require('./topics'),
	  user = module.parent.require('./user'),
	  async = require('async');


	/**
	 * Parsea todos los posts del hilo en busca de los mensajes del OP
	 */
	highlights.parse = function (data, callback) {
		async.eachSeries(data.posts,
		function(p, cb){
			if (p && data.uid)
			{
				topics.getTopicData(p.tid, function (err, topic) {
					if (err || !topic) {
						p.isOP = false;
						p.isFollow = false;
						cb();
					}
					opUID = topic.uid;
					p.isOP = false;
					if ( opUID == p.uid ) {
						p.isOP = true;
					}

					user.isFollowing(data.uid, p.uid, function (err, isfow) {
						if (err) {
							cb();
						}
						p.isFollow = isfow;
						//console.log(p);
						cb();
					});

				});
			}
			else
			{
				cb();
			}
		}, function(r){
			callback(null, data);
		});
	};

	module.exports = highlights;

}(module));
