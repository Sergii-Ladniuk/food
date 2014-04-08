exports.Dao = {
    create: function (Model) {
        return {
            save: function (entity, callback) {
                if (!entity._id) {
                    var product = new Model(entity);
                    product.save(callback);
                } else {
                    var id = entity._id;
                    delete entity._id;
                    Model.update({_id: id}, entity, callback);
                }
            },
            insertAll: function (entities, preprocess, callback) {
                var me = this;
                var recursiveCallback = function(err) {
                    if (err) {
                        console.log("error during insertAll " + err);
                    }
                    var nextEntity = preprocess(entities.pop());
                    if (entities.length == 0) {
                        me.save(nextEntity, callback);
                    } else {
                        me.save(nextEntity, recursiveCallback);
                    }
                };
                recursiveCallback();
            }
        }
    }
};