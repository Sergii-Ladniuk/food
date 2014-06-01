var UserModel = require('../data/schema/UserModel.js').UserModel;
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

exports.configure = function () {

    passport.use(new LocalStrategy(
        function (username, password, done) {
            console.log(username);
            console.log(password);
            UserModel.findOne({username: username}, function (err, loadedUser) {
                if (!err && loadedUser) {
                    // todo dummy impl
                    if (loadedUser.password === password) {
                        console.log('ok');
                        return done(null, loadedUser);
                    } else {
                        console.log('bad password');
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                } else {
                    if (err) {
                        console.log(err);
                        return done(err);
                    } else {
                        console.log('no user');
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                }
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (id, done) {
        UserModel.findOne({username: id}, function (err, user) {
            done(err, user);
        });
    });


};

exports.isAdmin = function (request, response, next) {
    if (request.isAuthenticated() && request.user.group === 'admin') {
        next();
    }
    else {
        response.send(401);
    }
};

exports.auth = function (request, response, next) {
    if (request.isAuthenticated()) {
        next();
    }
    else {
        response.send(401);
    }
};

exports.getCurrentUser = function (request, response) {
    response.send(request.isAuthenticated() ? request.user : '0');
};

exports.IsOwnerOrModerator = function (Model) {
    return function (request, response, next) {
        if (request.isAuthenticated()) {
            if (request.user.group === 'admin' || request.user.group === 'moderator') {
                next();
            } else {
                Model.findOne({_id: request.params.id || request.body._id}, function (err, entity) {
                    if (!entity || entity.owner === request.user.username) {
                        next();
                    }
                });
            }
        } else {
            response.send(401);
        }
    }
}
