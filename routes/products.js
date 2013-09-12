var mappings = require('../schema/product.js');

exports.add = function(req, res) {
    var product = new mappings.model({
        title: req.body.title,
        description: req.body.description
    });
    product.save(function(err){
        if (err) {
            console.log(err);
        }
    });
    res.send({
        status: 'ok'
    });
}