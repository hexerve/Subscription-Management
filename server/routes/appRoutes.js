'use strict';
module.exports = function(app) {
  var mongoose = require('mongoose');

    // Routes
    app.get("/", function(req, res){
        res.send({statusCode: 200, status: "OK"});
    });

    app.get('*', function(req, res) {
        res.send({statusCode: 404, status: "Not Found"});
    });

};  
