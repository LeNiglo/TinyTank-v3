var hooks = require('./hooks');

Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading',
	onRun: hooks.GAnalytics,
	onStop: hooks.keepPreviousPath,
	onBeforeAction: function () {
		this.next();
	}
});

Router.onBeforeAction(hooks.redirectIfLoggedIn, {only: ['login', 'register']});
Router.onBeforeAction(hooks.redirectIfNotLoggedIn, {only: []});

Router.map(function () {

	this.route('index', {
		path: '/',
		template: 'home',
		layoutTemplate: 'fullLayout'
	});

	this.route('home', {
		layoutTemplate: 'fullLayout'
	});

	this.route('profile/:_username?', {
		onBeforeAction: function () {
			if (!this.params['_username'] && !Meteor.userId()) {
				this.redirect('login');
			} else {
				this.next();
			}
		},
		layoutTemplate: 'fullLayout',
		name: 'profile',
		waitOn: function () {
			if (this.params['_username']) return [Meteor.subscribe('user', this.params['_username'])];
			else return [];
		},
		data: function () {
			if (this.params['_username']) return Meteor.users.findOne({$or : [{username: this.params['_username']}, {_id: this.params['_username']}]});
			else return Meteor.users.findOne(Meteor.userId());
		},
		action: function () {
			if (!this.data()) {
				this.render('not-found');
			} else {
				this.render();
			}
		}
	});

	this.route('login');
	this.route('register');

	this.route('ladder');

	this.route('servers-list', {
		waitOn: function () {
			return [Meteor.subscribe('active_servers')];
		}
	});

	this.route('about', {
		layoutTemplate: 'fullLayout'
	});

	this.route('downloads', {
		layoutTemplate: 'fullLayout'
	});
});
