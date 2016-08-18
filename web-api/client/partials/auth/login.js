Template.login.events({
	"submit #login-form": (e) => {
		e.preventDefault();

		Meteor.loginWithPassword(e.currentTarget.username.value, e.currentTarget.password.value, (error) => {
			if (error) console.error(error);
			else console.log("Logged In");
		});

	}
});
