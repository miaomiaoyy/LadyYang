var mongoose = require("mongoose");
var cakeSchema = require("./cake.schema.server");
var cakeModel = mongoose.model('cakeModel', cakeSchema);
var userModel = require("../user/user.model.server");

cakeModel.showCake = showCake;
cakeModel.createCake = createCake;
cakeModel.createCakeForUser = createCakeForUser;
cakeModel.findCakeById = findCakeById;
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

function findCakeById(cakeId) {
  console.log('4, cake is found in DB changed!!!!', cakeId);
  return cakeModel.findOne({_id: cakeId});//changed this
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
  return cakeModel.find({_user: userId})
    .populate('_user')
    //   .populate('_user', 'username')
    .exec();
}

function deleteCake() {
  return cakeModel.deleteCake({_id: cakeId});
}

function findBirthday(){
  return cakeModel.find({description: 'birthday cake'})
    .populate('description')
    .exec();
}

function findTop10() {
  return cakeModel.find({_user: admin})
    .populate('_user')
    .exec();
}




