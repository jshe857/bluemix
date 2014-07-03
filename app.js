var express = require('express');

// setup middleware
var app = express(),
bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json())


//connect to db
var mongoose = require('mongoose');
if (process.env.VCAP_SERVICES) {
	env = JSON.parse(process.env.VCAP_SERVICES);
	mongo = env['MongoLab-1.0'][0].credentials;
} else {
	mongo = {url:"mongodb://127.0.0.1/local"};
	console.log("Using local mongo instance!");
}
var connect = function() {
	var options = { server: { socketOptions: { keepAlive: 1 } } };
	mongoose.connect(mongo.url, options);
}
connect();

var db = mongoose.connection;
// Error handler
db.on('error', function (err) {
  console.log(err)
})
// Reconnect when closed
db.on('disconnected', function () {
  connect();
});

//set up to allow cross origin - build rest api
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
 });

// render index page
app.get('/', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("Welcome to Jeff's server!\n");
    res.write("Using db @" + mongo.url);
	res.end();
});

app.use(require('./router'));


// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);
console.log('App started on port ' + port);

