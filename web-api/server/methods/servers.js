import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

/**
* @summary Creates a new Server
* @name init_server
* @isMethod true
* @locus Anywhere
* @param {Object} server an object with required parameters
* @return {ObjectID} serverId null: error, _id: newly created serverId
*/
Meteor.method('init_server', (server) => {
	if (this.userId) {
		var _id = Servers.insert(server);
		log.info("Created new server " + _id + ".");
		return _id;
	} else {
		log.error('User must be logged to init a server.');
	}
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
		this.userId = request.userId;
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
	if (this.userId) {
		check(serverId, String);
		log.debug("Stopping server " + serverId + ".");
		return Servers.remove({_id: serverId});
	} else {
		log.error('User must be logged to stop a server.');
	}
}, {
	url: '/api/server/stop_server',
	getArgsFromRequest: (request) => {
		this.userId = request.userId;
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
	if (this.userId) {
		check(serverId, String);
		log.debug("Updating server " + serverId + " lastActive.");
		return Servers.update({_id: serverId}, {$set: {lastActive: new Date()}});
	} else {
		log.error('User must be logged to update a server.');
	}
}, {
	url: '/api/server/update_server',
	getArgsFromRequest: (request) => {
		this.userId = request.userId;
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
	if (this.userId) {
		check(serverId, String);
		check(username, String);
		log.debug("Adding " + username + " to server " + serverId + ".");
		return Servers.update({_id: serverId}, {$push: {users: username}});
	} else {
		log.error('User must be logged to update a server.');
	}
}, {
	url: '/api/server/add_user',
	getArgsFromRequest: (request) => {
		this.userId = request.userId;
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
	if (this.userId) {
		check(serverId, String);
		check(username, String);
		log.debug("Removing " + username + " from server " + serverId + ".");
		return Servers.update({_id: serverId}, {$pull: {users: username}});
	} else {
		log.error('User must be logged to update a server.');
	}
}, {
	url: '/api/server/remove_user',
	getArgsFromRequest: (request) => {
		this.userId = request.userId;
		return [request.body.serverId, request.body.username];
	},
	httpMethod: 'POST'
});
