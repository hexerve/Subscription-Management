var mongoose = require('mongoose');
var Vendor = require('../models/vendorModel');

Vendor = mongoose.model('vendor');

var User = {};
var arr = [];

Vendor.find({},function(err, vendors){
    if(err)
        res.send({"err": "unexpectedError", "code": "404"});
    
    vendors.forEach(vendor => {
        arr.push(vendor._id);
        var User1 = require('../models/userModel')(vendor._id);
        var User1 = mongoose.model('v' + vendor._id + 'user');
        User[vendor._id] = User1;
    });
    console.log(arr);
    console.log("API is ready to use now!");
});

module.exports.new_vendor =function(id){
    arr.push(id);
    var User1 = require('../models/userModel')(id);
    var User1 = mongoose.model('v' + id + 'user');
    User[id] = User1;
    console.log(arr);
};

module.exports.User = User;