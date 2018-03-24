var mongoose = require("mongoose");
var PageSchema = require('../website/page.schema.server')

var PsgeSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname:String,
  lastname: String,
  pages:[pageSchema],
  dob: Date,
  salary: Number,
}, {collection:'user'});

module.exports = PageSchema;
