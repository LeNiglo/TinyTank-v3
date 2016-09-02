var fullLayoutBackgroundPics = [
	"/img/tank_bg_1.jpg",
	"/img/tank_bg_2.jpg"
];

var animateCSSAnimations = [
	"pulse",
	"shake",
	"bounce"
];

var animateInterval = null;

Template.fullLayout.rendered = () => {
	$.fn.extend({
		animateCss: function (animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			$(this).addClass('animated ' + animationName).one(animationEnd, function () {
				$(this).removeClass('animated ' + animationName);
			});
		}
	});

	$('#leading-image').css('background-image', "url('" + fullLayoutBackgroundPics[Math.floor(Math.random() * fullLayoutBackgroundPics.length)] + "')");

	animateInterval = Meteor.setInterval(() => {
		$('#leading-logo').animateCss(animateCSSAnimations[Math.floor(Math.random() * animateCSSAnimations.length)]);
	}, 12000);
}

Template.fullLayout.destroyed = () => {
	Meteor.clearInterval(animateInterval)
}
