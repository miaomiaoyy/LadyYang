module.exports = function (app) {
  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  // app.get("/api/user?username=username", findUserByUsername);
  // app.get("/api/user?username=username&password=password", findUserByCredentials);

  var users = [
    {_id: "123", username: "alice", password: "qq", firstName: "Alice", lastName: "Wonderland"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
  ];


  function createUser(req, res) {
    var user = req.body;
    for (var x = 0; x < users.length; x++) {
      if (users[x].username === user["username"]) {
        res.status(404).send('username already exist.');
        return;
      }
    }

    user._id = Math.random().toString();
    users.push(user);
    res.json(user);
  };

  function findUser(req, res) {

    console.log('server side find user');
    var username = req.query["username"];
    var password = req.query["password"];

    var user = null;

    // if (username && password) {
    //   user = users.find(function (user) {
    //     return user.username === username && user.password === password;
    //   });
    // }
    // res.json(user);

    for (var i = 0; i < users.length; i++) {
      if (users[i].username === username && users[i].password === password) {
        res.json(users[i]);
        return;
      }
    }
    res.status(404).send('username and password do not match');
    // res.send("username and password do not match");
  }



  function findUserById(req, res) {
    var userId = req.params["userId"];
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        res.json(users[i]);
        return;
      }
    }
    res.status(404).send('Cannot find user with user ID: ' + userId);
  };

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var updatedUser = req.body;

    console.log("update user: " + userId + " " + updatedUser["firstName"] + " " + updatedUser["lastName"]);
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users[i].firstName = updatedUser["firstName"];
        users[i].lastName = updatedUser["lastName"];

        res.json(updatedUser);
        return;
      }
    }
    res.status(404).send('User not found!');
  };

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    for (var x = 0; x < users.length; x++) {
      if (users[x]._id === userId) {
        res.json(users[x]);
        users.splice(x, 1);
        return;
      }
    }
    res.status(404).send('User cannot be found!');
  };
}
