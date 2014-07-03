var app= require('express').Router();
var user = require('./lib/user');
var event = require('./lib/event');

app.post('/login', user.login);
app.post('/register',user.register);
app.post('/updateUser',user.update);
app.post('/createEvent',event.create);
app.post('/getUserEvent',event.getUserEvent);
module.exports = app;