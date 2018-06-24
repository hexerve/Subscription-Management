'use strict';
module.exports = function(app) {
    var vendorControllers = require('../controllers/vendorController');
    var userControllers = require('../controllers/userController');

    var VerifyToken = require('./VerifyToken');

    // Routes
    app.get("/", function(req, res){
        res.send({statusCode: 200, status: "OK"});
    });

    
    //vendor routes
    app.get("/vendors/secret", VerifyToken, vendorControllers.current_vendor);

    app.post("/vendors/register", vendorControllers.register);
    
    app.post("/vendors/login", vendorControllers.login);

    app.get('/vendors/logout', function(req, res) {
        res.send({statusCode: 200, auth: false, token: null});
    });
    

    // user Routes
    app.post("/users/register", userControllers.register);

    app.post("/users/login", userControllers.login);

    app.get("/users/secret", VerifyToken, userControllers.current_user);

    app.get('users/logout', function(req, res) {
        res.send({statusCode: 200, auth: false, token: null});
    });


    // star routes
    app.get('*', function(req, res) {
        res.send({statusCode: 404, status: "Not Found"});
    });

    app.post('*', function(req, res) {
        res.send({statusCode: 404, status: "Not Found"});
    });

};  
