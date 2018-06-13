var mongoose = require("mongoose");
var cakeSchema = require('../cake/cake.schema.server');

var shoppingcartSchema = mongoose.Schema({

  //_id: String,
  uid: String,
  quantity: Number,
  cakes: [cakeSchema],
  totalPrice: Number,

  deletable: {type: Boolean, default: false},
  formatted: {type: Boolean, default: false},
  dateCreated : {
    type : Date,
    default: Date.now()
  }
}, {collection: 'shoppingcart'});

module.exports = shoppingcartSchema;

