import { Meteor } from 'meteor/meteor';

/**
* @summary Publishes the list of active servers
* @name active_servers
* @isPublish true
* @locus Anywhere
* @return {Servers} activeServers cursor
*/
Meteor.publish('active_servers', () => {
	return Servers.find({lastActive: {$ne: null}}, {sort: { lastActive: 1 }});
});
