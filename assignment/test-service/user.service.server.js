module.exports = function (app) {

  app.put('/api/user/:userId', updateUserById);
  app.get('/api/user/hello', helloUser);
  app.get('/api/user/:userId', findUserById);
  app.get('/api/user', findUsers);

  const users = [
    {_id: '123', username: 'alice',    password: 'alice',    firstName: 'Alice',  lastName: 'Wonderland'  },
    {_id: '234', username: 'bob',      password: 'bob',      firstName: 'Bob',    lastName: 'Marley'  },
    {_id: '345', username: 'charly',   password: 'charly',   firstName: 'Charly', lastName: 'Garcia'  },
    {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose',   lastName: 'Annunzi' }
  ];

  function helloUser(req, res) {
    res.send('Hello from user service!');
  }

  function findUserById(req, res) {
    const userId = req.params['userId'];
    const user = users.find(function (user) {
      return user._id === userId;
    });
    res.json(user);
  }

  function findAllUsers(req, res) {
    res.json(users);
  }

  function findUsers(req, res) {
    const username = req.query['username'];
    const password = req.query['password'];

    const user = null;

    if (username && password) {
      user = users.find(function (user) {
        return user.username === username && user.password === password;
      });
    }
    res.json(user);
  }

  function updateUser(req, res) {
    const userId = req.params['userId'];
    const newUser = req.body;

    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users[i].username = newUser.username;
        users[i].password = newUser.password;
        users[i].firstName = newUser.firstName;
        users[i].lastName = newUser.lastName;
        res.json(users[i]);
        return;
      }
    }
  }
  function updateUserById(req, res){
    const userId = req.params['userId'];
    const user = req.body;

    console.log(req.body);
    console.log('update user: ' + userId + ' ' + user.firstName + ' ' + user.lastName);

    // noinspection JSAnnotator
    for (const i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users[i].firstName = user.firstName;
        users[i].lastName = user.lastName;

        res.status(200).send(user);
        return;
      }
    }
    res.status(404).send('not found!');
  }

  function deleteUser(req, res) {
    const userId = req.params['userId'];
    users.splice(users.findIndex(function(user) {
      return user._id === userId;
    }), 1);
    res.json({});
  }
};
