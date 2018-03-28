var mongoose = require('mongoose');

var WidgetSchema = mongoose.Schema({
  pageId: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
  type:{
    type: String,
    enum : ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'],
  },
  name: String,
  text: String,
  placeholder: String,
  description: String,
  url: String,
  widght: String,
  height: String,
  rows: Number,
  size: Number,
  class: String,
  icon: String,
  deleteable: Boolean,
  formatted: Boolean,
  dateCreated:{
    type:Date,
    default:Date.now()
  }
},{collection: 'widget'});

module.exports = WidgetSchema;
