var mongoose = require("mongoose");
var cakeSchema = require("./cake.schema.server");
var cakeModel = mongoose.model('cakeModel', cakeModel);

cakeModel.showCake = showCake;

function showCake() {
  return cakeModel.find({});
}
