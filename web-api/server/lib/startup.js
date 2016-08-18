import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	/* Logger */
	this.log = new Logger();
	new LoggerConsole(log).enable();

	/* SimpleRest API */
	SimpleRest.configure({
		collections: []
	});

});
