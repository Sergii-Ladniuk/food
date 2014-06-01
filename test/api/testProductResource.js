var assert = require("assert");
var should = require('should');
var ProductResource = require('../../api/ProductResource').ProductResource;
var testData = {};
var db = require('../../data/schema/DB.js').mangoose.connection.db;

var dummySaveProductRequest = function (index) {
    return {
        body: {
            title: 'dummy' + index,
            description: 'descr',
            calories: '10',
            proteins: '10.1',
            fats: '1',
            carbs: '2',
            owner: 'dummy user'
        }
    };
};

var tools = require('./tools');

var spamProducts = tools.spammer(ProductResource, dummySaveProductRequest);

var response = function (send) {
    (typeof send).should.equal('function');
    return {
        send: send
    };
};

describe('Product API : ', function () {
    describe('#save()', function () {
        it('should return success when data is ok', function (done) {
            ProductResource.save(
                dummySaveProductRequest(''),
                {
                    send: function (data) {
                        console.log(data);
                        should.exist(data);
                        data.should.have.property('status', 'ok');
                        should.exist(data.id);
                        testData.productId = data.id;
                        done();
                    }
                }
            );
        });
        it('should fail on negative calories', function (done) {
            ProductResource.save(
                {
                    body: {
                        title: 'dummy',
                        description: 'descr',
                        calories: '-10',
                        proteins: '10.1',
                        fats: '1',
                        carbs: '2',
                        owner: 'dummy user'
                    }
                }, {
                    send: function (data) {
                        console.log(data);
                        should.exist(data);
                        data.should.equal(500);
                        done();
                    }
                }
            );
        });
        it('should fail on negative proteins', function (done) {
            ProductResource.save(
                {
                    body: {
                        title: 'dummy',
                        description: 'descr',
                        calories: '10',
                        proteins: '-10.1',
                        fats: '1',
                        carbs: '2',
                        owner: 'dummy user'
                    }
                }, {
                    send: function (data) {
                        console.log(data);
                        should.exist(data);
                        data.should.equal(500);
                        done();
                    }
                }
            );
        });
        it('should fail on negative fats', function (done) {
            ProductResource.save(
                {
                    body: {
                        title: 'dummy',
                        description: 'descr',
                        calories: '10',
                        proteins: '10.1',
                        fats: '-1',
                        carbs: '2',
                        owner: 'dummy user'
                    }
                }, {
                    send: function (data) {
                        console.log(data);
                        should.exist(data);
                        data.should.equal(500);
                        done();
                    }
                }
            );
        });
        it('should fail on negative carbs', function (done) {
            ProductResource.save(
                {
                    body: {
                        title: 'dummy',
                        description: 'descr',
                        calories: '10',
                        proteins: '10.1',
                        fats: '1',
                        carbs: '-2',
                        owner: 'dummy user'
                    }
                }, {
                    send: function (data) {
                        console.log(data);
                        should.exist(data);
                        data.should.equal(500);
                        done();
                    }
                }
            );
        });
        it('should fail on too long title', function (done) {
            ProductResource.save(
                {
                    body: {
                        title: 'dummydummydummydummydummydummydummydummydummydummydummydummydummydummydummydummydummydummydummydummydummy',
                        description: 'descr',
                        calories: '10',
                        proteins: '10.1',
                        fats: '1',
                        carbs: '-2',
                        owner: 'dummy user'
                    }
                }, {
                    send: function (data) {
                        console.log(data);
                        should.exist(data);
                        data.should.equal(500);
                        done();
                    }
                }
            );
        });
        it('should fail without title', function (done) {
            ProductResource.save(
                {
                    body: {
                        description: 'descr',
                        calories: '10',
                        proteins: '10.1',
                        fats: '1',
                        carbs: '2',
                        owner: 'dummy user'
                    }
                }, {
                    send: function (data) {
                        console.log(data);
                        should.exist(data);
                        data.should.equal(500);
                        done();
                    }
                }
            );
        });
    });
    describe('#get()', function () {
        it('should return success when data product id is correct', function (done) {
            ProductResource.get(
                {
                    params: {
                        id: testData.productId
                    }, query: {}
                }, {
                    send: function (data) {
                        console.log(data);
                        should.exist(data);
                        data.should.have.property('title', 'dummy');
                        data.should.have.property('calories', '10');
                        data.should.have.property('proteins', '10.1');
                        data.should.have.property('fats', '1');
                        data.should.have.property('carbs', '2');
                        data.should.have.property('owner', 'dummy user');
                        done();
                    }
                }
            );
        });
        it('should return 404 when id is wrong', function (done) {
            ProductResource.get(
                {
                    params: {
                        id: '123213231'
                    }, query: {}
                }, {
                    send: function (data) {
                        console.log(data);
                        should.exist(data);
                        data.should.equal(404);
                        done();
                    }
                }
            );
        });
    });
    describe('#remove()', function () {
        it('should return success when data product id is correct', function (done) {
            ProductResource.remove(
                {
                    params: {
                        id: testData.productId
                    }
                }, {
                    send: function (data) {
                        console.log(data);
                        should.exist(data);
                        data.should.have.property('status', 'ok');
                        done();
                    }
                }
            );
        });
        it('should return 404 when id is wrong', function (done) {
            ProductResource.remove(
                {
                    params: {
                        id: '123213231'
                    }
                }, {
                    send: function (data) {
                        console.log(data);
                        should.exist(data);
                        data.should.equal(404);
                        done();
                    }
                }
            );
        });
    });

    describe('#count()', function () {
        it('should return 0 when there is no products', function (done) {
            db.dropCollection('products', function () {
                ProductResource.count(
                    tools.emptyRequest(), {
                        send: function (data) {
                            console.log(data);
                            should.exist(data);
                            data.status.should.equal('ok');
                            data.count.should.equal(0);
                            done();
                        }
                    }
                );
            });
        });
        it('should return 2 when there is 2 products', function (done) {
            ProductResource.save(dummySaveProductRequest(1),
                {
                    send: function () {
                        ProductResource.save(dummySaveProductRequest(2),
                            {
                                send: function () {
                                    ProductResource.count(
                                        tools.emptyRequest(), {
                                            send: function (data) {
                                                console.log(data);
                                                should.exist(data);
                                                data.status.should.equal('ok');
                                                data.count.should.equal(2);
                                                done();
                                            }
                                        }
                                    );
                                }
                            });
                    }
                });
        });
    });

    describe('#list()', function () {

        before(function (done) {
            db.dropCollection('products', function () {
                spamProducts(20, done)
            });
        });

        it('should return 20 products when there is 20 in the database', function (done) {
            ProductResource.list(tools.emptyRequest(),
                response(function (data) {
                        console.log(data);
                        console.log(data.length);
                        should.exist(data);
                        data.length.should.equal(20);
                        done();
                    }
                )
            );
        });

        it('should return the first page with size 5 having products ## 0,1,10,11,12 (sorted by title)', function (done) {
            ProductResource.list({
                    query: {
                        pageNumber: 1,
                        pageSize: 5
                    }
                },
                response(function (data) {
                        console.log(data);
                        console.log(data.length);
                        should.exist(data);
                        data.length.should.equal(5);
                        data[0].title.should.equal('dummy0');
                        data[1].title.should.equal('dummy1');
                        data[2].title.should.equal('dummy10');
                        data[3].title.should.equal('dummy11');
                        data[4].title.should.equal('dummy12');
                        done();
                    }
                )
            );
        });

        it('should return the second page with size 2 having products ## 10, 11 (sorted by title)', function (done) {
            ProductResource.list({
                    query: {
                        pageNumber: 2,
                        pageSize: 2
                    }
                },
                response(function (data) {
                        console.log(data);
                        console.log(data.length);
                        should.exist(data);
                        data.length.should.equal(2);
                        data[0].title.should.equal('dummy10');
                        data[1].title.should.equal('dummy11');
                        done();
                    }
                )
            );
        });

        it('#list regex', function (done) {
            ProductResource.list({
                    query: {
                        column: 'title',
                        q: 'dummy1'
                    }
                },
                response(function (data) {
                        console.log(data);
                        console.log(data.length);
                        should.exist(data);
                        data.length.should.equal(11);
                        done();
                    }
                )
            )
        })

        it('#list regex with desired', function (done) {
            ProductResource.list({
                    query: {
                        column: 'title',
                        q: 'y1',
                        desired: 10
                    }
                },
                response(function (data) {
                        console.log(data);
                        console.log(data.length);
                        should.exist(data);
                        data.length.should.equal(11);
                        done();
                    }
                )
            )
        })

        after(function (done) {
            db.dropCollection('products', done);
        });
    });
});