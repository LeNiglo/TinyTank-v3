var tinyHomeMessages = [
	"Have Fun",
	"Get Blasted",
	"Rank Up"
];
var tinyHomeColors = [
	"#7F0000",
	"#CC0000",
	"#7F2626"
]
var tinyHomeIndex = 0;

function writeHomeMessage() {
	$('#tinyHomeMessage').css("color", tinyHomeColors[tinyHomeIndex]).shuffleLetters({
		"text": tinyHomeMessages[tinyHomeIndex]
	});
}

Template.home.created = function() {
	document.title = "TinyTank";
	intervalChangeHomeMessage = null;
	$.getScript('js/shuffle-letters.js', function () {
		intervalChangeHomeMessage = Meteor.setInterval(function() {
			++tinyHomeIndex;
			if (tinyHomeIndex == tinyHomeMessages.length) {
				tinyHomeIndex = 0;
			}
			writeHomeMessage();
		}, 3000);
	});
}

Template.home.rendered = function() { }

Template.home.destroyed = function() {
	if (intervalChangeHomeMessage != null) {
		Meteor.clearInterval(intervalChangeHomeMessage);
	}
}
