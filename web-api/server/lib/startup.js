import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	/* Logger */
	this.log = new Logger();
	new LoggerConsole(log).enable();

	/* SimpleRest API */
	SimpleRest.configure({
		collections: []
	});

	Meteor.setInterval(() => {
		// Set servers as inactive after 5 minutes
		var threshold = moment().add(-2, 'minutes');

		log.debug("Checking for old servers ... (" + threshold.fromNow() + ")", threshold.toDate());

		Servers.remove({lastActive: {$lt: threshold.toDate()}}, (err, res) => {
			if (err) log.error(err);
			if (res > 0) log.info('removed ' + res + ' servers.');
		});
	}, 60000);

});
