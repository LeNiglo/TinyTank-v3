import { Session } from 'meteor/session';

Template.login.events({
	"submit #login-form": (e) => {
		e.preventDefault();

		Meteor.loginWithPassword(e.currentTarget.username.value, e.currentTarget.password.value, (error) => {
			if (error) FlashMessages.sendError(error);
			else {
				FlashMessages.sendInfo("Logged In");
				Router.go(Session.get('previousLocationPath') ? Session.get('previousLocationPath') : 'profile');
			}
		});

	}
});
