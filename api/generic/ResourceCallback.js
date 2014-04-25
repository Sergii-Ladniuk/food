exports.Callbacks = {
    create: function (defaultResourceName) {
        return {
            loadCallback: function (resp) {
                return function (err, result) {
                    if (!err && result)
                        resp.send(result);
                    else {
                        resp.status = 404;
                        resp.send({ status: 'fail' });
                    }
                }
            }, saveCallback: function (response) {
                return function (err) {
                    if (err) {
                        console.log(err);
                        response.status = 500;
                        response.send({ status: 'fail' });
                    } else {
                        response.send({ status: 'ok' });
                    }
                }
            }, deleteCallback: function (response) {
                return function (err, result) {
                    if (!err) {
                        result.remove();
                        response.send({ status: 'ok' });
                    } else {
                        response.status = 404;
                        response.send({ status: 'fail' });
                    }
                }
            }
        }
    }
};