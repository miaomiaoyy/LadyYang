var mongoose = require("mongoose");

var widgetSchema = mongoose.Schema({
  _page: {type: mongoose.Schema.Types.ObjectId, ref: 'pageModel'},
  widgetType: {
    type: String,
    uppercase: true,
    enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']
  },
  name: String,
  text: String,
  placeholder: String,
  description: String,
  url: String,
  width: String,
  height: String,
  rows: {type: Number, default: 1},
  size: Number,
  class: String,
  icon: String,
  deletable: {type: Boolean, default: true},
  formatted: {type: Boolean, default: false},
  dateCreated : {
    type : Date,
    default: Date.now()
  }
}, {collection: 'widget'});

module.exports = widgetSchema;
