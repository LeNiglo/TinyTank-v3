var http = require('http');
var url = require('url');
var jwt = require('jwt-simple');


WebApi = function (app, db) {

	this.list_servers = function (req, res) {
		Servers.find().toArray(function (err, result) {
			return res.status(200).json({name: 'list_servers', res: result, err: err});
		});
	};

	this.get_infos = function (req, res) {
		Users.find({}).sort({createdAt: -1}).toArray(function (err, users) {
			if (err) {
				return res.status(500).json({name: 'get_infos', res: false, err: err});
			}
			var nb_users = users.length;
			var last = null;
			if (nb_users > 0)
			last = {
				username: users[0].username,
				_id: users[0]._id,
				createdAt: users[0].createdAt
			};
			return res.status(200).json({name: 'get_infos', res: {last: last, nb_users: nb_users}, err: null});
		});
	}

	this.ladder = function (req, res) {
		//TODO Find a way to calculate through databases !
		ladder = [
			{
				rank: 1,
				username: "LeNiglo",
				_id: "551ac68a894afa47ae65e215",
				gamesPlayed: 1337,
				killCount: 3214,
				accuracy: 85.2
			},
			{
				rank: 2,
				username: "Switi",
				_id: "551ac68a894afa47ae65e214",
				gamesPlayed: 1302,
				killCount: 729,
				accuracy: 87.8
			},
			{
				rank: 3,
				username: "DraymZz",
				_id: "551ac68a894afa47ae65e213",
				gamesPlayed: 668,
				killCount: 520,
				accuracy: 83.0
			},
			{
				rank: 4,
				username: "La Chose",
				_id: "551ac68a894afa47ae65e212",
				gamesPlayed: 932,
				killCount: 414,
				accuracy: 91.2
			},
			{
				rank: 5,
				username: "ZaZa",
				_id: "551ac68a894afa47ae65e211",
				gamesPlayed: 204,
				killCount: 399,
				accuracy: 80.9
			}
		];
		return res.status(200).json({name: 'ladder', res: ladder, err: null});
	};

	this.register = function (req, res) {
		Users.findOne({
			$or: [{email: req.body.email.toLowerCase()}, {username: new RegExp('^' + req.body.username + '$', 'i')}]
		}, function (error, alreadyExist) {

			if (error) {
				return res.status(500).json({name: "register", res: false, err: error});
			} else if (!!alreadyExist) {
				return res.status(200).json({name: "register", res: false, err: "Email of Username already taken."});
			} else {

				var email_re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				var password_re = /^[\W\w]{7,99}$/;
				var username_re = /^[\w\s]{3,20}$/;

				if (!(email_re.test(req.body.email) && password_re.test(req.body.password) && username_re.test(req.body.username))) {
					return res.status(200).json({
						name: "register",
						res: false,
						err: "Parameters aren't correct, please try again with others."
					});
				}

				Users.insert({
					email: req.body.email.toLowerCase(),
					username: req.body.username,
					password: bcrypt.hashSync(req.body.password, 8),
					from: req.body.from,
					active: false,
					createdAt: new Date()
				}, function (err, result) {
					if (err) {
						return res.status(500).json({name: "register", res: false, err: err});
					} else if (!result) {
						return res.status(200).json({name: "register", res: false, err: err});
					} else {

						res.mailer.send('register', {
							to: result.ops[0].email,
							subject: 'Thanks for your registration !',
							activ_link: WEB_URL + '/active/' + result.ops[0]._id,
							down_link: WEB_URL + '/download',
							username: result.ops[0].username
						}, function (err, message) {
							if (err) {
								console.log(err);
								return res.status(500).json({name: "register", res: false, err: err});
							}
							return res.status(200).json({name: "register", res: true, err: null});
						});

					}
				});
			}
		});
	};

	this.login = function (req, res) {
		Users.findOne({
			$or: [{email: req.body.login.toLowerCase()}, {username: new RegExp('^' + req.body.login + '$', 'i')}]
		}, function (error, exists) {
			if (error) {
				return res.status(500).json({name: "login", res: false, err: "Try again."});
			} else if (!exists) {
				return res.status(200).json({name: "login", res: false, err: "Account doesn't exists."});
			} else if (exists.active == false) {
				return res.status(200).json({name: "login", res: false, err: "Account not active."});
			} else {
				bcrypt.compare(req.body.password, exists.password, function (err, result) {

					if (err) {
						return res.status(500).json({name: "login", res: false, err: err});
					} else if (result == false) {
						return res.status(200).json({name: "login", res: false, err: "Passwords didn't match."});
					} else {

						if (!exists.token) {
							var expires = moment().add(7, 'days').toDate();
							exists.token = jwt.encode({
								iss: exists._id,
								exp: expires
							}, app.get('jwtTokenSecret'));
						}

						Users.update({_id: exists._id}, {
							$set: {
								token: exists.token,
								updatedAt: new Date()
							}
						}, function (error, result) {

							return res.status(200).json({name: "login", res: exists, err: null});

						});
					}
				});
			}
		});
	};

	this.active_account = function (req, res) {
		Users.update({_id: new ObjectID(req.body._idUser)}, {$set: {active: true}}, function (error, exists) {
			return res.status(200).json({name: "active_account", res: exists, err: null});
		});
	};

	this.user_profile = function (req, res) {
		var objId = null;
		var regUn = new RegExp('^' + req.query._idUser + '$', 'i');
		try {
			objId = new ObjectID(req.query._idUser);
		} catch (e) {
			console.log(e);
		}
		Users.findOne({
			$or: [{_id: objId}, {username: regUn}]
		}, function (error, exists) {

			exists.stats = {
				gamesPlayed: 0,
				kills: 0,
				deaths: 0,
				score: 0,
				shotsFired: 0,
				shotsHit: 0,
				killsPG: 0,
				deathsPG: 0,
				scorePG: 0,
				shotsFiredPG: 0,
				shotsHitPG: 0
			};

			//TODO add underscore support here

			Matches.find({'users.id': exists._id.toString()}).toArray(function (error, docs) {

				if (docs.length > 0) {
					for (var i = 0; i < docs.length; i++) {
						for (var j = 0; j < docs[i].users.length; j++) {
							if (docs[i].users[j].id == exists._id.toString()) {
								exists.stats.kills += docs[i].users[j].kills;
								exists.stats.deaths += docs[i].users[j].deaths;
								exists.stats.score += docs[i].users[j].currentScore;
								exists.stats.shotsFired += docs[i].users[j].nbShots;
								exists.stats.shotsHit += docs[i].users[j].nbHits;
								break;
							}
						}
					}

					exists.stats.killsPG = exists.stats.kills / docs.length;
					exists.stats.deathsPG = exists.stats.deaths / docs.length;
					exists.stats.scorePG = exists.stats.score / docs.length;
					exists.stats.shotsFiredPG = exists.stats.shotsFired / docs.length;
					exists.stats.shotsHitPG = exists.stats.shotsHit / docs.length;
					exists.stats.gamesPlayed = docs.length;
				}
				return res.status(200).json({name: "user_profile", res: exists, err: null});

			});
		});
	};

	this.get_tank_list = function (req, res) {
		Tanks.find().toArray(function (err, result) {
			return res.status(200).json({name: 'get_tank_list', res: result, err: err});
		});
	};
};

module.exports = WebApi;
