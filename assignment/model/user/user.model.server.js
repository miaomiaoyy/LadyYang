var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("userModel", userSchema);


userModel.findUserById = findUserById;
userModel.createUser = createUser;
userModel.findAllUsers = findAllUsers;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUserName = findUserByUserName;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.addCake = addCake;
userModel.createShoppingCart = createShoppingCart;

module.exports = userModel;

function createUser(user){
    return userModel.create(user);
}


function updateUser(user){
  return userModel.update(user);
}

function addCake(cake, userId) {
  return userModel.findAllCakesForUser(userId)
    .then(function (cakes) {
      cakes.push(cake);
      return cakes.save();
    });
}

function findUserByUserName(username){
  return userModel.findOne({username: username});
}

function findUserByCredentials(username, password){
  return userModel.findOne({username: username, password: password});
}



function findAllUsers(){
  userModel.find(function (err, users) {
    console.log(users);
  })
}

function findUserById(userId){
  return userModel.findById({_id: userId});
}

function deleteUser(userId) {
  return userModel.remove({_id: userId});
}

function findUserByFacebookId(facebookId) {
  return User.findOne({'facebook.id': facebookId});
}

function addWebsite(userId, websiteId) {
  return userModel.findById(userId)
    .then(function (user) {
      user.websites.push(websiteId);
      return user.save();
    })
}

function deleteWebsite(userId, websiteId) {
  return userModel.findById(userId)
    .then(function (user) {
      user.websites.pull(websiteId);
      return user.save();
    })
}

function createShoppingCart(userId) {
  return userModel.create(userId)
}

