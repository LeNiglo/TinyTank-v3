UsersCount = new Meteor.Collection('users_count');
var usersCount = new ReactiveVar(0);
var lastUser = new ReactiveVar({});
var infosHandler = null;
var infosInterval = null;

var infosUpdate = () => {
	var uc = UsersCount.findOne();
	usersCount.set(uc ? uc.count : 0);
	Meteor.call('get_last_user', (error, result) => {
		if (error) FlashMessages.sendError(error);
		lastUser.set(result);
	});
};

Template.infoLastUser.helpers({
	getLastUser: () => {
		return lastUser.get();
	}
});

Template.infoNbUsers.helpers({
	getNbUsers: () => {
		return usersCount.get();
	}
});

Template.infos.created = function () {
	infosHandler = Meteor.subscribe('users_count', () => {
		infosUpdate();
		infosInterval = Meteor.setInterval(infosUpdate, 20000);
	});
}

Template.infos.destroyed = function () {
	infosHandler.stop();
	Meteor.clearInterval(infosInterval);
	infosHandler.stop();
}
