var mongoose = require("mongoose");
var cakeSchema = require("./cake.schema.server");
var cakeModel = mongoose.model('cakeModel', cakeSchema);

cakeModel.showCake = showCake;
cakeModel.createCake = createCake;


module.exports = cakeModel;

function showCake() {
  return cakeModel.find({});
}
function createCake(cake) {
  return cakeModel.create(cake);
}


