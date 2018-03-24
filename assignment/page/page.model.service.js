var mongoose = require('mongoose');
var UserSchema = require("./page.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);//use model to communicate with db, service will not do query anymore

module.exports = UserModel;

function createPage(req, res) {
  var websiteId = req.param.websiteId;
  var page = req.body;

  return UserModel.create(user);
}

function updateUser(userId, user){
 return UserModel.update({uid: userId}, user);
}



