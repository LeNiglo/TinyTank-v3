import { Mongo } from 'meteor/mongo';

Downloads = new Mongo.Collection('downloads');

Downloads.before.insert((userId, doc) => {
	doc.user = userId;

	doc.createdAt = new Date();
	doc.updatedAt = new Date();
});

Downloads.before.update((userId, doc, fieldNames, modifier, options) => {
	modifier.$set = modifier.$set || {};
	modifier.$set.updatedAt = new Date();
});

Downloads.before.remove((userId, doc) => {

});
