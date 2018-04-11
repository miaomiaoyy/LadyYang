var mongoose = require("mongoose");

var shoppingcartSchema = mongoose.Schema({

  _id: String,
  quantity: Number,
  placeholder: String,
  description: String,
  url: String,
  rows: {type: Number, default: 1},
  size: Number,
  deletable: {type: Boolean, default: true},
  formatted: {type: Boolean, default: false},
  dateCreated : {
    type : Date,
    default: Date.now()
  }
}, {collection: 'shoppingcart'});

module.exports = shoppingcartSchema;
