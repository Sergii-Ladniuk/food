/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var products = require('./api/ProductResource').ProductResource;
var users = require('./api/UserResource');
var auth = require('./api/Auth');

var app = express();

module.exports = app;

// all environments
app.set('port', process.env.port || 3000);
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

auth.configure();

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.post('/products', products.canEdit, products.save);
app.post('/products/import', auth.isAdmin, products.import);
app.get('/products', products.list);
app.get('/products/:id', products.get);
app.delete('/products/:id', products.canEdit, products.remove);
app.delete('/collection/products', auth.isAdmin, products.deleteAllProducts);
app.get('/count/products', products.countProducts);

app.get('/user/:id', users.get);
app.get('/user', auth.isAdmin, users.list);
app.post('/user', users.save);
app.get('/count/user', auth.isAdmin, users.count);
app.delete('/user/:id', auth.isAdmin, users.remove);


app.post('/login',
    passport.authenticate('local', { successRedirect: '/#/'})
);
app.get('/loggedin', auth.getCurrentUser);
app.post('/logout', function (request, response) {
    request.logOut();
    response.send(200);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

