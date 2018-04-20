module.exports = function (app) {

  var userModel        = require("../model/user/user.model.server");
  var passport         = require('passport');
  var LocalStrategy    = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var bcrypt           = require("bcrypt-nodejs");
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  passport.use(new LocalStrategy(localStrategy));
  //passport.use(new FacebookStrategy(facebookStrategy));

  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/username/:username", findUserByUsername);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.get("/api/user/hello", helloUser);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post ('/api/register', register);
  app.post ('/api/loggedin', loggedin);
  app.get('/facebook/login', passport.authenticate('facebook', {scope:'email'}))
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));

  var AppId = '165803390787476';
  var SECRET = '94eda8464172ea3417b1921bb1d920b3';
  var facebookCallbackUrl = 'http://localhost:5000/auth/facebooka/callback';
  const facebookConfig = {
    clientId: AppId,
    clientSecret: SECRET,
    callbackURL: facebookCallbackUrl
  }
  //
  // passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
  function serializeUser(user, done) {
    done(null, user);
  }

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

  function localStrategy(username, password, done) {
    userModel
      .findUserByUserName(username)
      .then(
        function(user) {
          if(user && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
          // if(user.username === username && user.password === password) {
          //   return done(null, user);
          // } else {
          //   return done(null, false);
          // }
        },
        function(err) {
          if (err) {  done(err); }
        }
      );
  }

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel 
      .findUserByFacebookId(profile.id) 
      .then( 
        function(user) {
          if (user) {
            return done(null, user);
          } else {
            var names = profile.displayName.split(" ");
            var newFacebookUser = {
              lastName: names[1],
              firstName: names[0],
              email: profile.emails ? profile.emails[0].value : "",
              facebook: {
                id: profile.id,
                token: token
              }
            };
            return userModel.createUser(newFacebookUser);
          }
        },
        function(err) { 
          if (err) {
            return done(err);
          } 
        } 
    )
      .then( 
        function(user){ 
          return done(null, user); 
          }, 
        function(err){ 
          if (err) {
            return done(err);
          } 
        } 
        ); 
  }



  function login(req, res) {
    var user = req.user;
    res.json(user);
  }


  function logout(req, res) { 
    req.logOut(); 
    res.send(200); 
  }

  // function register (req, res) {
  //   const user = req.body;
  //   user.password = bcrypt.hashSync(user.password);
  //   userModel
  //     .createUser(user)
  //     .then(
  //       function(user){
  //         if(user){
  //           req.login(user, function(err) {
  //             if(err) {
  //               res.status(400).send(err);
  //             } else {
  //               res.json(user);
  //             }
  //           });
  //         }
  //       }
  //     );
  //   return userModel.createUser(user);
  // }
  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
      .findUserByUsername(user.username)
      .then(function (data) {
        console.log(data);
        if (data) {
          res.status(400).send('Username is in use!');
          return;
        } else {
          userModel
            .createUser(user)
            .then(
              function (user) {
                if (user) {
                  req.login(user, function (err) {
                    if (err) {
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

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0'); //null
  }

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


  function findUserByUsername(req, res) {
    var username = req.params["username"];
    if (username) {
      userModel.findUserByUserName(username).then(function (user) {
        res.json(user);
      });
    }
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

    userModel.update(user).then(function(status){
      res.send(status);
    })
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];
    userModel.deleteUser(userId).then(function(status) {
      res.send(status);
    })
  }

};
