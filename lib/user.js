var User = require('./models').user,
jwt = require('express-jwt');

var Accounts = {
    login : function(req,res) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        if (username == '' || password == '') {
            return res.send(401, {error: "Invalid login details"});
        }

        User.findOne({username: username}, function (err, user) {
            if (err) {
                console.error(err);
                return res.send(401,  {error: "Invalid login details"});
            }
            if (user == null) {
                return res.send(401,  {error: "Invalid login details"});
            } 
            user.comparePassword(password, function(isMatch) {
                if (!isMatch) {
                    console.log("Attempt failed to login with " + user.username);
                    return res.send(401, {error: "Invalid login details"});
                }

                //var token = jwt.sign(user, secret.secretToken, { expiresInMinutes: 60 });
                //return res.json({token:token});
                return res.json(user);
            });     
        });
    },
    register: function(req,res) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        var name = req.body.name || '';
        if (username == '' || password == '' || name == '') {
            return res.send(400);
        }

        var newUser = new User({
            username : username,
            password : password,
            name : name    
        });
        newUser.save(function(err,user) {
            if (err) {
                console.error(err);
                return res.send(401,  {error: "User already exists"});
            } 
            return res.send("Success!");
        });
    },
    update: function(req,res) {
        var user = req.body.user;
        if (!user && !user.username) {
            return res.send(400);
        }
        var username = user.username;
        delete user._id;
        delete user.password;
        User.findOneAndUpdate({username: username}, user, function(err,user) {
           if (err) {
                console.error(err);
                return res.send(401);
            } 
            if (user == null) {
                return res.send(400);
            } 
            console.log('Updated user:');
            console.log(user);
            return res.send("Success!");
        });
    },
    changePassword: function(req,res) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        User.findOne({username: username}, function (err, user) {
            if (err) {
                console.log(err);
                return res.send(401,{error: "User not found"});
            }
            user.password = password;
            user.save(function(err,user) {
                if (err) {
                    console.error(err);
                    return res.send(401);
                } 
                return res.send("Success!");
            });
        });
    }
};

module.exports = Accounts;
