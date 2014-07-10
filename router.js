var app= require('express').Router();
var user = require('./lib/user');
var event = require('./lib/event');
//user model operations
app.post('/login', user.login);
app.post('/register',user.register);
app.post('/updateUser',user.update);

//event model operations
app.post('/createEvent',event.create);
app.post('/getUserEvent',event.getUserEvent);
app.post('/updateEvent',event.update);
app.post('/removeEvent',event.remove)
module.exports = app;