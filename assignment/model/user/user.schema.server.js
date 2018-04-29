var mongoose = require("mongoose");
var websiteSchema = require('../website/website.schema.server');
var cakeSchema = require('../cake/cake.schema.server');
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  websites:[websiteSchema],
  cakes:[cakeSchema],
  shoppingCart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shoppingcartModel'
  },
  dateCreate: {
    type: Date,
    default: Date.now()
  },
  facebook: {
    id:    String,
    token: String
  }

}, {collection:'user'});


module.exports = userSchema;
