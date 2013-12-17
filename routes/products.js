var productMode = require('../schema/productModel.js');

exports.add = function(req, res) {
    var target = req.body;
    var callback = function (err) {
        if (err) {
            console.log(err);
        }
    };
    if (!target._id) {
        var product = new productMode.ProductModel(target);
        product.save(callback);
    } else {
        var id = target._id;
        delete target._id;
        productMode.ProductModel.update({_id: id}, target, callback)
    }
    res.send({ status: 'ok' });
}

exports.list = function(req,res) {
    productMode.ProductModel.find(function (err, result) {
        if (!err)
            res.send(result);
        else {
            res.status = 404;
            res.send('Unable load product list.');
        }
    });
}

exports.get = function(req,res) {
    productMode.ProductModel.findOne({_id: req.params.id}, function (err, result) {
        if (!err)
            res.send(result);
        else {
            res.status = 404;
            res.send('Product not found.');
        }
    });
}

exports.remove = function(req,res) {
    productMode.ProductModel.findOne({_id: req.params.id}, function (err, result) {
        if (!err) {
            result.remove();
            res.send({ status: 'ok' });
        } else {
            res.status = 404;
            res.send('Product not found.');
        }
    });
}