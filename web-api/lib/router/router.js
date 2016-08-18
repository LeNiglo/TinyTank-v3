Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading',
	onBeforeAction: function() {
		this.next();
	}
});

Router.map(function() {
	this.route('home', {
		path: '/',
		layoutTemplate: 'full-layout'
	});
});
