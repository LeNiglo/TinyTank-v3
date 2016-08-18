Meteor.subscribe('active_servers');

Template.home.helpers({
	'servers': () => {
		return Servers.find({});
	},
	'matches': () => {
		return Matches.find({});
	},
	'users': () => {
		return Meteor.users.find({});
	}
});

Template.home.created = function() {
	document.title = "TinyTank";
}

Template.home.rendered = function() { }

Template.home.destroyed = function() { }
