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
			console.log("FOUND EVENTS:");
			console.log(events);
			res.json(events);
		});
	}

};
module.exports = EventOps;