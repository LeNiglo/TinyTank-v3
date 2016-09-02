Template.logout.events({
	"click #logout-button": (e) => {
		e.preventDefault();

		Meteor.logout((error) => {
			if (error) console.error(error);
			else {
				FlashMessages.sendInfo("Logged Out");
				// Router.go('login');
			}
		});
	}
})
