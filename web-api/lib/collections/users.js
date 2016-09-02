Meteor.users.before.insert((userId, doc) => {
	doc.lastActive = new Date();
	doc.createdAt = new Date();
	doc.updatedAt = new Date();
});

Meteor.users.before.update((userId, doc, fieldNames, modifier, options) => {
	modifier.$set = modifier.$set || {};
	modifier.$set.updatedAt = new Date();
});

Meteor.users.before.remove((userId, doc) => {
	Meteor.users().update({_id: doc._id}, {$set: { lastActive: null }});
	return false;
});
