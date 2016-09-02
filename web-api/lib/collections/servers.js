import { Mongo } from 'meteor/mongo';

Servers = new Mongo.Collection('servers');

Servers.before.insert((userId, doc) => {
	doc.owner = userId;
	doc.users = [];

	doc.lastActive = new Date();
	doc.createdAt = new Date();
	doc.updatedAt = new Date();
});

Servers.before.update((userId, doc, fieldNames, modifier, options) => {
	modifier.$set = modifier.$set || {};
	modifier.$set.updatedAt = new Date();
});

Servers.before.remove((userId, doc) => {
	Servers.update({_id: doc._id}, {$set: { lastActive: null }});
	return false;
});
