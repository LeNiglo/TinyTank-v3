var http = require('http');
var url = require('url');


ServerApi = function (app, db) {

	this.init_server = function (req, res) {
		Servers.insert({
			name: req.body.gameName,
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
			ports: {
				udp: req.body.udpPort,
				tcp: req.body.tcpPort
			},
			users: [],
			map: req.body.map,
			started_at: new Date(),
			last_active: new Date()
		}, function (err, result) {
			return res.status(200).json({
				name: 'init_server',
				res: (err ? false : true),
				err: (err ? err.toString() : null),
				id: result[0]._id.toString()
			});
		});
	};

	this.stop_server = function (req, res) {
		Servers.remove({_id: new ObjectID(req.body.serverId)}, function (err, result) {
			return res.status(200).json({
				name: 'stop_server',
				res: (result != 0),
				err: (err ? err.toString() : (result == 0 ? "serverId not found." : null))
			});
		});
	};

	this.update_last_active = function (req, res) {
		Servers.update({_id: new ObjectID(req.body.serverId)}, {$set: {last_active: new Date()}}, function (err, result) {
			return res.status(200).json({
				name: 'update_last_active',
				res: (result != 0),
				err: (err ? err.toString() : (result == 0 ? "serverId not found." : null))
			});
		});
	};

	this.change_map = function (req, res) {
		Servers.update({_id: new ObjectID(req.body.serverId)}, {$set: {map: req.body.map}}, function (err, result) {
			return res.status(200).json({
				name: 'change_map',
				res: (result != 0),
				err: (err ? err.toString() : (result == 0 ? "serverId not found." : null))
			});
		});
	};

	this.add_user = function (req, res) {
		Servers.update({_id: new ObjectID(req.body.serverId)}, {$push: {users: req.body.username}}, function (err, result) {
			return res.status(200).json({
				name: 'add_user',
				res: (result != 0),
				err: (err ? err.toString() : (result == 0 ? "serverId not found." : null))
			});
		});
	};

	this.remove_user = function (req, res) {
		Servers.update({_id: new ObjectID(req.body.serverId)}, {$pull: {users: req.body.username}}, function (err, result) {
			return res.status(200).json({
				name: 'remove_user',
				res: (result != 0),
				err: (err ? err.toString() : (result == 0 ? "serverId not found." : null))
			});
		});
	};

	this.add_game_stats = function (req, res) {
		console.log(req.body, req.query, req.params);
		var obj = {
			name: req.body.gameName,
			created_at: new Date(),
			users: req.body.players
		};
		Matches.insert(obj, function (err, result) {
			if (!err & result) {
				return res.status(200).json({name: 'add_game_stats', res: true, err: null});
			}
		});
	};

	this.get_tank_list = function (req, res) {
		Tanks.find().toArray(function (err, result) {
			return res.status(200).json({name: 'get_tank_list', res: result, err: err});
		});
	};

};

module.exports = ServerApi;
