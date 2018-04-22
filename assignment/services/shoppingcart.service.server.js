module.exports = function (app) {

  var shoppingCartModel = require("../model/shoppingcart/shoppingcart.model.server");
  var cakeModel = require("../model/cake/cake.model.server");
  var userModel = require("../model/user/user.model.server");

  app.post('/api/guest/shoppingcart', addGuestShoppingCart);
  app.get("/api/shoppingcart/user", findAllCakesForUser);
  app.post("/api/:uid/shoppingcart/add", addToUserShoppingCart);
  app.get("/api/:uid/shoppingcart", showShoppingCart);
  app.get("/api/:uid/shoppingcart/:cid", findCakeInShoppingCart);
  app.get("/api/shoppingcart/:uid", findShoppingCartByUserId);



  function findShoppingCartByUserId(req, res) {
    // console.log('enter shoppingcart Service111', req);
    //var userId1= req.param['uid'];
    var uid = req.params.uid;

    // console.log(uid, 'inside userid should not be undefined');

    shoppingCartModel.findShoppingCart(uid)
      .then(
        function (cart) {
          res.send(cart);
        },
        function (error) {
          res.sendStatus(400).send(error);
        }
      );
  }

  function showShoppingCart(req, res) {
    console.log('enter shoppingcart Service');
    var userId = req.param['uid'];
    console.log('find shooping cart for: ', userId);
    shoppingCartModel.findShoppingCart(userId).then(function(cart) {
      if (cart) {
        console.log(cart, "find user's cart ");
        res.json(cart);
        res.send(200);
      } else {
        res.send(404);
      }
      });
    }

  function findCakeInShoppingCart(req, res) {
    var cake = req.body;
    shoppingCartModel.findCakeInShoppingCart(cake)
        .then(function (cake, err) {
          if(cake) {
            console.log(cake, "find cake in cart");
            res.json(cake);
            res.send(200);
          } else {
            res.send(404);
          }
        });
  }

  function addGuestShoppingCart(req, res) {
    var cake = req.body;
    shoppingCartModel.addToShoppingCart(cake)
      .then(function (data, err) {
        if (data) {
          console.log(cake);
          res.json(data);
          res.send(200);
        } else {
          res.send(404)
        }
      });
  }



  function addToUserShoppingCart(req, res) {
    var cakeId = req.body;
    var userId = req.params['uid'];

    console.log(cakeId, userId, "req1");

    shoppingCartModel.findShoppingCart(userId).then(function(cart) {
      if (cart) {
        shoppingCartModel.addToShoppingCart(cakeId, userId)
          .then(function (data, err) {
            if (data) {
              console.log(data,'cart');
              res.json(data);
              res.send(200);
            } else {
              res.send(404)
            }
          });
      } else {
        userModel.createShoppingCart(userId).then(function (cart, error) {
          if (cart) {
            console.log(cart);
            res.json(cart);
            res.send(200);
          } else {
            res.send(404)
          }
        });
      }
    });
  }


  function findAllCakesForUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];
    cakeModel.findAllCakesForUser(user._id)
      .then(
        function (cakes) {
          res.json(cakes);
        },
        function (error) {
          res.sendStatus(400).send(error);
        }
      );
  }


}

