var mongoose = require("mongoose");

var cakeSchema = mongoose.Schema({
  userId: String,
  name: String,
  quantity: Number,
  color: String,
  price: Number,
  description: String,
  url: String,

  deletable: {type: Boolean, default: true},
  formatted: {type: Boolean, default: false},
  dateCreated : {
    type : Date,
    default: Date.now()
  }
}, {collection: 'cakes'});

module.exports = cakeSchema;
