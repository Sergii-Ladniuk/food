exports.Callbacks = {
    create: function (defaultResourceName) {
        return {
            loadCallback: function (response) {
                return function (err, result) {
                    if (!result) {
                        response.send(404);
                    } else if (err) {
                        console.log(err);
                        response.send(500);
                    } else {
                        response.send(result);
                    }
                }
            }, saveCallback: function (response) {
                return function (err) {
                    if (err) {
                        console.log(err);
                        response.send(500);
                    } else {
                        response.send({ status: 'ok' });
                    }
                }
            }, deleteCallback: function (response) {
                return function (err, result) {
                    if (!result) {
                        response.send(404);
                    } else if (err) {
                        console.log(err);
                        response.send(500);
                    } else {
                        result.remove(function (err) {
                            if (err) {
                                console.log(err);
                                response.send(500);
                            } else {
                                response.send({ status: 'ok' });
                            }
                        });
                    }
                }
            }
        }
    }
};