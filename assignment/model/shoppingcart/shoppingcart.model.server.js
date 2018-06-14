var mongoose = require("mongoose");
var shoppingcartSchema = require("./shoppingcart.schema.server");
var shoppingcartModel = mongoose.model('shoppingcartModel', shoppingcartSchema);
var userSchema = require("../user/user.schema.server");
var userModel = mongoose.model("userModel", userSchema);
var cakeSchema = require("../cake/cake.schema.server");
var cakeModel = mongoose.model("cakeModel", cakeSchema);


shoppingcartModel.addToShoppingCart = addToShoppingCart;
shoppingcartModel.findShoppingCart = findShoppingCart;
shoppingcartModel.createOneCake = createOneCake;
shoppingcartModel.createCart = createCart;
shoppingcartModel.findCakesInShoppingCart = findCakesInShoppingCart;
shoppingcartModel.removeFromCart = removeFromCart;

module.exports = shoppingcartModel;

function addToShoppingCart(userId, cake) {
  return shoppingcartModel.findShoppingCart(userId)
      .then(function (shoppingCart) {
        if(!shoppingCart) {
          shoppingCart = {};
          shoppingCart.uid = userId;
          return createCart(userId, shoppingCart)
            .then(function (realCart) {

              realCart.cakes = [];
              cake.quantity = 1;
              realCart.cakes.push(cake);
              return realCart.save();
            });
        }
        else
        {
          // var cakeList = shoppingcartModel.findCakesInShoppingCart(userId);
          // console.log(cakeList, 'found cakes la');
          if (shoppingCart.cakes === undefined) {
            shoppingCart.cakes = [];
          }

          var hasCake = false;
          for(var x = 0; x < shoppingCart.cakes.length; x++) {
            var c = shoppingCart.cakes[x];
            if (!c.quantity) {
              c.quantity = 1;
            }
            if (c._id == cake._id) {
              // found a cake
              c.quantity += 1;
              console.log(c, 'more cake');
              hasCake = true;
            }
          }

          if (!hasCake) {
            console.log(cake, 'new cake');
            shoppingCart.cakes.push(cake);
            cake.quantity = 1;
          }
          // shoppingCart.cakes = cakeList;

          // console.log("this is model server, add to cart ok2", shoppingCart);

          return shoppingCart.save();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function removeFromCart(userId, cakeId) {
    return shoppingcartModel.findShoppingCart(userId)
      .then(function (shoppingCart) {
        if (!shoppingCart) { return; }

        var i = findCakeIndexInCart(shoppingCart, cakeId);
        if (i >= 0) {
          var cake = shoppingCart.cakes[i];
          if (cake.quantity > 1) {
            cake.quantity--;
          } else {
            shoppingCart.cakes.splice(i, 1);
          }

          shoppingCart.save();
        }
        return shoppingCart;
      });

  }

function findShoppingCart(userId) {
  return shoppingcartModel.findOne({uid: userId});
	// return shoppingcartModel.findOne({'uid': new ObjectId(userId)});

}

function findCakeIndexInCart(shoppingCart, cakeId) {
  for(var x = 0; x < shoppingCart.cakes.length; x++) {
    var c = shoppingCart.cakes[x];
    if (c._id == cakeId) {
      return x;
    }
  }
}

function createOneCake(cake) {
  return shoppingcartModel.create(cake);
}

function findCakesInShoppingCart() {
  return shoppingcartModel.find({});
}

function addToShoppingCart2(cake) {
  return shoppingcartModel.create(cake);
}

function createCart(userId, cart) {
    cart.uid = userId;
    console.log(userId, cart, 'created? what?');
    return shoppingcartModel.create(cart)
      .then(function (cart) {

         userModel.updateCart(userId, cart._id);
         return cart;
      });
}




