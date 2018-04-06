module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");

  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.get("/api/user/hello", helloUser);

  // var users = [
  //   {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonderland", email: "alice@gmail.com"  },
  //   {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",     email: "bob@gmail.com"  },
  //   {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",     email: "charly@gmail.com" },
  //   {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",    email: "jan@gamil.com" }
  // ];

  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  // function findAllUsers(req, res){
  //   res.json(users);
  // }

  function createUser(req, res){
    var user = req.body;
    userModel.createUser(user).then(function(newUser){
      res.json(newUser);
    },
      function(error) {
        console.log("failed");
        res.sendStatus(400).send(error);
      });
  }

  // function findUserByUserName(req, res) {
  //   var username = req.query["username"];
  //   var user = null;
  //
  //   if (username) {
  //     user = users.find(function (user) {
  //       return user.username === username;
  //     });
  //   }
  //   res.json(user);
  // }

  function findUser(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];

    var user = null;

    if (username && password){
      userModel.findUserByCredentials(username, password).then(function(user){
        if (!user) {
          res.status(401);
          res.json(user);
        } else {
          res.json(user);
        }
      }, function(err) {
          res.status(500).json(err);
      });
      return;
    } else if (username){
      userModel.findUserByUserName(username).then(function(user){
        res.json(user);
      });
      return;
    }
    res.json(user);
  }

  function findUserById(req, res){
    var userId = req.params["userId"];
    // var user = users.find(function (user) {
    //   return user._id === userId;
    // });
    // res.json(user);
    userModel.findUserById(userId).then(function(user) {
      res.json(user);
    })
  }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;

    console.log(req.body);
    console.log("update user: " + userId + " " + user.username + " " + user.password + " " + user.firstName + " " + user.lastName + " " + user.email);

    // for(var i = 0; i < users.length; i++) {
    //   if (users[i]._id === userId) {
    //     users[i].username = user.username;
    //     users[i].firstName = user.firstName;
    //     users[i].lastName = user.lastName;
    //     users[i].password = user.password;
    //     users[i].email = user.email;
    //     res.status(200).send(user);
    //     return;
    //   }
    // }
    // res.status(404).send("not found!");
    userModel.update(user).then(function(status){
      res.send(status);
    })
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];
    // for (var i = 0; i < users.length; i++) {
    //   if (users[i]._id === userId) {
    //     var j = +i;
    //     users.splice(j, 1);
    //     res.json(users);
    //     return;
    //   }
    // }
    userModel.deleteUser(userId).then(function(status) {
      res.send(status);
    })
  }

};
