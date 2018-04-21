var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");

  // get from facebook for developers
  // add heroku urls on the page of facebook for developer
  var AppId = '165803390787476';
  var SECRET = '94eda8464172ea3417b1921bb1d920b3';
  var facebookCallbackUrl = 'http://localhost:5000/auth/facebooka/callback';

  const facebookConfig = {
    clientID: AppId,
    clientSecret: SECRET,
    callbackURL: facebookCallbackUrl
  }

  // the former one would be implemented if it is same method and same url
  app.get("/api/user/hello", helloUser);

  // Here we use a middleware between the api and the function call (login()).
  // The req that is passed to login() is not from client side but from the middleware,
  // which is the authenticate(). Thus the req.user is the authenticated user.
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/register', register);
  app.post ('/api/loggedIn', loggedIn);

  // Use the passport.authenticate middleware to have passport handle the request before the login handler
  // The authenticate middleware will parse the username and password from the request and search the user by credentials
  // If the user is found, the login function is invoked and the current user is available in req.user
  app.post("/api/user", createUser);
  app.get("/api/user", findUserByCredentialOrUsername);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  // auth with Facebook
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    }));
  app.get ('/auth/facebook/login', passport.authenticate('facebook', { scope : 'email' }));

  // var users = [
  //   { _id: '1', username: 'alice',    password: 'alice',    firstName: 'Alice',  lastName: 'Wonder' },
  //   { _id: '2', username: 'bob',      password: 'bob',      firstName: 'Bob',    lastName: 'Marley' },
  //   { _id: '3', username: 'charly',   password: 'charly',   firstName: 'Charly', lastName: 'Garcia' },
  //   { _id: '4', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose',   lastName: 'Annunzi' }
  // ];

  // passport config
  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  // Store an encrypted representation of the user in a cookie.
  // This will allow Passport to maintain session information for the currently logged in user
  function serializeUser(user, done) {
    done(null, user);
  }

  // retrieve the currently logged in user from the encrypted cookie created in serializeUser.
  // The function can use the user's primary key to verify the user still exists in the database
  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  // parse the username and password from the request
  // and then use the userModel to retrieve the user by username and password
  function localStrategy(username, password, done) {
    console.log("local strategy");
    userModel
      .findUserByUserName(username)
      .then(
        function (user) {
          console.log(user);
          if (user && bcrypt.compareSync(password, user.password)) {
            console.log("local strategy verification success");
            return done(null, user);
          } else {
            console.log("local strategy verification failed");
            return done(null, false);
          }
        },
        function (err) {
          return done(err);
        });
  }

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel
      .findUserByFacebookId(profile.id)
      .then(
        function(user) {

          // check if user corresponding to this fb account exist
          if(user) {
            return done(null, user);
          }

          // create a new one if do not exist
          else {
            var names = profile.displayName.split(" ");
            var newFacebookUser = {
              username: 'username',
              lastName:  names[1],
              firstName: names[0],
              email:     profile.emails ? profile.emails[0].value : "",
              facebook: {
                id:    profile.id,
                token: token,
                displayName: names[0] + ' ' + names[1]
              }
            };
            return userModel.createUser(newFacebookUser);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      )
      .then(
        function(user){
          return done(null, user);
        },
        function(err){
          if (err) { return done(err); }
        }
      );
  }

  function login(req, res) {
    console.log(req.user);
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logout(); // a passport function attached to the request
    res.status(200); //success
    res.send("log out success");
  }

  function loggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
      .findUserByUserName(user.username)
      .then(function (data) {
        if(data){
          res.status(400).send('Username is in use!');
        } else {
          userModel
            .createUser(user)
            .then(
              function(user){
                if(user){
                  req.login(user, function(err) {
                    if(err) {
                      res.status(400).send(err);
                    } else {
                      res.json(user);
                    }
                  });
                }
              }
            );
        }
      })

  }

  // functions used for test
  function helloUser(req, res) {
    var username = req.query["username"];
    res.send("Hello from user service!" + username);
  }

  // should check if the username exists if username is unique (maybe the database would provide a solution)
  function createUser(req, res) {
    var createdUser = req.body;

    // createdUser._id = new Date().getTime().toString();
    // users.push(createdUser);
    // res.json(createdUser);

    userModel.createUser(createdUser)
      .then(function(user){
        res.json(user);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function findUserById(req, res){
    var userId = req.params["userId"];
    userModel.findUserById(userId).then(function (user){
      if (user) {
        res.json(user);
      } else {
        res.status(404);
        res.json(user);
      }
    }, function(err) {
      res.status(500).json(err);
    });
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var user = req.body;
    userModel.updateUser(userId, user)
      .then(function(status){
        res.send(status);
      }, function(err) {
        res.status(500).json(err);
      });
  }

  function findUserByCredentialOrUsername(req, res){
    var username = req.query["username"];
    var password = req.query["password"];
    if (username && password) {
      userModel.findUserByCredentials(username, password)
        .then(function(user) {
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
    }

    // should return a list if username is not unique
    else if (username){
      userModel.findUserByUserName(username)
        .then(function(user) {
          if (user) {
            res.json(user);
          } else {
            res.status(404);
            res.json(user);
          }
        }, function(err) {
          res.status(500).json(err);
        });
      return;
    }
    res.status(404);
    res.send(undefined);
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    userModel.deleteUser(userId).then(function(status) {
      console.log(status);
      res.json(status);
    }, function(err) {
      res.status(500).json(err);
    });


    // for (const i in users) {
    //   if (users[i]._id === userId) {
    //     const j = +i;
    //     users.splice(j, 1);
    //   }
    // }
    // res.send("success");
  }
};
