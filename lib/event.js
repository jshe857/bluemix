var Event = require('./models').event;
var MAX_RESULTS=30;
var EventOps = {
	create: function(req,res) {
		if(!req.body.event) return res.send(400);
		var newEvent = new Event(req.body.event);
		newEvent.save(function(err,user) {
			if (err) {
				console.error(err);
				return res.send(400);
			}
			return res.send("Success!");
		});
	},
	getEvents: function(req,res) {
		var filter = req.body || "";
		if (filter == "") return res.send(400, {error:"No filter specified"});
		var results = Event.find(filter).sort({'start':-1}).limit(MAX_RESULTS);
		results.exec(function(err,events) {
			console.log(events);
			res.json(events);
		});
	},
	update: function(req,res) {
		var event = req.body.event || ""
		if (event == "") return res.send(401);
		var id = event._id;
		delete event._id;
		Event.findByIdAndUpdate(id,
			event, function(err, event) {
				if (err) {
					res.send(401);
					console.log(err);
				}
				res.send("Success!");
		});
	},
	remove: function(req,res) {
		var event = req.body.event || ""
		if (event == "") return res.send(401);
		var id = event._id;
		Event.findByIdAndRemove(id,
		function(err,event){
				if (err) {
					res.send(401);
					console.log(err);
				}
				res.send("Success!");
				console.log(event);
				console.log(" was deleted")
		});
	}
};
module.exports = EventOps;
