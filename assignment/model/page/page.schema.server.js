var mongoose = require("mongoose");
var widgetSchema = require('../widget/widget.schema.server');

var pageSchema = mongoose.Schema({
  _website: {type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'},
  name: String,
  title: String,
  description: String,
  // widgets: [widgetSchema],
  widgets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'widgetModel'
  }],
  dateCreated: {
    type: Date,
    default: Date.now()
  }
}, {collection: 'page'});

module.exports = pageSchema;

