/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var products = require('./api/ProductResource');
var users = require('./api/UserResource');

var app = express();

module.exports = app;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
    uploadDir: '/tmp',
    keepExtensions: true
}));
app.use(express.methodOverride());
// todo secret ?
app.use(express.cookieParser('killbill'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var UserModel = require('./data/schema/UserModel.js').UserModel;
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

var isAdmin = function (request, response, next) {
    if (request.isAuthenticated() && request.user.group === 'admin'){
        next();
    }
    else {
        response.send(401);
    }
};

var auth = function (request, response, next) {
    if (request.isAuthenticated()) {
        next();
    }
    else {
        response.send(401);
    }
};

app.post('/products', products.canEdit, products.save);
app.post('/products/import', isAdmin, products.import);
app.get('/products', products.list);
app.get('/products/:id', products.get);
app.delete('/products/:id', products.canEdit, products.remove);
app.delete('/collection/products', isAdmin, products.deleteAllProducts);
app.get('/count/products', products.countProducts);

app.get('/user/:id', isAdmin, users.get);
app.get('/user', isAdmin, users.list);
app.post('/user', users.save);
app.get('/count/user', isAdmin, users.count);
app.delete('/user/:id', isAdmin, users.remove);


app.post('/login',
    passport.authenticate('local', { successRedirect: '/#/'})
);
app.get('/loggedin', users.getCurrentUser);
app.post('/logout', function (request, response) {
    request.logOut();
    response.send(200);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

