// module.exports = function (app) {
//
//   var userModel = require("../models/user/user.model.service");
//   //Put calls
//   app.put("/api/user/:userId", updateUser);
//
//   //GET calls
//   app.get("/api/user/hello", helloUser);
//   app.get("/api/user/:userId", findUserById);
//   app.get("/api/user", findUserByCredentials);
//   app.get("/api/user", findAllUsers);
//   //Post calls
//   app.post("/api/user", createUser);
//
//   //delete calls
//   app.delete("/api/user/:userId", deleteUser);
//
//
//   var users = [
//     {uid: "123", username: "alice", password: "qq", firstName: "Alice", lastName: "Wonder"},
//     {uid: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
//     {uid: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
//     {uid: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
//   ];
//
//
//   function createUser(req, res) {
//     var newUser = req.body;
//     userModel.createUser(newUser)
//       .then(function (user) {
//         res.json(user);
//       })
//   }
//
//   function updateUser(req, res) {
//     var userId = req.params.userId;
//     var user = req.body;
//
//     userModel.updateUser(userId, user)
//       .then(function (status) {
//         res.send(status);
//       })
//   }
//
//   function deleteUser(req, res) {
//     var userId = req.params['uid'];
//     UserModel.deleteUser(userId)
//       .then(res.sendStatus(200)
//       );
//   }
//
//
//   function helloUser(req, res) {
//     res.send("Hello from user service!");
//   }
//
//   function findUserById(req, res) {
//     var userId = req.params["uid"]
//     userModel.findUserById(userId).then(function (user) {
//       res.json(user);
//     })
//   }
//
//   function findAllUsers(req, res) {
//     res.json(users);
//   }
//
// //   function findUserByCredentials(req, res) {
// //     var username = req.query["username"];
// //     var password = req.query["password"];
// //     console.log(username + " @server side");
// //     if (username && password) {
// //       var promise = userModel.findUserByCredentials(username, password);
// //       promise.then(function (user) {
// //         res.json(user);
// //         //console.log(user);
// //       })
// //       return;
// //     } else if (username) {
// //       userModel.findUserByUserName(username)
// //         .then(function (user) {
// //           res.json(user);
// //         })
// //       return;
// //     }
// //     res.json(users);
// //   }
// // }
//   function findUserByCredentials(req, res) {
//     var username = req.query["username"];
//     var password = req.query["password"];
//     console.log(" @server");
//     console.log(password);
//     if (username && password) {
//       console.log(" here@server");
//       userModel.findUserByCredentials(username, password)
//         .then(function (user) {
//           console.log(user);
//           if (user) {
//             console.log(user + " server");
//             res.status(200).send(user);
//           } else {
//             res.status(404).send('Not found');
//           }
//         }
//       )
//     }
//   }
// }
//



module.exports = function (app, model) {

  var UserModel = require("../models/user/user.model.server");

  //Put calls
  app.put("/api/user/:userId",updateUser);

  //GET calls
  app.get("/api/user/hello", helloUser);
  app.get("/api/user/:userId",findUserById);
  app.get("/api/user", findUsers);

  //Post calls
  app.post("/api/user", createUsers);

  //delete calls
  app.delete("/api/user/:userId", deleteUser);

  // var users = [
  //   {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
  //   {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
  //   {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
  //   {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  // ];

  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function createUsers(req, res) {
    var user = req.body;
    model.UserModel.createUser(user).then((user) => {
      console.log(user);
    res.json(user);
  });
    console.log("Create User")
  }

  function findUserById(req, res){
    var userId = req.params["uid"];
    model.UserModel.findUserById(userId).then((user) => res.json(user));
  }



  function findUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    model
      .UserModel.findUserByCredentials(username, password)
      .then(
        function (users) {
          if (users) {
            console.log("kitty 10 resceive", users);

              console.log("in user.service.server KITTY SUCCESS");
              res.json(users);
            } else {
              console.log("in user.service.server user has problem");
              res.send('0')
            }
        },
        function (error) {
          res.sendStatus(400).send(error);
        }
      );
  }

  function updateUser(req, res){
    var userId = req.params['uid'];
    var user = req.body;

    console.log(req.body);
    console.log("update user: " + userId + " " + user.firstName + " " + user.lastName);

    model.UserModel.updateUser(userId, user).then(function(user) {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("not found!");
      }
    });
  }

  function deleteUser(req, res) {
    var userId = req.params['uid'];
    model.UserModel.deleteUser(userId).then(() => (
      res.sendStatus(200)
    ));

  }

}
