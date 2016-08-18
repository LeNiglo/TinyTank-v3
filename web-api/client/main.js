/**
* @summary Uses [momentjs](http://momentjs.com/docs/#/displaying/fromnow/) to display a fromNow time
* @name fromNow
* @locus client
* @isHelper true
* @param {Date} datetime
*/
Package.blaze.Blaze.Template.registerHelper('fromNow', function (datetime) {
	return moment(datetime).fromNow();
});
