var tinyHomeMessages = [
	"Have Fun",
	"Get Blasted",
	"Rank Up"
];
var tinyHomeColors = [
	"#f15841",
	"#CC0000",
	"#7F2626"
]
var tinyHomeIndex = 0;
var	intervalChangeHomeMessage = null;

function writeHomeMessage() {
	$('#tinyHomeMessage').css("color", tinyHomeColors[tinyHomeIndex]).shuffleLetters({
		"text": tinyHomeMessages[tinyHomeIndex]
	});
}

Template.home.created = function () {
	document.title = "TinyTank";
	$.getScript('js/shuffle-letters.js', () => {
		intervalChangeHomeMessage = Meteor.setInterval(() => {
			++tinyHomeIndex;
			if (tinyHomeIndex == tinyHomeMessages.length) {
				tinyHomeIndex = 0;
			}
			writeHomeMessage();
		}, 2000);
	});
}

Template.home.rendered = function () { }

Template.home.destroyed = function () {
	if (intervalChangeHomeMessage != null) {
		Meteor.clearInterval(intervalChangeHomeMessage);
	}
}
