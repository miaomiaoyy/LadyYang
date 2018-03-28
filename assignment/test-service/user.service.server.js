module.exports = function (app) {

  var userModel = require("../models/user/user.model.service");
  //Put calls
  app.put("/api/user/:userId", updateUser);

  //GET calls
  app.get("/api/user/hello", helloUser);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUserByCredentials);
  app.get("/api/user", findAllUsers);
  //Post calls
  app.post("/api/user", createUser);

  //delete calls
  app.delete("/api/user/:userId", deleteUser);


  var users = [
    {uid: "123", username: "alice", password: "qq", firstName: "Alice", lastName: "Wonder"},
    {uid: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {uid: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {uid: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
  ];


  function createUser(req, res) {
    var newUser = req.body;
    userModel.createUser(newUser)
      .then(function (user) {
        res.json(user);
      })
  }

  function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel.updateUser(userId, user)
      .then(function (status) {
        res.send(status);
      })
  }

  function deleteUser(req, res) {
      var userId = req.params['userId'];
      UserModel.deleteUser(userId)
        .then(res.sendStatus(200)
      );
    }


  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function findUserById(req, res) {
    var userId = req.params["userId"]
    userModel.findUserById(userId).then(function (user) {
      res.json(user);
    })
  }

  function findAllUsers(req, res) {
    res.json(users);
  }

  function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    if (username && password) {
      var promise = userModel.findUserByCredentials(username, password);
      promise.then(function (user) {
        res.json(user);
        //console.log(user);
      })
      return;
    } else if (username) {
      userModel.findUserByUserName(username)
        .then(function (user) {
          res.json(user);
        })
      return;
    }
    res.json(users);
  }
}

