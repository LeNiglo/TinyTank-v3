Meteor.startup(() => {
	$.getScript('https://maxcdn.bootstrapcdn.com/bootstrap/latest/js/bootstrap.min.js');
});


Template.registerHelper('object', function ({ hash }) {
	console.log(hash);
	return hash;
});

Template.registerHelper('array', function () {
	console.log(Array.from(arguments).slice(0, arguments.length - 1));
	return Array.from(arguments).slice(0, arguments.length - 1);
});

/**
* @summary Uses [momentjs](http://momentjs.com/docs/#/displaying/fromnow/) to display a fromNow time
* @name fromNow
* @locus client
* @isHelper true
* @param {Date} datetime
* @return {String} fromNow "10 seconds ago"
*/
Template.registerHelper('fromNow', (datetime) => {
	return moment(datetime).fromNow();
});

/**
* @summary Check if the route matches the template to define the active nav item
* @name activeIfTemplateIs
* @locus client
* @isHelper true
* @param {String} regex Regex string of
* @return {String} active 'active' class or nothing
*/
Template.registerHelper('isActive', (expression) => {
	var currentRoute = Router.current().route;
	var reg = new RegExp('^(' + expression + ')$', 'i');
	return currentRoute && reg.test(currentRoute.getName()) ? 'active' : '';
});

/**
* @summary Get all the available countries
* @name getCountries
* @locus client
* @isHelper true
* @return {Object} country with code (2 char) and display name.
*/
Template.registerHelper('getCountries', () => {
	return [
		{code: "fr", name: "France"},
		{code: "gb", name: "United Kingdom"},
		{code: "es", name: "Spain"},
		{code: "it", name: "Italia"},
		{code: "de", name: "Germany"},
		{code: "be", name: "Belgium"},
		{code: "us", name: "United States"},
		{code: "cn", name: "China"},
		{code: "kr", name: "Korea"},
		{code: "jp", name: "Japan"},
		{code: "sc", name: "Other"}
	];
});
