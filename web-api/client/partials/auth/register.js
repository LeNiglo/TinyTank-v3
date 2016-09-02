Template.register.events({
	"submit #register-form": (e) => {
		e.preventDefault();

		var user = {
			username: e.currentTarget.username.value,
			email: e.currentTarget.email.value,
			password: e.currentTarget.password.value,
			profile: {
				firstname: e.currentTarget.firstname.value,
				lastname: e.currentTarget.lastname.value,
				country: e.currentTarget.country.value
			}
		};

		Meteor.call('create_user', user, (error, result) => {
			if (error) FlashMessages.sendError(error.reason);
			else {
				FlashMessages.sendInfo("Registered");
				Router.go('profile', {_username: result});
				Meteor.loginWithPassword(user.username, user.password);
			}
		});
		return false;
	}
});
