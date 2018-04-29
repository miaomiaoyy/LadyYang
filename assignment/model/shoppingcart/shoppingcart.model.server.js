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

module.exports = shoppingcartModel;

function addToShoppingCart(userId, cake) {
    return shoppingcartModel.findShoppingCart(userId)
      .then(function (shoppingCart) {
        if (!shoppingCart) {
          // var id =  '_' + Math.random().toString(36).substr(2, 9);
          // shoppingCart = new ShoppingCart(id, undefined, undefined);
          shoppingCart = {
            // 'cakes': {type: undefined}
          };
          // shoppingCart._id = id;
          // var shoppingCart = new ShoppingCart(id, userId, cake._id);
          shoppingCart.uid = userId;
          // console.log(shoppingCart._id, 'is it empty?');
          return createCart(userId, shoppingCart)
            .then(function(realCart){

              console.log(realCart._id,'is it empty2?');
              realCart.cakes = [];
              realCart.cakes.push(cake);
              return realCart.save();
            });
        } else {
          console.log(shoppingCart, 'spc');
          var cakeList = shoppingcartModel.findCakesInShoppingCart(userId);
          console.log(cakeList, 'found cakes la');
          if(shoppingCart.cakes === undefined) {
            shoppingCart.cakes = [];
          }
          shoppingCart.cakes = cakeList;
          shoppingCart.cakes.push(cake);
          cake.quantity = 1;
          console.log("this is model server, add to cart ok2", shoppingCart);

          return shoppingCart.save();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


function findShoppingCart(userId) {
  return shoppingcartModel.findOne({uid: userId});
	// return shoppingcartModel.findOne({'uid': new ObjectId(userId)});

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
    return shoppingcartModel.create(cart)
      .then(function (cart) {
        return userModel.updateCart(userId, cart._id);
      });
}




