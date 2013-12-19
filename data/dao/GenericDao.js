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
            }
        }
    }
}