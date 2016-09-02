import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

/**
* @summary Get LoggedIn User Profile
* @name get_profile
* @isMethod true
* @locus Anywhere
* @return {User} user undefined: error, user: logged in user
*/
Meteor.method('get_profile', () => {
	if (!this.userId) log.error('User must be logged to see his profile.');
	return Meteor.users.findOne(this.userId, {fields: {
		'_id':1,
		'createdAt':1,
		'updatedAt':1,
		'lastActive':1,
		'username':1,
		'profile':1,
		'stats':1
	}});
}, {
	url: '/api/commons/get_profile',
	getArgsFromRequest: (request) => {
		this.userId = request.userId;
	},
	httpMethod: 'GET'
});

/**
* @summary Get an User Profile
* @name get_user_profile
* @isMethod true
* @locus Anywhere
* @param {String} username of the User to find (can also be his _id)
* @return {User} user undefined: error, user: requested user
*/
Meteor.method('get_user_profile', (username) => {
	check(username, String);
	return Meteor.users.findOne({$or : [{username: username}, {_id: username}]}, {fields: {
		'_id':1,
		'createdAt':1,
		'updatedAt':1,
		'lastActive':1,
		'username':1,
		'profile.country':1,
		'stats':1
	}});
}, {
	url: '/api/commons/get_profile/:_username',
	getArgsFromRequest: (request) => {
		return [request.params['_username']];
	},
	httpMethod: 'GET'
});
