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
  app.delete("/api/:uid/shoppingcart/:cid", removeCakeFromShoppingCart)

  function removeCakeFromShoppingCart(req, res) {
    var userId = req.params['uid'];
    var cakeId = req.params['cid'];

   console.log(userId, cakeId, 'what???');

   shoppingCartModel.removeFromCart(userId, cakeId).then(function(cart) {
     if (cart) {
       res.json(cart);
     } else {
       res.sendStatus(400).send(error);
     }
   });

  }

  function findShoppingCartByUserId(req, res) {
    // console.log('enter shoppingcart Service111', req);
    //var userId1= req.param['uid'];
    var uid = req.params.uid;
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

    var userId = req.param['uid'];
    shoppingCartModel.findShoppingCart(userId).then(function(cart) {
      if (cart) {
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
            res.json(cake);
            res.sendStatus(200);
          } else {
            res.sendStatus(404);
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



  function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;

    websiteModel.createWebsiteForUser(userId, website)
      .then(function(website) {
        res.json(website);
      });
  }


  function addToUserShoppingCart(req, res) {
    // console.log("please work111,", req.body);
    // var cake = cakeModel.findCakeById(req.body.cakeId);
    // console.log("please work222,", cake);
    var userId = req.params['uid'];
    var cake = req.body;

    // console.log("cake:", cake, "uid:", userId, "req1");
    // shoppingCartModel.findShoppingCart(userId).then(function(cart) {
    //   if (cart) {
    //     console.log(cart, "cart is Yang test 1");
    shoppingCartModel.addToShoppingCart(userId, cake)
          .then(function (data, err) {
            if (data) {
              res.json(data);
              //res.sendStatus(200);
            } else {
              res.sendStatus(404);
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

