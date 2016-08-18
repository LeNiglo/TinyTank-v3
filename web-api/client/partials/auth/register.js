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
			}
		};

		Accounts.createUser(user, (error) => {
			if (error) console.error(error);
			else console.log(user);
		});
	}
});
