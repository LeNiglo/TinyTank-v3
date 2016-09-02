Template.downloads.events({
	"click a.sys-logo": function (e) {
		var $this = $(e.currentTarget);

		var downloadObject = {
			sys: $this.data('sys')
		};

		Meteor.call('download_game', downloadObject, (error, result) => {
			if (error) console.error(error);
			else FlashMessages.sendInfo("Your download has been started. Thank you !");
		});
	}
});

Template.downloads.created = function () {
	document.title = "TinyTank::Downloads";
}

Template.downloads.rendered = function () { }

Template.downloads.destroyed = function () { }
