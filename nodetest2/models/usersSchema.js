'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  userName: String,
  params: {
    userEmail: String,
    userFullName: String,
    userAge: Number,
    userLocation: String,
    userGender: String
  }
});

module.exports = mongoose.model('User', usersSchema);
