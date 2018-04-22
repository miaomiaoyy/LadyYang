var mongoose = require("mongoose");
var shoppingcartSchema = require("./shoppingcart.schema.server");
var shoppingcartModel = mongoose.model('shoppingcartModel', shoppingcartSchema);
var userSchema = require("../user/user.schema.server");
var userModel = mongoose.model("userModel", userSchema);


shoppingcartModel.addToShoppingCart = addToShoppingCart;
shoppingcartModel.findShoppingCart = findShoppingCart;
shoppingcartModel.createOneCake = createOneCake;
shoppingcartModel.findCakeInShoppingCart = findCakeInShoppingCart;

module.exports = shoppingcartModel;



function addToShoppingCart(cakeId, userId) {
  cake = cakeModel
  var addedItemIndex = -1;
  if(userId === null || userId === '') {

    shoppingcart.push(cake);
    shoppingcart.save();
    console.log("this is model server, add to cart ok1");

  } else {
    return shoppingcartModel.findShoppingCart(userId)
      .then(function (shoppingCart) {
        if (shoppingCart) {
          shoppingcart.push(cake);
        } else if (shoppingCart && shoppingCart.length > 0) {
          addedItemIndex = shoppingCart.findIndex(cake._id);
          if (addedItemIndex > -1) {
            shoppingCart[addedItemIndex].quantity = shoppingCart[addedItemIndex].quantity + 1;
          } else {
            cake.quantity = 1;
            shoppingcart.push(cake);
          }
        }

        console.log("this is model server, add to cart ok2", shoppingCart._id);

        shoppingcart.save();
      });
  }
}

function findShoppingCart(userId) {
  console.log('2222!at findShoppingcart Model', userId);
  return shoppingcartModel.findOne({'uid': userId});
	// return shoppingcartModel.findOne({'uid': new ObjectId(userId)});

}
function createOneCake(cake) {
  return shoppingcartModel.create(cake);
}

function findCakeInShoppingCart(cake) {
  return shoppingcartModel.find({"cakeId": cake._id});
}

function addToShoppingCart2(cake) {
  return shoppingcartModel.create(cake);
}




