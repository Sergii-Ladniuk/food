var should = require('should');

exports.emptyRequest = function () {
    return {
        query: {},
        params: {},
        body: {},
        withId: function(id) {
            this.params.id = id;
            return this;
        }, withPageNumber: function(page) {
            this.query.pageNumber = page;
            return this;
        }, withPageSize: function(size) {
            this.query.pageSize = size;
            return this;
        }
    };
};


exports.usersRequest = function() {
    var r = exports.emptyRequest();
    r.withUserName = function (userName) {
        r.body.username = userName;
        return r;
    };
    r.withPassword = function(password) {
        r.body.password = password;
        return r;
    };
    r.withGroup = function(group) {
        r.body.group = group;
        return r;
    };
    r.withEmail = function(email) {
        r.body.email = email;
        return r;
    };
    r.checkExists = function() {
        r.query.checkExists = true;
        return r;
    };
    return r;
};

exports.response = function (send) {
    (typeof send).should.equal('function');
    return {
        send: function(data) {
            console.log(data);
            should.exist(data);
            send(data);
        }
    };
};

exports.spammer = function (Resource, dummyRequest) {
    function spamProducts(current, limit, callback) {
        if (current < limit) {
            Resource.save(dummyRequest(current), exports.response(function () {
                spamProducts(current + 1, limit, callback);
            }));
        } else {
            callback();
        }
    };
    return function(limit, callback) {
        spamProducts(0, limit, callback);
    };
};

