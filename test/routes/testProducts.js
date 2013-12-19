//var app = require('../../app').app
//    , http = require('http');
//
//describe('User API',function(){
//
//    before(function(done){
//        http.createServer(app).listen(app.get('port'),done);
//
//        console.log("test server created")
//    });
//
//    it('GET /products should return 200',function(done){
//        request()
//            .get('/products')
//            .expect(200,done);
//    });
//
//    it('PUT /products should return 200',function(done){
//        request()
//            .put('/products')
//            .set('Content-Type','application/json')
//            .write(JSON.stringify({ username: 'test', password: 'pass' }))
//            .expect(200,done);
//    });
//});