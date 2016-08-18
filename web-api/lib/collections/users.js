Meteor.users.before.insert((userId, doc) => {
	doc.lastActive = Date.now();
	doc.createdAt = Date.now();
	doc.updatedAt = Date.now();
});

Meteor.users.before.update((userId, doc, fieldNames, modifier, options) => {
	modifier.$set = modifier.$set || {};
	modifier.$set.updatedAt = Date.now();
});

Meteor.users.before.remove((userId, doc) => {
	Meteor.users().update({_id: doc._id}, {$set: { lastActive: null }});
	return false;
});
