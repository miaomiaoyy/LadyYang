module.exports = function (app) {
  var shoppingCartModel = require("module/shoppingCartModel");

  app.post("/api/shoppingCart", addToShoppingCart);
  app.get("/api/shoppingCart/user", findAllCakesForUser);


  function addToShoppingCart(req, res) {
    var cake = req.body;
    var user = req.body;
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


  function findAllCakesForUser(req, res) {
    var user = req.body;
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

