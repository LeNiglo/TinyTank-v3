Template.search.events({
	'submit form[role="search"]': (e) => {
		e.preventDefault();
		var query = $('input[name="search"]').val();

		Meteor.call('is_tank', query, (error, result) => {
			if (error) FlashMessages.sendError(error);
			else {
				if (result === true) {
					Router.go('tank', {_name: query});
				} else {
					Router.go('profile', {_username: query});
				}
			}
		});
		return false;
	},
	'keyup input[name="search"]': (e) => {
		//TODO Play with url _GET ?q=
		var query = $('input[name="search"]').val();
	}
})
