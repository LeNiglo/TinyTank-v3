import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

/**
* @summary Get Servers List
* @name list_servers
* @isMethod true
* @locus Anywhere
* @return {Array} servers null: error, [{server}]: servers list
*/
Meteor.method('list_servers', () => {
	return Servers.find({lastActive: {$ne: null}}).map((doc, index, cursor) => {
		return doc;
	});
}, {
	url: '/api/client/list_servers',
	httpMethod: 'GET'
});
