import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

/**
* @summary Get the last user registered
* @name get_last_user
* @isMethod true
* @locus Anywhere
* @return {Object} user
*/
Meteor.method('get_last_user', () => {
	var u = Meteor.users.findOne({}, {
		fields: {
			'_id':1,
			'createdAt':1,
			'username':1
		},
		sort: {createdAt: -1}
	});

	return u ? {
		_id: u._id,
		createdAt: u.createdAt,
		username: u.username
	} : {};
});

/**
* @summary Creates an User
* @name create_user
* @isMethod true
* @locus Anywhere
* @param {Object} user
* @return {ObjectID} created
*/
Meteor.method('create_user', (user) => {
	return Accounts.createUser(user);
});

/**
* @summary Creates a new download record
* @name download_game
* @isMethod true
* @locus Anywhere
* @param {Object} downloadObject
* @return {ObjectId} created
*/
Meteor.method('download_game', (downloadObject) => {
	return Downloads.insert(downloadObject);
})

/**
* @summary Check if query is a tank
* @name is_tank
* @isMethod true
* @locus Anywhere
* @param {String} query
* @return {bool} isTank
*/
Meteor.method('is_tank', (query) => {
	check(query, String);
	return !!Tanks.findOne({name: query}, {});
});
