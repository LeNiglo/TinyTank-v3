Template.logout.events({
	"click #logout-button": (e) => {
		e.preventDefault();

		Meteor.logout((error) => {
			if (error) console.error(error);
			else console.log("Logged Out");
		})
	}
})
