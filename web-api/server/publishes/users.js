import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

/**
* @summary Publishes the currentUser with custom fields
* @name publish_user
* @isPublish true
* @locus Anywhere
* @return {Users} currentUser cursor
*/
Meteor.publish(null, function () {
	if (this.userId) {
		return Meteor.users.find({_id: this.userId}, {fields: {
			'_id':1,
			'createdAt':1,
			'updatedAt':1,
			'lastActive':1,
			'username':1,
			'profile':1,
			'stats':1
		}});
	} else {
		this.ready();
	}
});

/**
* @summary Publishes the requestedUser with custom fields
* @name user
* @isPublish true
* @locus Anywhere
* @return {Users} requestedUser cursor
*/
Meteor.publish('user', function (username) {
	check(username, String);
	var currentUser = Meteor.users.findOne(this.userId);
	var fields = {};
	if ((!!currentUser && (username == currentUser.username || username == this.userId))) {
		fields = {
			'_id':1,
			'createdAt':1,
			'updatedAt':1,
			'lastActive':1,
			'username':1,
			'profile': 1,
			'stats':1
		};
	} else {
		fields = {
			'_id':1,
			'createdAt':1,
			'updatedAt':1,
			'lastActive':1,
			'username':1,
			'profile.country':1,
			'stats':1
		};
	}
	return Meteor.users.find({$or : [{username: username}, {_id: username}]}, {fields: fields});
});

/**
* @summary Publishes the users count
* @name users_count
* @isPublish true
* @locus Anywhere
* @return {Integer} count accessed by UsersCount.findOne().count
*/
Meteor.publish('users_count', function () {
	var self = this;
	var count = 0;
	var initializing = true;
	var handle = Meteor.users.find().observeChanges({
		added: () => {
			++count;
			if (!initializing) {
				self.changed('users_count', 1, {count: count});
			}
		},
		removed: () => {
			--count;
			self.changed('users_count', 1, {count: count});
		}
	});

	initializing = false;
	self.added('users_count', 1, {count: count});
	self.ready();

	self.onStop(() => {
		handle.stop();
	});
});
