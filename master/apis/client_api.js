var http = require('http');
var url = require('url');


ClientApi = function (app, db) {

	this.list_servers = function (req, res) {
		Servers.find().toArray(function (err, result) {
			return res.status(200).json({name: 'list_servers', res: JSON.stringify(result), err: err});
		});
	};

	this.login = function (req, res) {
		Users.findOne({
			$or: [{email: req.body.login.toString().toLowerCase()}, {username: new RegExp('^' + req.body.login.toString() + '$', 'i')}]
		}, function (error, exists) {

			if (!exists) {
				return res.status(200).json({name: "login", res: null, err: "Account doesn't exists."});
			} else {
				bcrypt.compare(req.body.password.toString(), exists.password, function (err, result) {
					if (err) {
						return res.status(500).json({name: "login", res: null, err: err});
					} else if (result == false) {
						return res.status(200).json({name: "login", res: null, err: "Passwords didn't match."});
					} else {
						if (!app.get('jwtTokenSecret') == req.body.secret.toString()) {
							return res.status(200).json({name: "login", res: null, err: "You are a cheater."});
						} else {
							Servers.findOne({users: exists.username}, function (error, result) {
								if (!error && result) {
									return res.status(200).json({name: "login", res: null, err: "You are already in game."});
								} else if (error) {
									return res.status(200).json({name: "login", res: null, err: error});
								} else {
									return res.status(200).json({name: "login", res: JSON.stringify(exists), err: null});
								}
							});
						}
					}
				});
			}
		});
	};

};

module.exports = ClientApi;
