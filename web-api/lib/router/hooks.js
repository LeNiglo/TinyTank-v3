import { Session } from 'meteor/session';

module.exports = {
	redirectIfLoggedIn: function () {
		if (Meteor.userId()) {
			this.redirect('home');
		} else {
			this.next();
		}
	},
	redirectIfNotLoggedIn: function () {
		if (!Meteor.userId()) {
			this.redirect('login');
		} else {
			this.next();
		}
	},
	GAnalytics: function () {
		if (process.env.METEOR_ENV === 'production') {
			GAnalytics.pageview(this.url);
		}
	},
	keepPreviousPath: function () {
		Session.set("previousLocationPath", this.originalUrl || this.url);
	}
};
