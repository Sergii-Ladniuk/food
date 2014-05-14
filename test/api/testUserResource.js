var assert = require("assert");
var should = require('should');
var UserResource = require('../../api/UserResource').UserResource;
var db = require('../../data/schema/DB.js').mangoose.connection.db;
var UserModel = require('../../data/schema/UserModel').UserModel;
var UserDao = require('../../data/dao/GenericDao.js').Dao.create(UserModel);

var tools = require('./tools');

var dummySaveUserRequest = function (index) {
    return tools.usersRequest()
        .withUserName('user' + index).withPassword('qwe')
        .withGroup('gr').withEmail('qwe@asd.com');
};

// a function used to produce a lot of items in the database to test #list and #count
// result is a function having params:
// limit - how many items to be produced
// callback to call when operation is done
var spamUsers = tools.spammer(UserResource, dummySaveUserRequest);

// sugar
var spam20Users = function (done) {
    return function () {
        spamUsers(20, done);
    }
};

// cleanup function
var cleanup = tools.cleanup('users');

function test(q) {
    return function (done) {
        (typeof (q.f)).should.equal('string');
        (typeof (q.request)).should.equal('object');
        (typeof (q.response)).should.equal('function');
        (typeof (done)).should.equal('function');
        UserResource[q.f](
                q.request || tools.emptyRequest(),
            tools.response(function (data) {
                q.response(data);
                done();
            })
        );
    }
}

function givenAdminUserInDB (done) {
    cleanup(function () {
        UserDao.save({
            username: 'admin',
            password: 'admin',
            email: 'admin@mail.com',
            group: 'admin'
        }, done);
    });
}

var testNoUsers = test({
    f: 'count',
    request: tools.emptyRequest(),
    response: function (data) {
        data.should.have.property('status', 'ok');
        data.should.have.property('count', 0);
    }
});

describe('User API : ', function () {
    describe('#get()', function () {
        before(givenAdminUserInDB);
        it('when id is ok should return a user', function (done) {
            var request = tools.emptyRequest().withId('admin');
            var response = tools.response(function (data) {
                data.should.have.property('username', 'admin');
                data.should.have.property('password', 'admin');
                data.should.have.property('group', 'admin');
                done();
            });
            UserResource.get(request, response);
        });
        it('when bad id should return 404', function (done) {
            var request = tools.emptyRequest().withId('vas');
            var response = tools.response(function (data) {
                data.should.equal(404);
                done();
            });
            UserResource.get(request, response);
        });
        it('when check if user exists with good id should return {answer : yes} ', function (done) {
            var request = tools.usersRequest().withId('admin').checkExists();
            var response = tools.response(function (data) {
                data.should.have.property('answer', 'yes');
                done();
            });
            UserResource.get(request, response);
        });
        it('when check if user exists with bad id should return {answer : no} ', function (done) {
            var request = tools.usersRequest().withId('vas').checkExists();
            var response = tools.response(function (data) {
                data.should.have.property('answer', 'no');
                done();
            });
            UserResource.get(request, response);
        });
    });
    describe('#save()', function () {
        describe('user group is specified in the request data', function () {
            before(cleanup);
            it('when user data is ok should save with no error', function (done) {
                var request = tools.usersRequest()
                    .withUserName('vas').withPassword('qwe')
                    .withGroup('gr').withEmail('qwe@asd.com');
                var response = tools.response(function (data) {
                    data.should.have.property('status', 'ok');
                    done();
                });
                UserResource.save(request, response);
            });
            it('should exist', function (done) {
                var request = tools.usersRequest().withId('vas').checkExists();
                var response = tools.response(function (data) {
                    data.should.have.property('answer', 'yes');
                    done();
                });
                UserResource.get(request, response);
            });
            it('#get should return it with proper data', function (done) {
                var request = tools.emptyRequest().withId('vas');
                var response = tools.response(function (data) {
                    data.should.have.property('username', 'vas');
                    data.should.have.property('password', 'qwe');
                    data.should.have.property('group', 'gr');
                    data.should.have.property('email', 'qwe@asd.com');
                    done();
                });
                UserResource.get(request, response);
            });
        });
        describe('user group is not specified in the request data', function () {
            before(cleanup);
            it('when user data is ok should save with no error', function (done) {
                var request = tools.usersRequest()
                    .withUserName('vas').withPassword('qwe')
                    .withEmail('qwe1@asd.com');
                var response = tools.response(function (data) {
                    data.should.have.property('status', 'ok');
                    done();
                });
                UserResource.save(request, response);
            });
            it('should exist', function (done) {
                var request = tools.usersRequest().withId('vas').checkExists();
                var response = tools.response(function (data) {
                    data.should.have.property('answer', 'yes');
                    done();
                });
                UserResource.get(request, response);
            });
            it('#get should return it with proper data', function (done) {
                var request = tools.emptyRequest().withId('vas');
                var response = tools.response(function (data) {
                    data.should.have.property('username', 'vas');
                    data.should.have.property('password', 'qwe');
                    data.should.have.property('group', 'user');
                    data.should.have.property('email', 'qwe1@asd.com');
                    done();
                });
                UserResource.get(request, response);
            });
        });

        describe('user data is wrong', function () {
            before(cleanup);
            it('when no user name', function (done) {
                var request = tools.usersRequest()
                    .withPassword('qwe')
                    .withEmail('qwe1@asd.com');
                var response = tools.response(function (data) {
                    data.should.equal(500);
                    done();
                });
                UserResource.save(request, response);
            });
            it('when no password', function (done) {
                var request = tools.usersRequest()
                    .withUserName('vas')
                    .withEmail('qwe1@asd.com');
                var response = tools.response(function (data) {
                    data.should.equal(500);
                    done();
                });
                UserResource.save(request, response);
            });
            it('when user name is too long', function (done) {
                var request = tools.usersRequest()
                    .withUserName('vasvasvasvasvasvasvasvasvasvasvasvasvasvasvasvasvasvasvasvasvasvasvasvasvas')
                    .withPassword('qwe')
                    .withEmail('qwe1@asd.com');
                var response = tools.response(function (data) {
                    data.should.equal(500);
                    done();
                });
                UserResource.save(request, response);
            });
            it('when no email', function (done) {
                var request = tools.usersRequest()
                    .withUserName('vas').withPassword('qwe');
                var response = tools.response(function (data) {
                    data.should.equal(500);
                    done();
                });
                UserResource.save(request, response);
            });
            it('no users saved => #count returns 0', testNoUsers);
        });
    });

    describe('#list()', function () {
        before(cleanup);
        it('when no users should return empty array (with zero length)', test({
                f: 'list',
                request: tools.emptyRequest(),
                response: function (data) {
                    data.length.should.equal(0);
                }
            })
        );
        describe('paging: ', function () {
            before(function (done) {
                cleanup(spam20Users(done));
            });
            it('when no paging params should return all users sorted by name', test({
                    f: 'list',
                    request: tools.emptyRequest(),
                    response: function (data) {
                        data.length.should.equal(20);
                        data[0].should.have.property('username', 'user0');
                        data[19].should.have.property('username', 'user9');
                    }
                })
            );
            it('when paging size = 5 and page number = 2 should return 5 users sorted by name', test({
                    f: 'list',
                    request: tools.emptyRequest().withPageNumber(2).withPageSize(5),
                    response: function (data) {
                        data.length.should.equal(5);
                        data[0].should.have.property('username', 'user13');
                        data[4].should.have.property('username', 'user17');
                    }
                })
            );
        });
    });

    describe('#count()', function () {
        describe('no users in the db', function () {
            before(cleanup);
            it('when no users in the db should return 0', testNoUsers);
        });
        describe('20 users in the db', function () {
            before(function (done) {
                cleanup(spam20Users(done));
            });
            it('when 20 users in the db should return 20', test({
                    f: 'count',
                    request: tools.emptyRequest(),
                    response: function (data) {
                        data.should.have.property('status', 'ok');
                        data.should.have.property('count', 20);
                    }
                })
            );
        });
    });

    describe('#remove', function () {
        describe('no users in the db', function () {
            before(cleanup);
            it('should fail and return 404', test({
                f: 'remove',
                request: tools.emptyRequest().withId('admin'),
                response: function (data) {
                    data.should.equal(404);
                }
            }));
        });
        describe('given one admin user in the database', function() {
            before(givenAdminUserInDB);
            it('should remove the only user successfully', test({
                f: 'remove',
                request: tools.emptyRequest().withId('admin'),
                response: function (data) {
                    data.should.have.property('status', 'ok');
                }
            }));
            it('should be no users in the db', testNoUsers);
        });
    });
});