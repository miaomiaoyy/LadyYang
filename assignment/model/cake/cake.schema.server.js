var mongoose = require("mongoose");

var cakeSchema = mongoose.Schema({

  _id: String,
  quantity: Number,
  color: String,
  layer: Number,
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
