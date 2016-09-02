var timeDependency = new Tracker.Dependency();
var timeDepInterval = null;

Template.serversList.helpers({
	activeServers: function () {
		return Servers.find({lastActive: {$ne: null}}, {sort: { lastActive: 1 }});
	},
	activeServersCount: function () {
		return Servers.find({lastActive: {$ne: null}}, {sort: { lastActive: 1 }}).count();
	}
});

Template.serversList.created = function () {
	timeDepInterval = Meteor.setInterval(() => {
		timeDependency.changed();
	}, 10000);
}

Template.serversList.destroyed = function () {
	Meteor.clearInterval(timeDepInterval);
}

Template.serverItem.helpers({
	getPlayerCount: function () {
		return this.users.length;
	},
	getUptime: function () {
		timeDependency.depend();
		return moment(this.createdAt).fromNow();
	}
});
