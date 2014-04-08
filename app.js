/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var products = require('./api/ProductResource');

var app = express();

module.exports = app;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
    uploadDir: '/tmp/uploads',
    keepExtensions: true
}));
app.use(express.methodOverride());
//app.use(express.cookieParser('your secret here'));
//app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.post('/products', products.save);
app.post('/products/import',  products.import);
app.get('/products', products.list);
app.get('/products/:id', products.get);
app.delete('/products/:id', products.remove);
app.delete('/collection/products', products.deleteAllProducts);
app.get('/count/products', products.countProducts);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
