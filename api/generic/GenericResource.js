exports.build = function() {
    return {
        save : function (request, response) {
            dao.save(request.body, Callbacks.saveCallback(response));
        }
    };
};