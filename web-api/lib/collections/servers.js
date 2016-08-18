import { Mongo } from 'meteor/mongo';

Servers = new Mongo.Collection('servers');

Servers.before.insert((userId, doc) => {
	doc.owner = userId;
	doc.users = [];

	doc.lastActive = Date.now();
	doc.createdAt = Date.now();
	doc.updatedAt = Date.now();
});

Servers.before.update((userId, doc, fieldNames, modifier, options) => {
	if (doc.owner != userId) {
		return false;
	}

	modifier.$set = modifier.$set || {};
	modifier.$set.updatedAt = Date.now();
});

Servers.before.remove((userId, doc) => {
	if (doc.owner != userId) {
		return false;
	}

	Servers.update({_id: doc._id}, {$set: { lastActive: null }});
	return false;
});
