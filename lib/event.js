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
		var event = req.body.event || "";
		if (event == "") return res.send(401);
		Event.findOneAndUpdate({_id:event._id},
			{
				title:event.title,
				username:event.username,
				name: event.name,
				end: event.end,
				start: event.start,
				location: event.location,
				tags: event.tags, 
				descripton: event.description
			}, function(err, event) {
				if (err) {
					res.send(401);
					console.log(err)
				} 
				res.send("Success!");
		});
	}

};
module.exports = EventOps;