var Event = require('./models').event;

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
	getUserEvent: function(req,res) {
		var username = req.body.username || "";
		if (username == "") return res.send(400);

		Event.find({username:username}, function(err,events) {
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
					console.log(err)
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
					console.log(err)
				} 
				res.send("Success!");
		});
	}
};
module.exports = EventOps;