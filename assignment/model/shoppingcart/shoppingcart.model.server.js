var mongoose = require("mongoose");
var shoppingcartSchema = require("./shoppingcart.schema.server");
var shoppingcartModel = mongoose.model('shoppingcartModel', shoppingcartSchema);
var userSchema = require("../user/user.schema.server");
var userModel = mongoose.model("userModel", userSchema);


shoppingcartModel.addToShoppingCart = addToShoppingCart;
shoppingcartModel.findShoppingCart = findShoppingCart;


function addToShoppingCart(cake, user) {
  if(user === null) {

    shoppingCart.push(cake);
    shoppingcart.save();
    console.log("this is model server, add to cart");
    return
  }
	return shoppingcartModel.findShoppingCart(user.id)
	.then(function(shoppingCart) {
		var addedItemIndex = -1;//check if the cake is added in the cart already

		if(shoppingCart && shoppingCart.length > 0) {
      addedItemIndex = shoppingCart.findIndex(cake._id);
    }

		if(addedItemIndex > -1){
			shoppingCart[addedItemIndex].quantity = shoppingCart[addedItemIndex].quantity + 1;
		} else{
			cake.quantity = 1;
			shoppingCart.push(cake);
		}

    shoppingCart.save();
	});
}

function findShoppingCart(userId) {
	return shoppingcartModel.find({"user": userId});

}

function addToShoppingCart(cake) {
  return shoppingcartModel.create(cake);
}


function addToShoppingCartFirUser(cake, user) {
  return findShoppingCart(user._id);
}


