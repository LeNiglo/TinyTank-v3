import { Meteor } from 'meteor/meteor';

/**
* @summary Creates a new Server
* @name init_server
* @isMethod true
* @locus Anywhere
* @param {Object} server an object with required parameters
* @return {ObjectID} serverId null: error, _id: newly created serverId
*/
Meteor.method('init_server', (server) => {
	Servers.insert(server, (error, _id) => {
		if (error) log.error(error);
		else log.info("Created new server " + _id + ".");
		return error ? null : _id;
	});
}, {
	url: '/api/server/init_server',
	getArgsFromRequest: (request) => {
		var obj = {
			name: request.body.gameName,
			ip: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
			ports: {
				udp: request.body.udpPort,
				tcp: request.body.tcpPort
			},
			map: request.body.map
		};

		return [obj];
	},
	httpMethod: 'POST'
});

/**
* @summary Removes an active Server
* @name stop_server
* @isMethod true
* @locus Anywhere
* @param {ObjectID} serverId the ID of the Server
* @return {Integer} count 0: error, 1: success
*/
Meteor.method('stop_server', (serverId) => {
	log.debug("Stopping server " + serverId + ".");
	Servers.remove({_id: serverId}, (error) => {
		if (error) log.error(error);
		return error ? false : true;
	});
}, {
	url: '/api/server/stop_server',
	getArgsFromRequest: (request) => {
		return [request.body.serverId];
	},
	httpMethod: 'POST'
});

/**
* @summary Updates the lastActive time of an active Server
* @name update_server
* @isMethod true
* @locus Anywhere
* @param {ObjectID} serverId the ID of the Server
* @return {Integer} count 0: error, 1: success
*/
Meteor.method('update_server', (serverId) => {
	log.debug("Updating server " + serverId + " lastActive.");
	Servers.update({_id: serverId}, {$set: {lastActive: Date.now()}}, {}, (error, count) => {
		if (error) log.error(error);
		return error ? 0 : count;
	});
}, {
	url: '/api/server/update_server',
	getArgsFromRequest: (request) => {
		return [request.body.serverId];
	},
	httpMethod: 'POST'
});

/**
* @summary Updates an active Server to add an user
* @name add_user
* @isMethod true
* @locus Anywhere
* @param {ObjectID} serverId the ID of the Server
* @param {String} username the username of the User
* @return {Integer} count 0: error, 1: success
*/
Meteor.method('add_user', (serverId, username) => {
	if (!username) return 0;
	log.debug("Adding " + username + " to server " + serverId + ".");
	Servers.update({_id: serverId}, {$push: {users: username}}, {}, (error, count) => {
		if (error) log.error(error);
		return error ? 0 : count;
	});
}, {
	url: '/api/server/add_user',
	getArgsFromRequest: (request) => {
		return [request.body.serverId, request.body.username];
	},
	httpMethod: 'POST'
});

/**
* @summary Updates an active Server to remove a user
* @name remove_user
* @isMethod true
* @locus Anywhere
* @param {ObjectID} serverId the ID of the Server
* @param {String} username the username of the User
* @return {Integer} count 0: error, 1: success
*/
Meteor.method('remove_user', (serverId, username) => {
	if (!username) return 0;
	log.debug("Removing " + username + " from server " + serverId + ".");
	Servers.update({_id: serverId}, {$pull: {users: username}}, {}, (error, count) => {
		if (error) log.error(error);
		return error ? 0 : count;
	});
}, {
	url: '/api/server/remove_user',
	getArgsFromRequest: (request) => {
		return [request.body.serverId, request.body.username];
	},
	httpMethod: 'POST'
});
