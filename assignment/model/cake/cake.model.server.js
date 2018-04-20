var mongoose = require("mongoose");
var cakeSchema = require("./cake.schema.server");
var cakeModel = mongoose.model('cakeModel', cakeSchema);
var userModel = require("../user/user.model.server");

cakeModel.showCake = showCake;
cakeModel.createCake = createCake;
cakeModel.createCakeForUser = createCakeForUser;
cakeModel.findPageById = findPageById;
cakeModel.updateCake = updateCake;
cakeModel.findAllCakesForUser = findAllCakesForUser;
cakeModel.deleteCake = deleteCake;
cakeModel.findTop10 = findTop10;
cakeModel.findBirthday = findBirthday;

module.exports = cakeModel;

function showCake() {
  console.log('showcake show cake func');
  return cakeModel.find({});
}

function createCake(cake) {
  return cakeModel.create(cake);
}

function createCakeForUser(cake) {
  var userId = cake.userId;
  return cakeModel.create(cake)
    .then(function (cake) {
      return userModel.addCake(userId, cake);
    });
}

function findPageById(cakeId) {
  return cakeModel.find(cakeId);
}


function updateCake(cakeId, newCake) {
  return cakeModel.update(
    {
      _id: cakeId
    },
    {
      name: newCake.name,
      description: newCake.description,
      url: newCake.url
    }
  );
}


function findAllCakesForUser(userId){
  return cakeModel.find({"_user": userId})
    .populate('_user')
    //   .populate('_user', 'username')
    .exec();
}

function deleteCake() {
  return cakeModel.deleteCake({_id: cakeId});
}

function findBirthday(){
  return cakeModel.find({"description": 'birthday cake'})
    .populate('description')
    .exec();
}

function findTop10() {
  return cakeModel.find({"_user": admin})
    .populate('_user')
    .exec();
}




