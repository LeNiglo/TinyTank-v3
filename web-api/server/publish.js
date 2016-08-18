import { Meteor } from 'meteor/meteor';

Meteor.publish('active_servers', () => {
	return Servers.find({lastActive: {$ne: null}}, {sort: { lastActive: 1 }});
});
