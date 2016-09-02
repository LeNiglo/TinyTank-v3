Template.profile.created = function () {
	document.title = this.data.username + " @TinyTank::Profile";
}

Template.profile.helpers({
	getAccuracy: (stats) => {
		return (!stats || stats.shotsFired == 0) ? 0 : (stats.shotsHit * 100 / stats.shotsFired).toFixed(2);
	}
})
