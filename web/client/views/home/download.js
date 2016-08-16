Template.download.events({
	"click #download-button": function () {
		//TODO keep track of download history (date + user if available)
	}
});

Template.download.created = function() {
	document.title = "Download TinyTank";
}

Template.download.rendered = function() { }

Template.download.destroyed = function() { }
