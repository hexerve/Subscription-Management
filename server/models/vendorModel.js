'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VendorSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minlength: [3, 'username is atleast of 3 characters'],
    maxlength: [30, 'username does not exceeds 30 characters'],
    required: [true, 'please enter your username']
  },
  name: {
    type: String,
    minlength: [3, 'name is atleast of 3 characters'],
    maxlength: [30, 'name does not exceeds 30 characters'],
    required: [true, 'please enter your name']
  },
  email: {
    type: String,
    unique: true,
    minlength: [3, 'email is atleast of 3 characters'],
    maxlength: [30, 'email does not exceeds 30 characters'],
    match: /\S+@\S+\.\S+/,
    required: [true, 'please enter your email']
  },
  password: {
    type: String,
  },
  mobile: {
    type: Number,
    unique: true,
    min: [6999999999, 'not a valid mobile number'],
    max: [9999999999, 'not a valid mobile number'],
    required: [true, 'please enter your mobile number']
  },
  country: {
    type: String,
    minlength: [3, 'country is atleast of 3 characters'],
    maxlength: [30, 'country does not exceeds 30 characters'],
    required: [true, 'please enter your country']
  },
  state: {
    type: String,
    minlength: [3, 'state is atleast of 3 characters'],
    maxlength: [30, 'state does not exceeds 30 characters'],
    required: [true, 'please enter your state']
  },
  city: {
    type: String,
    minlength: [3, 'city is atleast of 3 characters'],
    maxlength: [30, 'city does not exceeds 30 characters'],
    required: [true, 'please enter your city']
  },
  pincode: {
    type: Number,
    min: [100000, 'not a valid pincode'],
    max: [999999, 'not a valid pincode'],
    required: [true, 'please enter your pincode']
  },
  registration_timestamp: {
    type: Date,
    default: Date.now
  },
  last_login_timestamp: {
    type: Date
  },
  activation_timestamp: {
    type: Date
  },
  deactivation_timestamp: {
    type: Date
  },
  status: {
    type: [{
      type: String,
      enum: ['active', 'deactive']
    }],
    default: ['active']  
  }
});

module.exports = mongoose.model('vendor', VendorSchema, 'vendors');