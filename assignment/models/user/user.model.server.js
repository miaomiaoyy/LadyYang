// var mongoose = require("mongoose");
// var UserSchema = require("./user.schema.server");
//
// var UserModel = mongoose.model("UserModel", UserSchema);
//
//
// //UserModel.findUserById = findUserById;
// UserModel.createUser = createUser;
// UserModel.updateUser = updateUser;
// UserModel.findUserByCredentials =findUserByCredentials;
// UserModel.findUserByUserName = findUserByUserName;
// UserModel.findAllUsers = findAllUsers;
// UserModel.findUserById = findUserById;
// UserModel.setModel = setModel;
// //
// // var api = {
// //   createUser: createUser,
// //   findUserById: findUserById,
// //
// //   findUserByCredentials: findUserByCredentials,
// //
// //   updateUser: updateUser,
// //
// //   setModel: setModel
// //
// // };
// // return api;
// module.exports = UserModel;
//
// function setModel(_model) {
//   model = _model;
// }
//
// function createUser(user){
//   return UserModel.create(user);
// }
//
//
// function updateUser(userId, user){
//   return UserModel.update({uid: userId}, user );
// }
//
// function findUserByUserName(username){
//   return UserModel.findOne({username: username});
// }
//
// function findUserByCredentials(username, password){
//   console.log("in user.model.server");
//   console.log("yudong 8 server");
//   return UserModel.findOne({username: username, password: password});
// }
//
//
//
// function findAllUsers(){
//   UserModel.find(function (err, doc) {
//     console.log(docs);
//   })
// }
//
// function findUserById(userId){
//   return UserModel.findById(userId);
// }




module.exports = function () {
  var model = {};
  var mongoose = require("mongoose");
  var UserSchema = require("./user.schema.server");
  var UserModel = mongoose.model("UserModel", UserSchema);


  var api = {
    createUser: createUser,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findAllWebsitesForUser:findAllWebsitesForUser,
    findUserByCredentials: findUserByCredentials,
    findWebsitesByUser: findWebsitesByUser,
    updateUser: updateUser,
    removeUser: removeUser,
    setModel: setModel

  };
  return api;

  function setModel(_model) {
    model = _model;
  }

  function findUserByUsername(username) {
    // console.log("#4 findUserByUsername model");
    // console.log(username);
    // console.log("#4 findUserByUsername");
    return UserModel.findOne({
      username: username
    });
  }


  function findAllWebsitesForUser(userId){
    return model.WebsiteModel.find({"_user": userId})
      .populate('_user')
      //   .populate('_user', 'username')
      .exec();
  }

  function findWebsitesByUser(userId) {
    return UserModel
      .findById(userId)
      .populate("websites", "name")
      .exec();

  }

  function removeUser(userId) {
    return UserModel.remove({_id: userId});
  }


  function findUserByCredentials(username, password) {
    // console.log("#4 findUserByCredentials model");
    // console.log(username);
    // console.log(password);
    // console.log("#4 findUserByCredentials");
    return UserModel.findOne({
      username: username,
      password: password
    });
  }

  function updateUser(userId, user) {
    return UserModel
      .update(
        {
          _id: userId
        },
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      );
  }


  function findUserById(userId) {
    // UserModel.find({_id:userId}) //method one  --> returns an array
    // method two
    return UserModel.findById(userId);
  }

  function createUser(user) {
    return UserModel.create(user)
  }

};
