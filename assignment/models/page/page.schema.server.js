var mongoose = require("mongoose");
var PageSchema = require('../page/page.schema.server')

var PageSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname:String,
  lastname: String,
  pages:[PageSchema],
  dob: Date,
  salary: Number,
}, {collection:'user'});

module.exports = PageSchema;
