var mongoose = require('mongoose');
var Vendor = require('../models/vendorModel');
var User = require('../models/userModel');
var userControllers = require('../controllers/userController');

Vendor = mongoose.model('vendor');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var VerifyToken = require('../routes/verifyToken');

// vendor controllers
module.exports.current_vendor = function(req, res) {
    if(req.userId.length !== 24){
        return res.send({statusCode: 500, auth: false, message: 'Failed to authenticate token.'});
    }
    Vendor.findById(req.userId, 
        { password: 0 }, // projection
        function (err, vendor) {
            if (err) return res.send({statusCode: 500, status: "There was a problem finding the user"}); 
            if (!vendor) return res.send({statusCode: 404, status: "No User Found"});
            
            return res.send({statusCode: 200, vendor: vendor});
    });
};

module.exports.register = function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    Vendor.create({
        username: req.body.username, password: hashedPassword, name: req.body.name, email: req.body.email,
        mobile: req.body.mobile, country: req.body.country, state: req.body.state,
        city: req.body.city, pincode: req.body.pincode
    },
    function (err, vendor) {
        if (err){
            if((err.name && err.name == "UserExistsError") || (err.code && err.code == 11000)){
                return res.send({"statusCode":500, "status":"UserExistsError", "index":""});
            }else if(err.name && err.name == "ValidationError"){
                return res.send({"statusCode":500, "status":"ValidationFailed", "index":Object.keys(err.errors)});
            }else if(err.name && err.name == "CastError"){
                return res.send({"statusCode":500, "status":"CastError", "index":err.path});
            }else{
                console.log(err);
                return res.send({"statusCode":500, "status":"UnexpectedError"});
            }
        }
        // create a token
        var token = jwt.sign({ id:vendor._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        //initialize new collections for this vendor
        userControllers.new_vendor(vendor._id);
        
        res.send({statusCode: 200, auth: true, token: token});
    });  
};

module.exports.login = function(req, res) {
    Vendor.findOne({ username: req.body.username }, function (err, vendor) {
        if (err) return res.send({statusCode: 500, status: "Error on the server"});
        if (!vendor) return res.send({statusCode: 404, status: "No User Found"});
        var passwordIsValid = bcrypt.compareSync(req.body.password, vendor.password);
        if (!passwordIsValid) return res.send({statusCode: 401, auth: false, token: null});
        var token = jwt.sign({ id: vendor._id }, config.secret, {
           expiresIn: 86400 // expires in 24 hours
        });
        res.send({statusCode: 200, auth: true, token: token});
    });
};